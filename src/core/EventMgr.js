class EventMgr{
    constructor(){
        this._listeners = null
    }
    addEventListener(type, listener, thisObject){
        var listeners = this._listeners = this._listeners || {}
        var arr = listeners[type]
        if (arr) { 
            this.removeEventListener(type, listener,thisObject) 
        }
        arr = listeners[type] 
        if (!arr) { 
            listeners[type] = [[listener,thisObject]]
        } else { 
            arr.push([listener,thisObject]) 
        }
        return listener
    }
    removeEventListener (type, listener,thisObject) {
        var listeners =  this._listeners
        if (!listeners) { return }
        var arr = listeners[type]
        if (!arr) { return }
    
        arr.every((item, index) => {
          if (item[0] === listener && item[1] === thisObject) {
            arr.splice(index, 1)
            return false
          }
          return true
        })
    }
    dispatchEvent (evt) {
      evt.target = this
      if (this._listeners) {
        let ls = this._listeners[evt.type]
        ls && ls.forEach(fn => {
          if(fn[1]){
            fn[0].call(fn[1],evt)
          }else{
            fn[0].call(this,evt)
          }
        })
      }
    }    
}
export default EventMgr
