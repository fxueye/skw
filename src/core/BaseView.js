/**
*Created on 2019年8月20日
*@author: skw QQ:281431280 
*/
import Group from '../cax/render/display/group'

class BaseView extends Group {
    constructor(parent){
        super();
        this._parent = parent;
        this.width = this._parent.width;
        this.height = this._parent.height;
        this._init = false;
        this.visible = false;
    }
    init(){
        this._init = true;
    }
    add2Parent(){
        this._isOpen = true;
        this._parent.add(this);
    }

    removeFromParent(){
        this._isOpen = false;
        this._parent.remove(this);
    }
    open(...params){

    }

    close(...params){

    }
    isInit(){
        return this._init;
    }

    update(){
        
    }
    _update(dt){

    }
    
    isShow(){
        return this.visible;
    }

}
export default BaseView

