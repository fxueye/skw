/**
*Created on 2020年01月03日
*@author: skw QQ:281431280 
*/
import Group from '../cax/render/display/group'
import Graphics from '../cax/render/display/graphics'
import {setRafInterval, clearRafInterval} from '../cax/common/raf-interval'
import To from '../cax/common/to'
import TWEEN from '../cax/common/tween'
class ScrollView extends Group{
    constructor(option){
        super();
        this.width = option.width;
        this.height = option.height;
        this._itemList = option.itemList || [];
        
        this.itemGroup = new Group();
        this.itemGroup.height = 0;
        this.add(this.itemGroup);
        const clipPath = new Graphics()
        clipPath.rect(0,0,this.width,this.height);
        this.clip(clipPath);

        this.on("drag",this.onDrag.bind(this));
        this.on("touchend",this.onTouchend.bind(this));
        this.dragIng = false;
        this.timer = null;
        if(this._itemList.length){
            for(var i = 0 , len = this._itemList.length; i < len; i++){
                var item = this._itemList[i];
                item.y = item.height * i;
                this.itemGroup.height += item.height;
                this.itemGroup.add(item);
                item.on("tap",this.onTap.bind(this));
            }
        }
        
    }

    onDrag(e){
        if(this.itemGroup.height > this.height){
            this.dragIng = true;
            if(this.timer == null){
                this.timer = setRafInterval(this._update.bind(this),1000);
            }
            if(e.stageY < this.y){
                this.onDragEnd();
                return;
            }else if(e.stageY > this.y + this.height){
                this.onDragEnd();
                return;
            }
            var y = e.stageY - this.y ;
            if(this.lastY){
                var dis = this.lastY - y;
                this.itemGroup.y -= dis;
            
            }
            this.lastY = y;
        }
        
    }
    onTap(e){

    }

    _update(){
        if(this.dragIng){
            this.onDragEnd();
 
        }
    }
    onTouchend(e){
        this.onDragEnd();
    }


    onDragEnd(){
        if(this.dragIng){
            this.lastY = null;
        
            clearRafInterval(this.timer);
            this.dragIng = false;
            this.timer == null;
    
            if(this.itemGroup.y > 0){
                To.get(this.itemGroup).to({y:0},500,TWEEN.Easing.Quintic.Out).start();
            }else if(this.itemGroup.y < -this.itemGroup.height + this.height){
                To.get(this.itemGroup).to({y:-this.itemGroup.height + this.height},500,TWEEN.Easing.Quintic.Out).start();
            }
        }
        
    }
    
}

export default ScrollView;