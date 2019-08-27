/**
*Created on 2019年8月20日
*@author: skw QQ:281431280 
*/
import cax from 'cax';
import App from './App';
class Toast extends cax.Group{
    constructor(){
        super();
        this._msg = "";
        this._delay = 5000;
        this.msgText = new cax.Text("",{
            font: '35px Arial',
            color: '#FFFFFF',
            baseline: 'top' 
        })
        this.init();
    }
    
    static makeToast(msg,delay = 500){
        var toast = new Toast();
        toast.msg = msg;
        toast.delay = delay;
        return toast;
    }


    init(){

    }

    /**
     * @param {string} value
     */
    set msg(value){
        this._msg = value;
        this.msgText.text = this._msg;
        
        
        this.width = this.msgText.getWidth() + 60;
        this.height = 75;
        var rect = new cax.Rect(this.width,this.height,{
            fillStyle: 'black'
        })
        this.x = App.width / 2 - this.width / 2;
        this.y = App.height / 2 - this.height / 2;

        this.msgText.x = this.width / 2 - this.msgText.getWidth() / 2;
        this.msgText.y = this.height / 2 - 35/2;
        this.add(rect);
        this.add(this.msgText);

    }
    /**
     * @param {number} value
     */
    set delay(value){
        this._delay = value;
    }
    
    show(){
        App.LoadStage.add(this);
        this.alpha = 0;
        cax.To.get(this).to({alpha:1},this._delay / 2,cax.easing.backOut).end(this.hide.bind(this)).start();
    }

    hide(){
        cax.To.get(this).to({alpha:0},this._delay / 2,cax.easing.cubicIn).end(()=>{
            App.LoadStage.remove(this);
        }).start();
    }
}
export default Toast;