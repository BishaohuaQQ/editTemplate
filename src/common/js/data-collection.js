import {getAttr, getStyle, getEl} from './dom'

const data = {
  data: {},
  version: '1.0'
}
// 转换缩写
export function transferAbbr (abbreviate) {
  if (!abbreviate) return
  let attr = ''
  switch (abbreviate) {
    case 'img':
      attr = 'src'
      break
    case 'bgImg':
      attr = 'backgroundImage'
      break
    case 'bgG':
      attr = 'backgroundImage'
      break
    case 'bgC':
      attr = 'backgroundColor'
      break
    case 'bdC':
      attr = 'borderColor'
      break
    case 'text':
      attr = 'innerHTML'
      break
    case 'color':
      attr = 'color'
      break
  }
  return attr
}

export function getData (select) {
  if (!select) return
  let tmpData = data.data = {}
  const els = document.querySelectorAll(select)
  els.forEach(item => {
    const region = getAttr(item, 'data-region')
    const query = getAttr(item, 'data-query')
    const editType = getAttr(item, 'data-edit-type')
    const content = getAttr(item, 'data-edit-content')
    const size = getAttr(item, 'data-size')
    const index = getAttr(item, 'data-index')

    if (region) {
      if (!tmpData[region]) {
        tmpData[region] = []
      }
      let itemData = {
        size,
        query,
        index,
        content,
        editType
      }
      let transferA = transferAbbr(editType)
      if (transferA === 'src' || transferA === 'innerHTML') {
        itemData[editType] = item[transferA]
      } else {
        itemData[editType] = getStyle(item, transferA).replace(/(url\("?)|("?\))/ig, '')
      }
      tmpData[region].push(itemData)
    }
  })
  return data
}

function escapeSetS (el, types, val) {
  if (!el) return
  switch (types) {
    case 'img':
      el.src = val
      break
    case 'bgImg':
      el.style.backgroundImage = `url(${val})`
      break
    case 'bgC':
      el.style.backgroundColor = val
      break
    case 'bdC':
      el.style.borderColor = val
      break
    case 'text':
      el.innerHTML = val
      break
    case 'color':
      el.style.color = val
      break
  }
}

// setStyle
export function setStyle (skinConfig) {
  for (let key in skinConfig.data) {
    skinConfig.data[key].map(item => {
      if (item.index) {
        escapeSetS(getEl(item.query)[item.index], item.editType, item[item.editType])
        // 给元素绑定投放id
        if (item.putonId) {
          getEl(item.query)[item.index].setAttribute('data-putonid', item.putonId)
        }
      } else {
        for (let i = 0, els = getEl(item.query); i < els.length; i++) {
          const $el = els[i]
          escapeSetS($el, item.editType, item[item.editType])

          // 给元素绑定投放id
          if (item.putonId) {
            $el.setAttribute('data-putonid', item.putonId)
          }
        }
      }
    })
  }
}
