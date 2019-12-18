/**
*Created on 2019年8月24日
*@author: skw QQ:281431280 
*/
import Group from '../cax/render/display/group'
import Bitmap from '../cax/render/display/bitmap'
import CaxText from '../cax/render/display/text'
class Button extends Group{
    constructor(options){
        super();
        if(options.bgImg){
            this._bgImg = new Bitmap(options.bgImg);
            this.add(this._bgImg);

        }
        if(options.text){
            this._text = new CaxText(options.text,{
                font:options.font,
                color:options.color
            });
        }
        this.add(this._text);
        this.height = options.height || this._bgImg.height || 100;
        this.width = options.width || this._bgImg.width || 200;
    }
    get text(){
        return this._text;
    }

}
export default Button;