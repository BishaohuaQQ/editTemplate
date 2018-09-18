'use strict'
import {getElemPos} from 'common/js/common'

export class Drag {
  constructor (el, options) {
    const $el = this.getEl(el)
    if ($el) {
      this.$el = $el
    } else {
      console.warn('期待参数有误')
      return
    }
    this.init()
    this.initParams(options)
  }

  // 查找正确的元素
  getEl (el) {
    if (typeof el === 'string') {
      if (document.querySelector) {
        return document.querySelector(el)
      } else {
        if (el.indexOf('#') > 0) {
          return document.getElementById(el)
        } else if (el.indexOf('.') > 0) {
          console.warn('期待参数为元素或ID')
          return false
        } else {
          return document.getElementsByTagName(el)[0]
        }
      }
    } else {
      return el
    }
  }

  // 初始化
  init () {
    const _this = this
    this.$el.onmousedown = function (ev) {
      _this.dragDown(_this, ev)
    }
  }

  // 初始化参数
  initParams (options) {
    options = options || {}
    options.left = this.$el.offsetLeft
    options.top = this.$el.offsetTop
    this._params = options
  }

  // 鼠标按下
  dragDown (_this, ev) {
    const oEvent = ev || window.event
    const $el = _this.$el
    const clientX = oEvent.clientX
    const clientY = oEvent.clientY
    let left = $el.offsetLeft
    let top = $el.offsetTop
    const disX = clientX - left
    const disY = clientY - top

    _this.disX = disX
    _this.disY = disY
    let rt = _this._params.downFn && _this._params.downFn({
      el: $el,
      clientX: clientX,
      offsetLeft: left,
      offsetTop: top,
      disX: disX,
      disY: disY
    })

    oEvent.preventDefault()
    if (!rt) {
      return
    }
    document.onmousemove = function (ev) {
      _this.dragMove(_this, ev)
    }
    document.onmouseup = function (ev) {
      _this.dragUp(_this, ev)
    }
  }

  // 鼠标移动
  dragMove (_this, ev) {
    const oEvent = ev || window.event
    const $el = _this.$el
    const clientY = oEvent.clientY
    const clientX = oEvent.clientX
    const disY = _this.disY
    const disX = _this.disX
    let top = clientY - disY
    let left = clientX - disX

    if (_this._params.boundary) {
      const clientHeight = document.documentElement.clientHeight
      const clientWidth = document.documentElement.clientWidth
      const elWidth = _this.$el.offsetWidth
      const elHeight = _this.$el.offsetHeight

      if (left <= 0) {
        left = 0
      } else if (left >= clientWidth - elWidth) {
        left = clientWidth - elWidth
      }
      if (top <= 0) {
        top = 0
      } else if (top >= clientHeight - elHeight) {
        top = clientHeight - elHeight
      }
    }

    _this._params.left = left
    _this._params.top = top
    $el.style.left = left + 'px'
    $el.style.top = top + 'px'

    const elPos = getElemPos(_this.$el)
    _this._params.moveFn && _this._params.moveFn({
      el: $el,
      clientX: clientX,
      offsetLeft: elPos.x,
      offsetTop: elPos.Y,
      disX: disX,
      disY: disY
    })
    oEvent.preventDefault()
  }

  // 鼠标抬起
  dragUp (_this) {
    const _params = _this._params
    _this._params.upFn && _this._params.upFn({
      left: _params.left,
      top: _params.top,
      el: _this.$el
    })

    document.onmousemove = null
    document.onmouseup = null
  }
}

export class CollisionDet {
  constructor (els) {
    this.$els = document.querySelectorAll(els)
  }

  test (ops, fn) {
    let arr = []
    const elPos = getElemPos(ops.el)

    this.$els.forEach(item => {
      let itemPos = null
      if (item) {
        itemPos = getElemPos(item)
      } else {
        return
      }
      let el = ops.el
      let l2 = elPos.x
      let t2 = elPos.y
      let r2 = l2 + el.offsetWidth
      let b2 = t2 + el.offsetHeight

      let l1 = itemPos.x
      let t1 = itemPos.y
      let r1 = l1 + item.offsetWidth
      let b1 = t1 + item.offsetHeight

      if (b1 < t2 || l1 > r2 || t1 > b2 || r1 < l2) {
      } else {
        arr.push(item)
      }
    })
    fn && fn(arr)
  }
}
