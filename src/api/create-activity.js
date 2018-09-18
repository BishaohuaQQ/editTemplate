import qs from 'qs'
import axios from 'axios'

// 获取模板
export function getEditTemplate (templateId) {
  return axios.get(`/html/template/${templateId}/index.html?t=${new Date().getTime()}`).then((res) => {
    return Promise.resolve(res)
  }).catch(err => {
    console.log(err)
  })
}
// 获取活动信息
export function getActivityInfo (params) {
  return axios.post('/Iad_CustomerTemplate/GetActivityInfo', qs.stringify(params)).then((res) => {
    return Promise.resolve(res.data)
  }).catch(err => {
    console.log(err)
  })
}
// 保存皮肤
export function saveActivityInfo (params) {
  return axios.post('/Iad_CustomerTemplate/SaveActivityInfo', params).then((res) => {
    return Promise.resolve(res.data)
  }).catch(err => {
    console.log(err)
  })
}
// 获取活动列表
export function searchActivityList (params) {
  return axios.post('/Iad_CustomerTemplate/SearchActivityList', params).then((res) => {
    return Promise.resolve(res.data)
  }).catch(err => {
    console.log(err)
  })
}

//获取活动运营列表
export function getOperatingsList () {
  return axios.get('/IAD_Active/GetActiveOpreateUserList').then((res) => {
    return Promise.resolve(res.data)
  }).catch(err => {
    console.log(err)
  })
}


//获取活动类型列表
export function getActiveTypeList () {
  return axios.post('/Iad_CustomerTemplate/GetActivityType').then((res) => {
    return Promise.resolve(res.data)
  }).catch(err => {
    console.log(err)
  })
}



//获取广告位名称
export function getActiveNamesList (params) {
  return axios.get(`/IAD_ChannelManage/GetSource?name=${params.uname}`).then((res) => {
    return Promise.resolve(res.data)
  }).catch(err => {
    console.log(err)
  })
}

//删除活动
export function delectActive (params) {
  return axios.post('/Iad_CustomerTemplate/DelActivity', qs.stringify(params)).then((res) => {
    return Promise.resolve(res.data)
  }).catch(err => {
    console.log(err)
  })
}

//修改权重
export function updataWeight (params) {
  return axios.post('/Iad_CustomerTemplate/UpdateActivityWeight', qs.stringify(params)).then((res) => {
    return Promise.resolve(res.data)
  }).catch(err => {
    console.log(err)
  })
}

//获取广告位信息
export function getMediaList (params) {
  return axios.post('/Iad_CustomerTemplate/GetMediaList', qs.stringify(params)).then((res) => {
    return Promise.resolve(res.data)
  }).catch(err => {
    console.log(err)
  })
}

//弹层列表接口
export function getPropList (params) {
  return axios.post('/Iad_CustomerTemplate/SearchActivityLayerList', params).then((res) => {
    return Promise.resolve(res.data)
  }).catch(err => {
    console.log(err)
  })
}

//获取弹层信息
export function getLayerInfo (params) {
  return axios.post('/Iad_CustomerTemplate/GetActivityLayerInfo', qs.stringify(params)).then((res) => {
    return Promise.resolve(res.data)
  }).catch(err => {
    console.log(err)
  })
}

//弹层删除按钮
export function deleteLayer (params) {
  return axios.post('/Iad_CustomerTemplate/DelActivity', qs.stringify(params)).then((res) => {
    return Promise.resolve(res.data)
  }).catch(err => {
    console.log(err)
  })
}

//弹层开启/关闭接口
export function openCloseLayer (params) {
  return axios.post('/Iad_CustomerTemplate/OpenActivity', qs.stringify(params)).then((res) => {
    return Promise.resolve(res.data)
  }).catch(err => {
    console.log(err)
  })
}

//弹层编辑新建保存接口

export function saveLayerInfo (params) {
  return axios.post('/Iad_CustomerTemplate/SaveActivityLayerInfo', params).then((res) => {
    return Promise.resolve(res.data)
  }).catch(err => {
    console.log(err)
  })
}

//分媒体数据查询接口
export function LayerSourceStatis (params) {
	console.log(params);
  return axios.get('/IAD_ADStatis/LayerSourceStatis', {
  	params
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch(err => {
    console.log(err)
  })
}

//分媒体导出数据接口

export function LayerSourceStatisExport (params) {
  return axios.get('/IAD_ADStatis/LayerSourceStatisExport', {
  	params
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch(err => {
    console.log(err)
  })
}

//获取弹层类型列表
export function GetActivityLayerType () {
  return axios.post('/Iad_CustomerTemplate/GetActivityLayerType').then((res) => {
    return Promise.resolve(res.data)
  }).catch(err => {
    console.log(err)
  })
}