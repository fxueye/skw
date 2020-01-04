/**
*Created on 2020年01月03日
*@author: skw QQ:281431280 
*/
import Group from '../cax/render/display/group'
import Bitmap from '../cax/render/display/bitmap'
import Rect from '../cax/render/display/shape/rect'
class CheckBox extends Group{
    constructor(options = {}){
        super();
        this._checked = options.checked || false;
        this._checkImg =  new Bitmap(options.checkImg);
        this._checkedImg = new Bitmap(options.checkedImg);
        this.width = this._checkImg.width;
        this.height = this._checkImg.height;
        var rect = new Rect(this.width,this.height,{
            fillStyle: 'black'
        })
        rect.alpha = 0.01;
        this.add(this._checkImg);
        this.add(this._checkedImg);
        this.add(rect)
        this.change();
    }
    set checked(val){
        this._checked = val;
        this.change();
    }

    get checked(){
        return this._checked;
    }

    change(){
        if(this._checked){
            this._checkedImg.visible = true;
            this._checkImg.visible = false;
        }else{
            this._checkedImg.visible = false;
            this._checkImg.visible = true;
        }
    }


}

export default CheckBox;