/**
*Created on 2019年8月27日
*@author: skw QQ:281431280 
*/
import cax from 'cax';
import App from './App';
class EasyLoading extends cax.Group{
    constructor(){
        super();
        this.timer = null;
        this.width = App.width;
        this.height = App.height;
        this.imgData = "data:image/png;base64,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";
        this.loading = new cax.Group();
        this._loading = new cax.Bitmap(this.imgData);
        this._loading.width = 100;
        this._loading.height = 100;
        this.mask = new cax.Group();
        this.mask.width = this.width;
        this.mask.height = this.height;
        var rect = new cax.Rect(this.width,this.height,{
            fillStyle: 'black'
        })
        this.mask.add(rect);
        this.mask.alpha = 0.01;
        this.add(this.mask); 
        this.loading.x = this.width / 2 ;
        this.loading.y = this.height / 2 ;
        this.add(this.loading); 
        
        this._loading.x = -this._loading.width / 2;
        this._loading.y = -this._loading.height / 2;
        this.loading.add(this._loading);
        this.loading.alpha = 0.7;
        
    }

    show(){
        this.timer = cax.setInterval(this._update.bind(this),100);
        App.LoadStage.add(this);
    }

    hide(){
        cax.clearInterval(this.timer);
        App.LoadStage.remove(this);
    }
    _update(){
        this.loading.rotation += 20;
    }
}
export default EasyLoading;

