class Request{

    constructor(seqID,opcode,pack){
        this._pack = pack;
        this._seqID = seqID;
        this._opcode = opcode;
    }
    get SeqID(){
        return this._seqID;
    }
    get Opcode(){
        return this._opcode;
    }
    get Pack(){
        return this._pack;
    }
    func(func,obj){ 
        this._func = func;
        this._obj = obj;
    }
    Call(cmd){
        this._func.call(this._obj,cmd);
    }
}