class EventMgr{
    constructor(){
        this._listeners = null
        this._captureListeners = null
    }
    addEventListener(type, listener, thisObject,useCapture){
        var listeners
        if (useCapture) {
          listeners = this._captureListeners = this._captureListeners || {}
        } else {
          listeners = this._listeners = this._listeners || {}
        }
        var arr = listeners[type]
        if (arr) { 
            this.removeEventListener(type, listener,thisObject, useCapture) 
        }
        arr = listeners[type] 
        if (!arr) { 
            listeners[type] = [[listener,thisObject]]
        } else { 
            arr.push([listener,thisObject]) 
        }
        return listener
    }
    removeEventListener (type, listener,thisObject, useCapture) {
        var listeners = useCapture ? this._captureListeners : this._listeners
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
       
        var top = this, list = [top]
        while (top.parent) { list.push(top = top.parent) }
        var i, l = list.length
  
        // capture & atTarget
        for (i = l - 1; i >= 0 && !evt.propagationStopped; i--) {
          list[i]._dispatchEvent(evt, 0)
        }
        // bubbling
        for (i = 0; i < l && !evt.propagationStopped; i++) {
          list[i]._dispatchEvent(evt, 1)
        }
      
    }
  
    _dispatchEvent (evt, type) {
      evt.target = this
      if (this._captureListeners && type === 0) {
        let cls = this._captureListeners[evt.type]
        cls && cls.forEach(fn => {
          fn[0].call(fn[1], evt)
        })
      }
  
      if (this._listeners && type === 1) {
        let ls = this._listeners[evt.type]
        ls && ls.forEach(fn => {
            fn[0].call(fn[1], evt)
        })
      }
    }
    
}
export default EventMgr
