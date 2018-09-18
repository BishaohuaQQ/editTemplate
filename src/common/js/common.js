// 补零
export function toDou (i) {
  return i < 10 ? `0${i}` : i
}

// 获取位置
export function getElemPos (obj) {
  let pos = {
    top: 0,
    left: 0
  }

  if (obj.offsetParent) {
    while (obj.offsetParent) {
      pos.top += obj.offsetTop
      pos.left += obj.offsetLeft
      obj = obj.offsetParent
    }
  } else if (obj.x) {
    pos.left += obj.x
  } else if (obj.x) {
    pos.top += obj.y
  }
  return {x: pos.left, y: pos.top}
}

// 深度克隆对象
export function deepClone (obj) {
  let newObj = obj instanceof Array ? [] : {}
  for (let i in obj) {
    newObj[i] = typeof obj[i] === 'object' && obj[i] !== null ? deepClone(obj[i]) : obj[i]
  }
  return newObj
}
