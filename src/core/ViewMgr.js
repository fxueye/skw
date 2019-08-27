/**
*Created on 2019年8月20日
*@author: skw QQ:281431280 
*/
class ViewMgr{
    constructor(){
        this._views = {};
        this._opens = [];
    }
    register(key,view){
        if(view == null){
            return;
        }
        if(this._views[key]){
            return;
        }
        this._views[key] = view;
    }
    unregister(key){
        if(!this._views[key]){
            return;
        }
        this._views[key] = null;
        delete this._views[key];
    }
    getView(key){
        return this._views[key];
    }

    open(key,...params){
        // console.log("open:" + key);
        var view = this.getView(key);
        if(view == null){
            console.error("view_" + key + "not find!");
            return;
        }

        if(view.isShow()){
            return view;
        }
        if(!view.isInit()){
            view.init();
        }
        view.visible = true;
        view.add2Parent();
        view.open.apply(view,params);
        return view;
    }
    close(key,...params){
        // console.log("close:" + key);
        var view = this.getView(key);
        if(view == null){
            return;
        }
        view.visible = false;
        view.removeFromParent();
        view.close.apply(view,params)
    }
    push(key,closeLast = true, ...param){
        // console.log(this._opens);
        var index = this._opens.indexOf(key);
        if(index > -1){
            return;
        }
        var lastKey = this._opens[this._opens.length - 1];
        if(lastKey && closeLast){
            this.close(lastKey);
            this._opens.pop();
        }
        var params = [];
        params.push(key);
        params.push.apply(params,param);
        this.open.apply(this,params);
        this._opens.push(key);
    }
    pop(openLast=true){
        var key = this._opens.pop();
        // console.log("pop key:" + key)
        if(key){
            this.close(key)
        }
        var lastKey = this._opens[this._opens.length - 1];
        if(lastKey && openLast){
            this.open(lastKey); 
        }
    }
    closeAll(){
        for(var i = this._opens.length - 1 ; i >= 0; i-- ){
            var key = this._opens.pop();
            if(key)
                this.close(key);
        }
    }
    update(){
        for(var i = this._opens.length - 1 ; i >= 0; i-- ){
            var key = this._opens[i];
            var view = this.getView(key);
            if(view){
                view.update()
            }
                
        }
    }
}
export default ViewMgr