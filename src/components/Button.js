/**
*Created on 2019年8月24日
*@author: skw QQ:281431280 
*/
import cax from 'cax';
class Button extends cax.Group{
    constructor(options){
        super();
        if(options.bgImg){
            this._bgImg = new cax.Bitmap(options.bgImg);
            this.add(this._bgImg);

        }
        if(options.text){
            this._text = new cax.Text(options.text,{
                font:options.font,
                color:options.color
            });
        }
        this.add(this._text);
        this.height = options.width || this._bgImg.height || 100;
        this.width = options.width || this._bgImg.width || 200;
    }
    get text(){
        return this._text;
    }

}
export default Button;