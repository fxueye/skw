/**
*Created on 2019年8月20日
*@author: skw QQ:281431280 
*/
class Loader{
    constructor(){
        this._imgsTemp = {};
        this._imgs = {};
        this._progress = null;
        this._complete = null;
        this._onerror = null;
        this._resBasePath = './';
    }
    /**
     * @param {string} value
     */
    set resBasePath(value){
        this._resBasePath = value;
    }
    /**
     * @param {any} value
     */
    set Progress(value){
        this._progress = value;
    }

    /**
     * @param {any} value
     */
    set Complete(value){
        this._complete = value;
    }

    /**
     * @param {any} value
     */
    set Onerror(value){
        this._onerror = value;
    }


    image(name,path){
        this._imgsTemp[name] = path;
    }

    loading(){
        
        const self = this;
        if(this._resBasePath){
            for(var key in this._imgsTemp){
                this._imgsTemp[key] = this._resBasePath+'/'+this._imgsTemp[key];
            }
        }
        var keys = Object.keys(this._imgsTemp)
        var values = Object.values(this._imgsTemp);
        Loader.loadImgs({
            imgs:values,
            progress:(progress,loaded,index,img)=>{
                if(self._progress){
                    self._progress(progress,loaded,index,img)
                }        
                self._imgs[keys[index]] = img;
            },
            complete:(imgs)=>{
                if(self._complete){
                    self._complete(imgs);
                }
                self._imgsTemp = {};
            },
            onerror:(index)=>{
                if(self._onerror){
                    self._onerror(index);
                }
                self._imgsTemp = {};
            }
          })
          
    }
    _loading(){
        
        const self = this;
        if(this._resBasePath){
            for(var key in this._imgsTemp){
                this._imgsTemp[key] = this._resBasePath+'/'+this._imgsTemp[key];
            }
        }
        var keys = Object.keys(this._imgsTemp)
        var values = Object.values(this._imgsTemp);
        Loader._loadImgs({
            imgs:values,
            progress:(progress,loaded,index,img)=>{
                if(self._progress){
                    self._progress(progress,loaded,index,img)
                }        
                self._imgs[keys[index]] = img;
            },
            complete:(imgs)=>{
                if(self._complete){
                    self._complete(imgs);
                }
                self._imgsTemp = {};
            },
            onerror:(index)=>{
                if(self._onerror){
                    self._onerror(index);
                }
                self._imgsTemp = {};
            }
          })
          
    }
    static loadImg(option){
        const img = new Image();
        img.crossOrigin=option.crossOrigin || "";
        img.onload = function () {
          option.complete(this);
        }
        img.onerror = function(){
            console.log("img load error");
            if(option.fail){
                option.fail();
            }
        }
        img.src = option.img;
    }
    static loadImgs(option) {
        //IE10 不支持
        const result = [];
        let loaded = 0;
        const len = option.imgs.length;
        option.imgs.forEach((src, index) => {
          const img = new Image();
          img.crossOrigin=option.crossOrigin || "";
          img.onload = (function (i, img) {
            return function(){
              result[i] = img;
              loaded++;
              option.progress && option.progress(loaded / len, loaded, i, img, result);
              if (loaded === len) {
                option.complete && option.complete(result);
              }
            }
          })(index,img)
          img.onerror =  (function (i) {
            return function(){
              option.onerror && option.onerror( i);
            }
          })(index)
          img.src = src;
          
        })
    }
    static _loadImg(option){

        var xhr = new XMLHttpRequest();
        xhr.onload = (function (xhr) {
            return function(){
                var url = URL.createObjectURL(xhr.response);
                var img = new Image();
                img.onload =(function(img){
                    return function(){
                        option.complete(img);
                        URL.revokeObjectURL(url);
                    }
                })(img)
                img.src = url;
            }
        })(xhr)
        xhr.onerror = function(){
            if(option.fail){
                option.fail();
            }
        }
        xhr.open('GET', option.img, true);
        xhr.responseType = 'blob';
        xhr.send();

    }
    static _loadImgs(option){
        //所有浏览器都支持
        const result = [];
        let loaded = 0;
        const len = option.imgs.length;
        option.imgs.forEach((src, index) => {
            var xhr = new XMLHttpRequest();
            xhr.onload = (function (i,xhr) {
                return function(){
                    var url = URL.createObjectURL(xhr.response);
                    var img = new Image();
                    img.onload =(function(idx,img){
                        return function(){
                            result[idx] = img;
                            loaded++;
                            option.progress && option.progress(loaded / len, loaded, idx, img, result);
                            if (loaded === len) {
                              option.complete && option.complete(result);
                            }
                            URL.revokeObjectURL(url);
                        }
                    })(i,img)
                    img.src = url;
                }
            })(index,xhr)
            xhr.onerror =  (function (i) {
                return function(){
                  option.onerror && option.onerror( i);
                }
              })(index)
            xhr.open('GET', src, true);
            xhr.responseType = 'blob';
            xhr.send();
        })
    }

    get Imgs(){
        return this._imgs;
    }
    

}
export default Loader;