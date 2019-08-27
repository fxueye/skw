/**
*Created on 2019年8月20日
*@author: skw QQ:281431280 
*/
import cax from 'cax';
import ViewMgr from './ViewMgr';
import Loader from './Loader';
import EasyLoading from './EasyLoading';
class App{

    constructor(){
        this._tickId = null;
        this._frame = 0;
        
    }

    init(width,height,renderTo){
        this.width = width;
        this.height = height;
        this._stage = new cax.Stage(width,height,renderTo);
        this._gameStage = new cax.Group();
        this._uiStage = new cax.Group();
        this._loadStage = new cax.Group();
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
        this._easyLoading = new EasyLoading();
        return this;
    }
    start(){
        this._tickId = cax.tick(this.update.bind(this));
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
    showLoading(){
        this._easyLoading.show();
    }
    hideLoading(){
        this._easyLoading.hide();
    }

    update(){
        this._frame++;
        this._stage.update();
        this._viewMgr.update();
    }


}
const app = new App();
export default app;