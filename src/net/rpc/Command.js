
class Command{
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
}
export default Command