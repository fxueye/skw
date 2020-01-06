/**
*Created on 2019年8月25日
*@author: skw QQ:281431280 
*/
import Group from '../cax/render/display/group'
import CaxText from '../cax/render/display/text'
import Utils from '../core/Utils';
class Text extends Group{
    constructor(text,options){
        super();
        this._text = text;
        this.font = options.font || "12px Arial";
        this._color = options.color || "#FFFFFF";
        this.lineHeight = options.lineHeight || 12;
        this.textAlign = options.textAlign || "left";
        this._caxText = new CaxText(this._text,{
            font:this.font,
            color:this._color
        });
        this.width = options.width || this._caxText.getWidth();
        this.height = options.height | 0;
        
        this.allText = []
        this.refresh();
    }
  
    set text(value){
        this._text = value || "";
        this.refresh();
    }
    set color(value){
        this._color = value || "#FFF";
        this.refresh();
    }

    refresh(){
        this.empty();
        let textHeight = 0;
        const texts = this._text.split('\n');
        var len = texts.length;
        texts.forEach((t,idx)=>{ 
            this._caxText = new CaxText(t,{
                font: this.font,
                color: this._color,
                textAlign:this.textAlign
            })
            const textWidth = this._caxText.getWidth();
            
            if(textWidth > this.width){
                const step = Math.round( t.length * this.width / textWidth );
                const textList = Utils.stringSplit(t,step);
                textList.forEach((text,index)=>{
                    this._caxText = new CaxText(text,{
                        font: this.font,
                        color: this._color,
                        textAlign:this.textAlign
                    })
                    if(this.textAlign == "center"){
                        this._caxText.x  = this.width / 2;
                    }
                    this._caxText.y =  textHeight + index * this.lineHeight;
                    this.add(this._caxText);
                })
                textHeight += textList.length * this.lineHeight;
            }else{
                this._caxText.y = textHeight;
                if(this.textAlign == "center"){
                    this._caxText.x  = this.width / 2;
                }
                this.add(this._caxText);
                textHeight += this.lineHeight;
            }
        })
 
        if(this.height == 0){
            this.height = textHeight;
        }

    }



}
export default Text;