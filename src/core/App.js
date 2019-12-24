/**
*Created on 2019?8?20?
*@author: skw QQ:281431280 
*/
import Stage from '../cax/render/display/stage'
import Group from '../cax/render/display/group'
import {setRafInterval} from '../cax/common/raf-interval'
import ViewMgr from './ViewMgr';
import Loader from './Loader';
import EasyLoading from './EasyLoading';
import Toast from './Toast';
import EventMgr from './EventMgr'
class App{

    constructor(){
        this._tickId = null;
        this._frame = 0;
        this._frameRate = 16;
        this._eventMgr = new EventMgr();
        this._init = false;
    }

    on (type, listener,thisObject, useCapture) {
        this._eventMgr.addEventListener(type, listener,thisObject, useCapture)
    }
    
    off (type, listener, useCapture) {
      this._eventMgr.removeEventListener(type, listener,thisObject, useCapture)
    }
    
    dispatchEvent (evt) {
        this._eventMgr.dispatchEvent(evt);
    }
 
    init(width,height,renderTo,frameRate = 16){
        this.width = width;
        this.height = height;
        this._frameRate = frameRate;
        this._stage = new Stage(width,height,renderTo);
        this._gameStage = new Group();
        this._uiStage = new Group();
        this._loadStage = new Group();
        this._loader = new Loader();
        
        this._gameStage.width = this.width;
        this._gameStage.height = this.height;
        this._stage.add(this._gameStage);
        
        this._uiStage.width = this.width;
        this._uiStage.height = this.height;
        this._stage.add(this._uiStage);

        this._loadStage.width = this.width;
        this._loadStage.height = this.height;
        this._stage.add(this._loadStage);
 
        this._viewMgr = new ViewMgr();
        this._scale = document.documentElement.clientWidth/this.width;
        this._stage.scaleEventPoint(this._scale,this._scale);
        this._easyLoading = new EasyLoading(this);
        this._init = true;
        return this;
    }
    get isInit(){
        return this._init;
    }
    start(){
        this._tickId = setRafInterval(this.update.bind(this),this._frameRate);
    }
    get ViewMgr(){
        return this._viewMgr;
    }
    get Stage(){
        return this._stage
    }
    get GameStage(){
        return this._gameStage;
    }
    get UIStage(){
        return this._uiStage;
    }
    get LoadStage(){
        return this._loadStage;
    }
    get Loader(){
        return this._loader;
    }
    showLoading(delay = 3000){
        this._easyLoading.show(delay);
    }
    hideLoading(){
        this._easyLoading.hide();
    }
    Toast(msg,delay = 3000,end = null){
        var toast = new Toast(this);
        toast.msg = msg;
        toast.delay = delay;
        toast.end = end;
        return toast;
    }

    update(){
        this._frame++;
        this._stage.update();
        this._viewMgr.update();
    }


}
export default App