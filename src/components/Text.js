/**
*Created on 2019年8月25日
*@author: skw QQ:281431280 
*/
import Group from '../cax/render/display/group'
import CaxText from '../cax/render/display/text'
import Rect from '../cax/render/display/shape/rect'
import Utils from '../core/Utils';
class Text extends Group{
    constructor(options){
        super();
        this.font = options.font || "12px Arial";
        this._text = options.text || "";
        this.color = options.color || "#FFFFFF";
        this.lineHeight = options.lineHeight || 12;
        this.textAlign = options.textAlign || "left";
        this._caxText = new CaxText(this._text,{
            font:this.font,
            color:this.color
        });
        this.width = options.width || this._caxText.getWidth();
        this.height = options.height | 0;
        this.startPoint = null;
        this.page = 1;
        this.allPage = 0;
        this.pageNum = 0;
        this.mask = new Group();
        this.mask.width = this.width;
        this.mask.height = this.height;
        this.on("touchstart",this.touchstart.bind(this));
        this.on("touchend",this.touchend.bind(this));
        this.bgColor = options.bgColor || '#FFFFFF';
        this.allText = []
        this.refresh();
    }
    touchstart(e){
        this.startPoint = {x:e.stageX,y:e.stageY};
    }

    touchend(e){
        if(this.startPoint){
            var len = e.stageY - this.startPoint.y;
            if(Math.abs(len) > 100){
                if(len < 0){
                    this.page= this.page + 1 > this.allPage ? this.allPage : this.page + 1 ;
                }else{
                    this.page = this.page - 1 > 1 ? this.page - 1 :1 ;
                }
            }
            this.startPoint= null;
        }
        this.reader();
    }
    set text(value){
        this._text = value || "";
        this.refresh();
    }

    refresh(){
        this.allText = [];
        var rect = new Rect(this.width,this.height,{
            fillStyle: this.bgColor
        })
        this.mask.add(rect);
        this.mask.alpha = 0.01;
        let textHeight = 0;
        const texts = this._text.split('\n');
        texts.forEach((t)=>{ 
            this._caxText = new CaxText(t,{
                font: this.font,
                color: this.color,
                textAlign:this.textAlign
            })
            const textWidth = this._caxText.getWidth();
            
            if(textWidth > this.width){
                const step = Math.round( t.length * this.width / textWidth );
                const textList = Utils.stringSplit(t,step);
                textList.forEach((text,index)=>{
                    this._caxText = new CaxText(text,{
                        font: this.font,
                        color: this.color,
                        textAlign:this.textAlign
                    })
                    if(this.textAlign == "center"){
                        this._caxText.x  = this.width / 2;
                    }
                    // this._caxText.y =  textHeight + (index+1) * this.lineHeight;
                    this.allText.push(this._caxText);
                    // this.add(this._caxText);
                })
                textHeight += textList.length * this.lineHeight;
            }else{
                // this._caxText.y = textHeight + this.lineHeight;
                if(this.textAlign == "center"){
                    this._caxText.x  = this.width / 2;
                }
                this.allText.push(this._caxText);
                // this.add(this._caxText);
                textHeight += this.lineHeight;
            }
        })
 
        if(this.height == 0){
            this.height = textHeight;
        }
        this.mask.height = this.height;
        this.pageNum = Math.floor(this.height / this.lineHeight);
        this.allPage= Math.ceil(this.allText.length / this.pageNum);
       
        this.reader();
    }
    reader(){
        this.empty();
        this.add(this.mask);
        let textHeight = 0;
        var start = (this.page - 1) * this.pageNum;
        var end = start + this.pageNum;
        var len = this.allText.length;
        end = end < len ? end : len ;
        for(var i = start;  i < end; i++){
            var text = this.allText[i];
            text.y = textHeight
            textHeight += this.lineHeight;
            this.add(text);
        }
    }



}
export default Text;