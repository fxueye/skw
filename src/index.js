import App from './core/App'
import BaseView from './core/BaseView'
import Loader from './core/Loader'
import Utils from './core/Utils'
import ViewMgr from './core/ViewMgr'
import Button from './components/Button'
import Text from './components/Text'

import Banner from './components/Banner'
import CheckBox from './components/CheckBox'
import CrlProgress from './components/CrlProgress'
import ScrollView from './components/ScrollView'


import TWEEN from './cax/common/tween'
import To from './cax/common/to'
import './cax/common/animate'

import Stage from './cax/render/display/stage'
import WeStage from './cax/render/display/we-stage'
import Graphics from './cax/render/display/graphics'
import Bitmap from './cax/render/display/bitmap'
import CaxText from './cax/render/display/text'
import Group from './cax/render/display/group'
import Sprite from './cax/render/display/sprite'
import Shape from './cax/render/display/shape/shape'

import RoundedRect from './cax/render/display/shape/rounded-rect'
import ArrowPath from './cax/render/display/shape/arrow-path'
import Ellipse from './cax/render/display/shape/ellipse'
import Path from './cax/render/display/shape/path'

import CaxButton from './cax/render/display/element/button'

import Rect from './cax/render/display/shape/rect'
import Circle from './cax/render/display/shape/circle'
import Polygon from './cax/render/display/shape/polygon'
import EquilateralPolygon from './cax/render/display/shape/equilateral-polygon'

import {setRafInterval, clearRafInterval} from './cax/common/raf-interval'

To.easing = {
    linear: TWEEN.Easing.Linear.None
}

const skw = {
    easing: {
        linear: TWEEN.Easing.Linear.None
      },
      util: {
        randomInt: (min, max) => {
          return min + Math.floor(Math.random() * (max - min + 1))
        }
      },
    
    App,
    BaseView,
    Loader,
    Utils,
    ViewMgr,
    Button,
    Text,
    Banner,
    ScrollView,
    CrlProgress,
    Banner,
    CheckBox,

    //cax
    Stage,
    WeStage,
    Graphics,
    Bitmap,
    CaxText,
    Group,
    Sprite,
    Shape,
  
    ArrowPath,
    Ellipse,
    Path,
  
    CaxButton,
  
    RoundedRect,
    Rect,
    Circle,
    Polygon,
    EquilateralPolygon,
  
    setInterval: setRafInterval,
    clearInterval: clearRafInterval,
    tick: function (fn) {
      return setRafInterval(fn, 16)
    },
    untick: function (tickId) {
      clearRafInterval(tickId)
    },
  
    caxCanvasId: 0,
    TWEEN,
    To

};

['Quadratic',
  'Cubic',
  'Quartic',
  'Quintic',
  'Sinusoidal',
  'Exponential',
  'Circular',
  'Elastic',
  'Back',
  'Bounce'].forEach(item => {
  const itemLower = item.toLowerCase()
  skw.easing[itemLower + 'In'] = TWEEN.Easing[item].In
  skw.easing[itemLower + 'Out'] = TWEEN.Easing[item].Out
  skw.easing[itemLower + 'InOut'] = TWEEN.Easing[item].InOut

  To.easing[itemLower + 'In'] = TWEEN.Easing[item].In
  To.easing[itemLower + 'Out'] = TWEEN.Easing[item].Out
  To.easing[itemLower + 'InOut'] = TWEEN.Easing[item].InOut
})

const isWegame = typeof wx !== 'undefined' && wx.createCanvas
skw.loadImg = function (option) {
    const img = isWegame ? wx.createImage() : new Image()
    img.onload = function () {
      option.complete(this)
    }
    img.src = option.img
  }
  
  skw.loadImgs = function (option) {
    const result = []
    let loaded = 0
    const len = option.imgs.length
    option.imgs.forEach((src, index) => {
      const img = isWegame ? wx.createImage() : new Image()
      img.onload = (function (i, img) {
        return function(){
          result[i] = img
          loaded++
          option.progress && option.progress(loaded / len, loaded, i, img, result)
          if (loaded === len) {
            option.complete && option.complete(result)
          }
        }
      })(index,img)
      img.src = src
    })
  }
module.exports = skw