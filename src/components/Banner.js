/**
*Created on 2020年01月03日
*@author: skw QQ:281431280 
*/
import Group from '../cax/render/display/group'
import Rect from '../cax/render/display/shape/rect'
class Banner extends Group{
    constructor(options){
        super();
        this.timer = null;
        this._interval = options.interval || 1000;
        this._cards= options.cards || [];
        this._index = 0;
        this.currentCard = null
        this.width = options.width || 0;
        this.height = options.height || 0;
        this.isAnimation = false;
        this._scale = options.scale || 0.8;
        this.center =new Group();
        this.add(this.center);
        this.mask = new Group();
        var rect = new Rect(this.width,this.height,{
            fillStyle: '#FFF'
        })
        this.mask.add(rect);
        this.mask.alpha = 0.01;
        this.add(this.mask); 
        this.mask.on("touchstart",this.onTouchstart.bind(this));
        this.mask.on("touchmove",this.onTouchmove.bind(this));
        this.mask.on("touchend",this.onTouchend.bind(this));

        this.show()

    }


    get currentIndex(){
        return this._index;
    }

    show(){
        
        this.center.empty();
        this.leftCard = this._cards[this._index == 0 ? this._cards.length - 1:this._index - 1];
        this.leftCard.x =  0;
        this.leftCard.y = this.height / 2;
        this.leftCard.scaleX = this._scale;
        this.leftCard.scaleY = this._scale;
        this.center.add(this.leftCard);

        this.rightCard = this._cards[this._index == this._cards.length - 1? 0 : this._index + 1];
        this.rightCard.x = this.width;
        this.rightCard.y =  this.height / 2;
        this.rightCard.scaleX = this._scale;
        this.rightCard.scaleY = this._scale;
        this.center.add(this.rightCard);

        this.currentCard = this._cards[this._index];
        if(this.currentCard){
            
            this.currentCard.x = this.width / 2 ;
            this.currentCard.y = this.height / 2;
            this.currentCard.scaleX = 1;
            this.currentCard.scaleY = 1;
            this.center.add(this.currentCard)


            this.currentCard._listeners=null;
            

            this.currentCard.on("tap",this.onTap.bind(this));    
        }
    }
    onTap(e){
       
    }
    onTouchstart(e){
        this.startPoint = {x:e.stageX,y:e.stageY};
    }
    onTouchmove(e){
        if(this.isAnimation){
            return;
        }
        var x = e.stageX - this.x ;
        if(this.lastX){
           var dis = this.lastX - x;
           this.currentCard.scaleX= this._scale;
           this.currentCard.scaleY= this._scale;
           this.currentCard.x -= dis;
           this.leftCard.x -= dis;
           this.rightCard.x -= dis;
        }
        this.lastX = x;
        
    }
    onTouchend(e){
        
        self = this;
        this.endPoint = {x:e.stageX,y:e.stageY};
        var dis =  this.endPoint.x  - this.startPoint.x;
        
        if(Math.abs(dis) < this.currentCard.width / 2){
            this.isAnimation = true;
            skw.To.get(this.currentCard).to({x:this.width / 2,scaleX:1,scaleY:1},200,skw.easing.linearNone).end(() => {
                self.isAnimation = false;
            }).start();
            skw.To.get(this.leftCard).to({x:0,scaleX:this._scale,scaleY:this._scale},200,skw.easing.linearNone).end(() => {
                self.isAnimation = false;
            }).start();
            skw.To.get(this.rightCard).to({x:this.width ,scaleX:this._scale,scaleY:this._scale},200,skw.easing.linearNone).end(() => {
                self.isAnimation = false;
            }).start();
        }else{
            
            if(dis > 0){
                this._index = this._index == 0 ? this._cards.length - 1 : this._index-1;
            }else{
                this._index = this._index == this._cards.length - 1 ? 0 : this._index+1;
            }
            this.show();
        }
        this.lastX = null;
    }




    autoPlay(){
        this.timer = skw.setInterval(this._update.bind(this),this._interval);
    }

    stopPlay(){
        skw.clearInterval(this.timer)
    }

    _update(){
        console.log("##")
    }

}
export default Banner;