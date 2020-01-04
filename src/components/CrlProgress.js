/**
*Created on 2020年01月03日
*@author: skw QQ:281431280 
*/
import Group from '../cax/render/display/group'
import Graphics from '../cax/render/display/graphics'
class CrlProgress extends Group{
    constructor(options={}){
        super();
        this._radius = options.radius || 55;
        this._startAngle = options.startAngle || 0;
        this._endAngle = options.endAngle || 2 * Math.PI;
        this._progress = options.progress || 0;
        this._anticlockwise = options.anticlockwise || false;
        this._barColor = options.barColor || "#8024AB";
        this._bgColor = options.bgColor || "#FFFFFF";
        this._bgWidth = options.bgWidth || 20;
        this._barWith = options.barWidth || 8;
        this._text = options.text || "";
        this.draw();
    }
    draw(){
        this.empty();
        var diffAngle = this._progress  * Math.PI * 2;
        const graphics = new Graphics()
        graphics.beginPath();
        graphics.lineWidth(this._bgWidth);
        graphics.arc(0,0,this._radius,this._startAngle,Math.PI * 2,this._anticlockwise);
        graphics.strokeStyle(this._bgColor);
        graphics.stroke();

        graphics.beginPath();
        graphics.lineWidth(this._barWith);
        graphics.arc(0,0,this._radius,this._startAngle,diffAngle + this._startAngle,this._anticlockwise);
        graphics.strokeStyle(this._barColor);
        graphics.stroke();
        this.add(graphics);
    }
    set progress(val){
        this._progress = val;
        this.draw();
    }
}
export default CrlProgress;