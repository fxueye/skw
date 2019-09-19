class Socket{
    constructor(){
        this._socket = null;
        this._host = '127.0.0.1';
        this._port = 8888;
        this._isConnecting = false;
        this._connectFlag =  false;
        this._needReconnect = false;
        this._maxReconnectCount = 10;
        this._hander = null;
    }
    init(host,port){
        this._host = host; 
        this._port = port;
    }
}
export default Socket    