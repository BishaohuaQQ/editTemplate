// 设置属性
export function setAttr (el, name, val) {
  el.setAttribute(name, val)
}
// 获取属性
export function getAttr (el, name) {
  return el.getAttribute(name)
}
// 获取样式
export function getStyle (el, name, isLine) {
  if (isLine) {
    return el.style[name]
  } else {
    if (el.currentStyle) {
      return el.currentStyle[name]
    } else {
      return getComputedStyle(el, null)[name]
    }
  }
}
// 获取元素
export function getEl (select) {
  if (typeof select === 'string' && select !== '') {
    return document.querySelectorAll(select)
  }
  return []
}
