class Packet{
    static PACKET_DEFAULT_LEN = 256;
    static PACKET_MAX_LEN = 1024 * 1024;
    constructor(bytes,length,index = 0){
        if(length != null && length > Packet.PACKET_MAX_LEN){
            throw new Error("init len is larger than max length: " + Packet.PACKET_MAX_LEN);
        }
        if((index != null && length != null) && (index < 0 || index >= length)){
            throw new Error("invalid index of bytes, index: " + index);
        }
        var len = length ? length : Packet.PACKET_DEFAULT_LEN;
        this.pos = index ? index : 0;
        this.size = length ? length : 0;
        if(bytes){
            this.buffer = bytes;
            this.size = bytes.byteLength;
        }else{
            this.buffer = new Uint8Array(len);
        }
    }

    get Position(){
        return this.pos;
    }
    set Position(val){
        this.pos = val;
    }
    get Size(){
        return this.size;
    }
    set Size(val){
        this.size = val;
    }
    get Capability(){
        return this.buffer.byteLength;
    }
    get Remaining(){
        return this.size - this.pos;
    }
    get Buffer(){
        return this.buffer;
    }

    Flip(){
        this.size = this.pos;
        this.pos = 0;
    }
    Rewind(){
        this.pos = 0;
    }
    Clear(){
        this.pos = 0;
        this.size = 0;
    }
    End(){
        return this.pos == this.size;
    }
    GetData(){
        return this.buffer;
    }
    PutBytes(bytes){
        this.EnsureCapacity(bytes.byteLength);
        this.buffer.set(bytes,this.pos);
        this.pos += bytes.byteLength;
        if(this.size < this.pos) this.size = this.pos;
    }
    GetBytes(dest,start,length){
        if(!dest){
            return;
        }
        dest.set(this.buffer.subarray(this.pos,this.pos + length),start);
        this.pos += length;
    }
    PutBool(value){
        this.EnsureCapacity(1);
        var src = BitConverter.GetBytes(value);
        // Packet.CopyBuffer(src,0,this.buffer,this.pos,src.byteLength);
        this.buffer.set(src,this.pos);
        this.pos += src.byteLength;
        if(this.size < this.pos) this.size = this.pos;
    }
    GetBool(){
        var rst = BitConverter.ToBoolean(this.buffer,this.pos);
        this.pos += 1;
        return rst;
    }
    PutShort(val){
        this.EnsureCapacity(2);
        var src = BitConverter.GetBytes(val,16);
        this.buffer.set(src,this.pos);
        this.pos += src.byteLength;
        if(this.size < this.pos) this.size = this.pos;
    }
    GetShort(){
        var rst = BitConverter.ToInt16(this.buffer,this.pos);
        this.pos += 2;
        return rst;
    }
    PutInt(val){
        this.EnsureCapacity(4);
        var src = BitConverter.GetBytes(val,32);
        this.buffer.set(src,this.pos);
        this.pos += src.byteLength;
        if(this.size < this.pos) this.size = this.pos;
    }
    GetInt(){
        var rst = BitConverter.ToInt32(this.buffer,this.pos);
        this.pos += 4;
        return rst;
    }
    PutLong(val){
        this.EnsureCapacity(8);
        var src = BitConverter.GetBytes(val);
        this.buffer.set(src,this.pos);
        this.pos += src.byteLength;
        if(this.size < this.pos) this.size = this.pos;
    }
    GetLong(){
        var rst = BitConverter.ToInt64(this.buffer,this.pos);
        this.pos += 8;
        return rst;
    }
    PutFloat(val){
        this.EnsureCapacity(4);
        var src = BitConverter.GetBytes(val,32,true);
        this.buffer.set(src,this.pos);
        this.pos += src.byteLength;
        if(this.size < this.pos) this.size = this.pos;
        
    }
    GetFloat(){
        var rst = BitConverter.ToFloat32(this.buffer,this.pos);
        this.pos += 4;
        return rst;
    }
    PutDouble(val){
        this.EnsureCapacity(8);
        var src = BitConverter.GetBytes(val,32,true);
        this.pos += src.byteLength;
        if(this.size < this.pos) this.size = this.pos;
    }
    GetDouble(){
        var rst = BitConverter.ToDouble(this.buffer,this.pos);
        this.pos += 8;
        return rst;
    }
    PutString(val){
        if(val == null) val= "";
        var src = BitConverter.GetBytes(val);
        var len = src.byteLength;
        this.EnsureCapacity(2 + len);
        this.PutShort(len);
        this.buffer.set(src,this.pos);
        this.pos += len;
        if(this.size < this.pos) this.size = this.pos;
    }
    GetString(){
        var len = this.GetShort();
        if(len == 0) return "";
        var str = BitConverter.ToString(this.buffer,this.pos,len);
        this.pos += len;
        return str;
    }
    EnsureCapacity(increament){
        if(this.Capability - this.Position >= increament){
            return;
        }
        let requiredCapacity = this.Position + increament;
        if(requiredCapacity > Packet.PACKET_MAX_LEN){
            throw new Error("required buffer is too long to pck max length: " + Packet.PACKET_MAX_LEN);
        }
        let newCapacity = requiredCapacity > this.Capability * 2 ? requiredCapacity : this.Capability * 2;
        newCapacity = requiredCapacity > Packet.PACKET_MAX_LEN ? Packet.PACKET_MAX_LEN : newCapacity;
        let newBuffer = new Uint8Array(newCapacity);
        newBuffer.set(this.buffer,0);
        this.buffer = newBuffer;
    }
}
export default Packet