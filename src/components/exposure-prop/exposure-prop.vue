<template lang="html">
  <div class="create-activity">
    <crunmbs :superiorCatalogue="superiorCatalogue"></crunmbs>
    <div class="main">
      <div class="page-controller">
        <router-link class="item-control" :to="{ path: '/modelprop' }"><el-button type="primary" style="width: 120px;">弹层中心</el-button></router-link>
        <router-link class="item-control" :to="{ path: '/createprop' }"><el-button style="width: 120px;" >已创建弹层</el-button></router-link>
      </div>
      <div class="module-wrap">
        <h3>1、弹层规则配置</h3>
        <div class="rule-config">
          <el-form :inline="true" :model="ruleConfig" class="demo-form-inline">
            <el-form-item label="弹层标题" required style="width: 350px;">
              <el-input style="width:127%;right:-15px;" v-model.trim="ruleConfig.activityTitle" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="活动运营" required >
                <el-select v-model="name" clearable placeholder="请选择" >
	              <el-option
	                v-for="item in nameList"
	                :key="item.value"
	                :label="item.label"
	                :value="item.value">
	              </el-option>
	            </el-select>
            </el-form-item>
            <el-form-item label="弹层显示" required>
                <el-select v-model="prop" clearable placeholder="请选择">
	              <el-option
	                v-for="item in propList"
	                :key="item.value"
	                :label="item.label"
	                :value="item.value">
	              </el-option>
	            </el-select>
            </el-form-item>
            <br />
            <el-form-item label="选择广告位" required>
              <el-radio-group v-model="ruleConfig.media" @change="chooseMedia" size="medium">
                <el-button :class="{ activeClass : isActive === 0}"  @click="selectedClass(0)">默认全部</el-button>
								<el-button :class="{ activeClass : isActive === 1}"  @click="selectedClass(1)">定投({{this.dingtouarr.length}})</el-button>
								<el-button :class="{ activeClass : isActive === 2}"  @click="selectedClass(2)">屏蔽({{this.pingbiarr.length}})</el-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="弹层次数" required style="left: -9px;position: relative;">
              <el-input v-model="ruleConfig.frequency" placeholder="请输入" style= "width:107%"></el-input>
            </el-form-item>
            <el-form-item label="无限返回" required style = "left: 6px;position: relative;">
                <el-switch
									  v-model="value1"
									  active-color="#13ce66"
									>
								</el-switch>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="module-wrap">
        <h3>2、弹层样式配置</h3>
        <el-row class="activity-config">
          <el-col :span="6">
            <div class="phone-model">
              <div class="view-phone" v-loading="templateLoading">
                <scroll ref="scroll" :scrollbars="true" :mouseWheel="true">
                  <div v-html="templateContent"></div>
                </scroll>
              </div>
              
              <div v-if="tip" class="phone-tip">
              	暂无模板
              </div>
            </div>
          </el-col>
          <el-col :span="18" class="editable-ele">
            <div class="config-wrapper">
              <el-row>
                <el-col :span="20" class="edit-list">
                  <el-tabs v-model="activityEl" @tab-click="tabClick">
                    <el-tab-pane label="红包素材" name="page">
                      <item-config :itemData="skinConfig.page" region="page" @activeItem="selectedItem" />
                    </el-tab-pane>
                    <el-tab-pane label="按钮素材" name="game">
                      <item-config :itemData="skinConfig.game" region="game" @activeItem="selectedItem" />
                    </el-tab-pane>
                    <!--<el-tab-pane label="奖品区域" name="prize">
                      <item-config :itemData="skinConfig.prize" region="prize" @activeItem="selectedItem" />
                    </el-tab-pane>
                    <el-tab-pane label="活动规则" name="rule">
                      <item-config :itemData="skinConfig.rule" region="rule" @activeItem="selectedItem" />
                    </el-tab-pane>-->
                  </el-tabs>
                  <div class="operate-activity">
                    <div class="btn-wrap">
                      <el-button size="small" @click="back" plain>返回上一步</el-button>
                      <el-button size="small"  v-bind:disabled="dis" type="primary" @click="saveActivity">保存并发布</el-button>
                    </div>
                  </div>
                </el-col>
                <el-col :span="4" class="edit-detail">
                  <div class="edit-detail-top">
                    <el-button type="text" icon="" class="revoke" style="height:45px">&nbsp;</el-button>
                  </div>
                  <div class="edit-detail-body">
                    <div class="edit-box" v-if="editType === 'img'">
                      <div v-if="uploadImg.fileList.length" class="preview-img">
                        <img v-if="uploadImg.fileList[0]" :src="uploadImg.fileList[0].url">
                        <a class="removeImg" @click="delImg"><i class="el-icon-close"></i></a>
                      </div>
                      <div v-if="!uploadImg.fileList.length" class="blank-img">
                        <span>空</span>
                      </div>
                      <el-upload class="upload-demo" action="http://test6.plat.adjuz.net/Iad_CustomerTemplate/UploadImg" accept="image/jpeg,image/png" :on-success="uploadSuccess" :on-error="uploadError" :on-progress="progress" :file-list="uploadImg.fileList" :on-remove="delImg">
                        <div class="img-size">尺寸：{{imgSize}}</div>
                        <div class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        <el-button size="small" type="primary" :disabled="uploadImg.imgLoad" @click="sub">点击上传</el-button>
                      </el-upload>
                    </div>
                    <div class="edit-box color-edit" v-if="editType === 'color'">
                      <el-color-picker v-model="firstColor" show-alpha @active-change="colorPicker"></el-color-picker>
                      <el-color-picker v-model="lastColor" show-alpha @active-change="colorPicker" v-show="currentConfig.editType === 'bgG'"></el-color-picker>
                    </div>
                    <div class="text-area" v-if="editType === 'text'">
                      <el-input type="textarea" @input="textUpload" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textArea"></el-input>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <el-dialog  :visible.sync="centerDialogVisible" :show-close= "false" width="700px" height="580px" center>
      <!--对话框头部-->
      <div class="frame-header">
	        <h4>选择广告位</h4>
	        <span class="el-icon-close" @click="cancel"></span>
	        <div class="search-box">
	            <i class="icon glyphicon glyphicon-search"></i> 
	            <input type="text" v-model="searchVal"  id="search-input" placeholder="输入广告位名称或ID">
	        </div>
      </div>
      <div>
      	<ul class="pro-ul">
      		
      		<li v-for="(item , index) in tempMediaList" class="pro-li" :title="item.SourceName">
      			<input :class="{select : adversIds.indexOf(item.SourceId)>=0}" @click="selected(index,item.SourceId)"  class="pro-btn" type="button" name="" id="" :sourceid="item.SourceId" :value="item.SourceName" />
      			
      		</li>
  
      	</ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="closedialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import Crunmbs from 'base/crumbs/crumbs'
import ItemConfig from './item-config'
import Scroll from 'base/scroll/scroll'
import {getAttr} from 'common/js/dom'
import {getEditTemplate, saveActivityInfo, getActivityInfo,getLayerInfo,getOperatingsList,saveLayerInfo} from 'api/create-activity'
import {getData, transferAbbr, setStyle} from 'common/js/data-collection'
import {getMediaList} from 'api/create-activity'

// 当前选中元素索引
const initIndex = 0

export default {
  data () {
    return {
      superiorCatalogue: {
        currentText: '活动中心'
      },
      ruleConfig: {
        activityTitle: '',
        media: '默认全部',
        frequency: '',
        sort: '',
        date: ''
      },
      dis:false,    //控制提交按钮是否禁用，默认不禁用，点击提交禁用，提交失败解除禁用
      isActive:0,
      isselect:0,
      value1: false,
      name:"",
      nameList: [],
      prop:0,
      propList: [{
          value: 0,
          label: '会场'
      },
      {
          value: 1,
          label: '活动'
      }],
      templateLoading: true,
      // 模板元素
      templateContent: '',
      centerDialogVisible: false,
      // 当前区域
      activityEl: 'page',
      // 皮肤信息
      skinConfig: {},
      // 上传图片
      uploadImg: {
        imgLoad: false,
        fileList: []
      },
      imgSize: '',
      // 开始颜色
      firstColor: '',
      // 结束颜色
      lastColor: '',
      // 是否为颜色
      isColor: false,
      // 编辑类型
      editType: '',
      searchVal:"",
      //			广告位数据
      MediaList:[],
//    临时广告位数据
			tempMediaList:[],
      // 文本内容
      textArea: '',
      types:0,   //默认是0，定投是1，屏蔽是2
//		操作记录
			nums:0,
      currentConfig: {},
      activityInfo: {},
//		广告id数组
			adversIds:[],
 //    定投
			dingtouarr:[],
//			屏蔽
			pingbiarr:[],
//			是否改变的标志
			isrevise:{},
//			没有修改不能提交的标志
			issubmit:false,
//			是否进行广告位的添加了
			ispush:false,
//			点击定投或屏蔽要记录已选中广告位的值
			temparr:[],
//			提示暂无模板
      tip:false
			
    }
  },
  components: {
    Scroll,
    Crunmbs,
    ItemConfig
  },
  watch:{
  	searchVal(newvalue,oldvalue){
			console.log("变化");
			console.log(this.searchVal)
			var NewItems = [];
			var re = /^[0-9]+.?[0-9]*/;
			var falg = re.test(this.searchVal);  //正则验证看是输入的数字还是字符串，如果是数字就查找广告id，如果是字符串则查找广告名称
			if(falg){  //证明输入的是数字
					for(var i = 0;i<this.MediaList.length;i++){
							if (this.MediaList[i].SourceId.toString().indexOf(this.searchVal) != -1) {
								  NewItems.push(this.MediaList[i]);
							}
					}
			}else{
					for(var i = 0;i<this.MediaList.length;i++){
							if (this.MediaList[i].SourceName.search(this.searchVal) != -1) {
								  NewItems.push(this.MediaList[i]);
							}
					}
			}
		  	this.tempMediaList = NewItems
		
  	}
  },
  methods: {
//	返回上一页事件
		back(){
			this.$router.go(-1);//返回上一层
		},
//	点击上传事件
		sub:function(){
			this.issubmit = true
		},
//	选中广告位事件
  	selected:function(index,id){
//		this.isActive = this.types;
  		console.log(this.types);
  		this.isselect = index;
  		if(this.adversIds.indexOf(id)>=0){
					var index = this.adversIds.indexOf(id);
					this.nums--;
					this.adversIds.splice(index, 1);
  		}else{
  			this.adversIds.push(id);
  			this.nums++						 //记录添加了多少个广告位
  			this.ispush = true    //证明添加过
  		}
  	},
  	//屏蔽定投事件
  	selectedClass: function (index) { 
  		this.isActive = index;
  		this.types = index;
  		this.issubmit = true
  		if(index == 0){   //当等于0时证明选择的是默认全部  ，只将types改变加上样式，并将状态置为已修改
  			
  	
  			return false;
  		}
  		this.centerDialogVisible =true;
  		//当为1时证明是定投，将dingtouarr赋值给adversIds，来讲已选中的加上选中样式，并且记录一下当前没有改变广告位时的数组，当选中广告位
//		而没有保存,点击的是取消,要将这个值赋值给adversIds,
  		if(this.types == 1){   
				this.adversIds = this.dingtouarr;
				this.temparr = JSON.parse(JSON.stringify(this.dingtouarr));
			}
			if(this.types == 2){
				this.adversIds = this.pingbiarr;
				this.temparr = JSON.parse(JSON.stringify(this.pingbiarr));
			}
		},
		//		关闭对话框
		closedialog:function(){
			
			this.centerDialogVisible = false;
			if(this.types == 1){
				this.dingtouarr = this.adversIds;
				this.adversIds = [];
			}
			if(this.types == 2){
				this.pingbiarr = this.adversIds;
				this.adversIds = [];
			}
			this.ispush = false   //需要将是否添加状态重置
			this.temparr = [];    //当选择完广告位时要将记录的值清空，一面影响下次使用
		},
		//		取消事件
    cancel:function(){
    	console.log(this.ispush);
			if(this.ispush == true){
				this.adversIds.splice(this.adversIds.length-this.nums, this.nums);  //点击取消，删掉选中的
			}
//			需要将nums置为0
			this.nums = 0		
//			当点击取消时将adversIds赋值为修改前的值（也就是点击定投或者屏蔽时要记录一下这个值）
			for(var i = 0;i<this.temparr.length;i++){
					if(this.adversIds.indexOf(this.temparr[i])>=0){
						
					}else{
						this.adversIds.push(
						  	this.temparr[i]
						)
					}
				 
			}
    	this.centerDialogVisible = false;
    	this.ispush = false		//需要将是否添加状态重置
    	this.temparr= []
    },
    // 上传图片成功
    uploadSuccess (response, file, fileList) {
      this.uploadImg.fileList = fileList.slice(-1)
      this.uploadImg.imgLoad = false
      this.updateContent(`//static.qianmaiapp.com/${response.Remark}`)
    },
    // 上传图片失败
    uploadError (err, file, fileList) {
      this.$notify.error({
        title: '错误',
        message: `${file.name}上传失败！`
      })
      this.uploadImg.imgLoad = false
      console.error(err)
    },
    // 上传图片中
    progress () {
      this.uploadImg.imgLoad = true
    },
    // 删除图片
    delImg () {
      this.uploadImg.fileList = []
      this.updateContent('')
    },
    // 颜色选择器 值变更
    colorPicker (color) {
      this.firstColor = color
      this.updateContent(this.firstColor)
    },
    // 文本编辑器 值变更
    textUpload () {
      this.updateContent(this.textArea)
    },
    // 选择媒体
    chooseMedia () {
      switch (this.ruleConfig.media) {
        case '默认全部':
          break
        case '定投':
          this.centerDialogVisible = true
          break
        case '屏蔽':
          break
      }
    },
    // 获取编辑模板
    getEditTemplate (skinConfig) {
      getEditTemplate(this.$route.params.template_id).then(res => {
        this.templateLoading = false
        this.templateContent = res.data
//				console.log(JSON.stringify(res));
        this.$nextTick(() => {
          // 设置皮肤
          skinConfig && setStyle(skinConfig)
          this.skinConfig = getData('.tmp-editable').data
//        this.isrevise.skinconfig = getData('.tmp-editable').data     //给是否有修改赋值
          this.$set(this.skinConfig[this.activityEl][initIndex], 'active', true)
          // 选中改变通知
          this.selectedItem(this.skinConfig[this.activityEl][initIndex], this.activityEl, initIndex)
          this.$refs.scroll.refresh()

          // 给模板元素添加点击选中功能
          this.templateClick()
        })
      })
    },
    // 获取弹层信息
    getLayerInfo () {
      // 必须有皮肤信息才获取皮肤
      let {activity_id: activityid} = this.$route.params;
      if (Number(activityid) === 0) {
        // 获取编辑模板
        this.getEditTemplate()
        return
      }
      // 拉取活动信息
      getLayerInfo({
        activityid: Number(activityid)
      }).then(res => {
        // 同步活动信息
        this.activityInfo = res;
        let ruleConfig = this.ruleConfig
        // 设置活动标题
        ruleConfig.activityTitle = res.Title
        // 设置弹层次数
        ruleConfig.frequency = res.ActivityQty
//      设置活动运营
				if(res.ActiveOperatorId == -1){
					this.name = "";
				}else{
					this.name = res.ActiveOperatorId;
				}
				
//			设置显示
				this.prop = res.DisplayPlace;
//			是否无限返回
				if(res.IsBack == 1){
					 this.value1 = true
				}else{
					 this.value1 = false
				}
				
        //				设置定投,屏蔽初始个数，要先判断是不是为空
				if(res.PutOnSourceId == "" || res.PutOnSourceId == ",,"){
					this.dingtouarr = [];
				}else{
					this.dingtouarr = res.PutOnSourceId.replace(/^,+/,"").replace(/,+$/,"").split(",").map(Number); //初始化时为定投个数赋值，并将数组中的字符串设为数字类型
				}
				if(res.ShieldSourceId == "" || res.ShieldSourceId == ",,"){
						this.pingbiarr =[];
				}else{
					console.log(res.ShieldSourceId)
					this.pingbiarr = res.ShieldSourceId.replace(/^,+/,"").replace(/,+$/,"").split(",").map(Number);	//初始化时为屏蔽个数赋值，并将数组中的字符串设为数字类型
				}
				this.types = res.SourceRange ; //为定投还是屏蔽赋值
				this.isActive = this.types;    //为定投还是屏蔽加上样式
				this.isrevise= {
					title:res.Title,
					name:res.ActiveOperatorId,
					prop:res.DisplayPlace,
					dingtouarr:JSON.parse(JSON.stringify(this.dingtouarr)),
					pingbiarr:JSON.parse(JSON.stringify(this.pingbiarr)),
					frequency:res.ActivityQty,
					value1:this.value1,
				}
        // 如果模板存在
        let skinConfig = JSON.parse(res.SkinConfig)
        // 自定义活动不获取模板
        if (skinConfig.hasOwnProperty('customActivity')) {
        	this.templateLoading = false
        	this.tip = true
          return
        }
        // 获取编辑模板
        this.getEditTemplate(skinConfig)
      })
    },
    // 切换区域
    tabClick () {
    	console.log(this.skinConfig);
      for (let key in this.skinConfig) {
        this.skinConfig[key].forEach(item => {
          this.$set(item, 'active', false)
        })
      }
      // 给当前列表第一个加选中状态
      this.skinConfig[this.activityEl] && this.$set(this.skinConfig[this.activityEl][initIndex], 'active', true)
      // 选中改变通知
      this.selectedItem(this.skinConfig[this.activityEl][initIndex], this.activityEl, initIndex)
    },
    // 选取改变 切换对应编辑器
    selectedItem (itemConfig, activityEl, index) {
      let editType = itemConfig.editType
      // 存储当前编辑元素信息
      this.currentConfig.editType = editType
      this.currentConfig.region = activityEl
      this.currentConfig.index = index
      if (editType === 'img' || editType === 'bgImg') {
        this.uploadImg.fileList = []
        let body = editType === 'bgImg' ? itemConfig[editType].replace(/(url\("?)|"?\)/ig, '') : itemConfig[editType]
        this.uploadImg.fileList.push({name: itemConfig.content, url: body})
        this.imgSize = itemConfig.size
        this.editType = 'img'
      } else if (editType === 'color' || editType === 'bgC') {
        this.editType = 'color'
        this.firstColor = (/^rgb\(.+\)$/ig.test(itemConfig[editType]) && itemConfig[editType].replace('rgb', 'rgba').replace(')', ', 1)')) || itemConfig[editType]
      } else if (editType === 'text') {
        this.editType = 'text'
        this.textArea = itemConfig[editType]
      }

      let els = document.getElementById('wrapper').querySelectorAll(itemConfig.query);
      let eles = typeof itemConfig.index !== 'undefined' && itemConfig.index !== null ? [els[itemConfig.index]] : els
      for (let i = 0, els = document.getElementById('wrapper').getElementsByTagName('*'); i < els.length; i++) {
        els[i].classList.remove('checkout')
      }

      for (let i = 0; i < eles.length; i++) {
        let el = eles[i]
        el.classList.add('checkout')
      }
    },
    // 同步更新内容
    updateContent (body) {
      const currentConfig = this.currentConfig
      const editType = currentConfig.editType
      const region = currentConfig.region
      const index = currentConfig.index
      this.skinConfig[region][index][editType] = body
      this.syncView(this.skinConfig[region][index])
    },
    // 同步视图
    syncView (controller) {
      const editType = transferAbbr(controller.editType)
      const index = controller.index
      let els = document.getElementById('wrapper').querySelectorAll(controller.query)
      let eles = typeof index !== 'undefined' && index !== null ? [els[index]] : els

      for (let i = 0; i < eles.length; i++) {
        let el = eles[i]
        let config = controller[controller.editType]

        if (editType === 'backgroundImage') {
          el.style.backgroundImage = `url(${config})`
        } else if (editType === 'backgroundColor') {
          el.style[editType] = config
        } else if (editType === 'innerHTML') {
          el[editType] = config
        } else if (editType === 'src') {
          el.src = config
        } else {
          el.style[editType] = config
        }
      }
    },
    // 给模板元素添加点击事件
    templateClick () {
      let tmpEditables = document.querySelectorAll('#wrapper .tmp-editable')

      for (let i = 0; i < tmpEditables.length; i++) {
        let item = tmpEditables[i]
        let _this = this

        item.onclick = function (ev) {
          let oEvent = ev || event
          let query = getAttr(this, 'data-query')
          let index = getAttr(this, 'data-index')
          // 清空所有选中
          for (let key in _this.skinConfig) {
            _this.skinConfig[key].forEach(item => {
              _this.$set(item, 'active', false)
            })
          }

          let {currentRegion, currentIndex} = _this.findRegion(query, index)
          // 同步当前所属区域
          _this.activityEl = currentRegion
          currentRegion && _this.$set(_this.skinConfig[currentRegion][currentIndex], 'active', true)
          // 选中改变通知
          _this.selectedItem(_this.skinConfig[currentRegion][currentIndex], currentRegion, currentIndex)

          oEvent.cancelBubble = true
        }
      }
    },
    // 寻找所属区域
    findRegion (query, index) {
      let skinConfig = this.skinConfig
      for (let region in skinConfig) {
        for (let i = 0, elConfig = skinConfig[region]; i < elConfig.length; i++) {
          let item = elConfig[i]

          if (item.query === query) {
            if (typeof index !== 'string') {
              return {'currentRegion': region, 'currentIndex': i}
            } else {
              if (item.index === index) {
                return {'currentRegion': region, 'currentIndex': i}
              }
            }
          }
        }
      }
    },
    // 保存皮肤信息
    // 过滤不需要提交的参数
    filterDiscarded () {
      let skinConfig = this.skinConfig
      let newSkinConfig = {}

      for (let region in skinConfig) {
        // 新对象不存在该属性 初始化属性
        newSkinConfig[region] || (newSkinConfig[region] = [])
        // 循环子级
        for (let i = 0, elConfig = skinConfig[region]; i < elConfig.length; i++) {
          let item = elConfig[i]
          let params = {}
          for (let key in item) {
            if ((key !== 'content' && key !== 'size' && key !== 'active')) {
              if (key !== 'index' || item.index) {
                params[key] = item[key]
              }
            }
          }
          newSkinConfig[region].push(params)
        }
      }
      return newSkinConfig
    },
    // 错误提示
    errorPrompt (type, message) {
      this.$message({
        type,
        message
      })
    },
    // 创建活动、保存活动
    saveActivity () {    	
    	this.dis = true;   //将按钮置为禁用
    	var dingtoustr = ","+this.dingtouarr.join(",")+",";
    	var pingbistr = ","+this.pingbiarr.join(",")+",";

      let ruleConfig = this.ruleConfig
      // 活动标题
      let title = ruleConfig.activityTitle;
      // 活动标题不能为空
      if (!title) {
        this.errorPrompt('warning', '弹层标题不能为空！')
        this.dis = false;
        return
      }
      if(title.length>15){
      	this.errorPrompt('warning', '弹层标题不能超过15个字！')
      	 this.dis = false;
        return
      }
      // 活动有效期时间
//    let dates = ruleConfig.date
//    // 开始时间结束时间不能为空
//    if (!dates.length) {
//      this.errorPrompt('warning', '开始时间、结束时间不能为空！')
//      return
//    }

//    let reg = /[^1-9]/g;
//    reg.test(ruleConfig.frequency);
//    if(reg.test(Number(ruleConfig.frequency))){
//    	this.errorPrompt('warning', '弹层次数只能输入数字!');
//				return
//    }
      // 活动皮肤
//    判断一下如果是自定义模板直接就将skinconfig写死
//	let skinConfig = {data: this.filterDiscarded(), version: '1.0'};
      if(this.tip == true){
      	var skinConfig = {"version":"1.0","customActivity":false};
      }else{
      	var skinConfig = {data: this.filterDiscarded(), version: '1.0'};
      }
            // 活动开启状态
      let openstate = this.activityInfo.OpenState || 0
      // 活动ID&模板ID
      let {activity_id: activityid, template_id: templateid} = this.$route.params
      //复制模板的时候需要经activityid置为0
      if(this.$route.params.copy == 1){
      	activityid = 0
      	this.issubmit = true;
      	openstate = 0;
      }

//    活动运营/
      let name = this.name
      if(name == ""){
      	this.errorPrompt('warning', '请选择活动运营!');
      	this.dis = false;
				return
      }
      if(this.prop === ""){
      	this.errorPrompt('warning', '请选择弹层显示!');
      	this.dis = false;
				return
      }
//    弹层显示
			let prop =  this.prop
//			无限返回
			let flag = this.value1;
	
			if(ruleConfig.frequency == ""){
					this.errorPrompt('warning', '弹层次数不能为空！');
					 this.dis = false;
					return
				}
				let reg = /^[1-9]{1}[0-9]*$/;
	      reg.test(ruleConfig.frequency);
	      if(!reg.test(Number(ruleConfig.frequency))){
	      	this.errorPrompt('warning', '不能输入字符串，特殊符号，负数和0');
	      	this.dis = false;
					return
	    }
				if(this.isrevise.title != title){
					this.issubmit = true
				}
				if(this.isrevise.name != name){
					this.issubmit = true
				}
				if(this.isrevise.prop != prop ){
					this.issubmit = true
				}
				if(this.isrevise.frequency != Number(ruleConfig.frequency)){
					this.issubmit = true
				}
				if(this.isrevise.value1 != this.value1){
					this.issubmit = true
				}
				if(JSON.stringify(this.isrevise.dingtouarr) != JSON.stringify(this.dingtouarr)){
					 this.issubmit = true
				}
				if(JSON.stringify(this.isrevise.pingbiarr) != JSON.stringify(this.pingbiarr)){
					 this.issubmit = true
				}
				
			if(this.issubmit == false){
				this.errorPrompt('warning', '没有修改内容');
				this.dis = false;
				return
			}
      // 保存皮肤
      saveLayerInfo({
        // 活动标题
        title,
        // 开启状态
        openstate,
        // 弹层ID
        ActivityId:Number(activityid),
//      模板id
				TemplateId: templateid,
//      弹层显示
				DisplayPlace:prop,
// 			活动运营
        ActiveOperatorId : name,
// 			投放广告位 (0 = 全部, 1 = 定投， 2 = 屏蔽)
        sourcerange: this.types,
//      定投
				putonsourceid: dingtoustr,
        // 啊
//      屏蔽广告位
        shieldsourceid: pingbistr,
//      弹层次数
        ActivityQty:Number(ruleConfig.frequency) || 0 ,
//      无限返回
				IsBack:flag,
// 			皮肤信息
        skinconfig: JSON.stringify(skinConfig),
//      弹层形式
//				ExposureMode 
        // 上一次活动排序
//      oldorderNum: 0,
        // 活动排序
//      ordernum: ruleConfig.sort || 0,
//      // 活动结束时间
//      endtime: dates[1],
//      // 活动开始时间
//      begintime: dates[0],

        // a

        // 广告曝光取值
//      adranexpsortingcount: 0,
        // 活动banner
//      bannersrc: '',

        // 事物中奖信息
//      probabilitydrawconfig: [],
        // 活动ID
//      activityid: Number(activityid),

        // 抽奖次数
//      activityqty: Number(ruleConfig.frequency) || 0
      }).then(res => {
        if (res.Success) {
          this.$notify({
            title: '成功',
            message: '弹层创建、保存成功～',
            type: 'success'
          })
        };
        this.$router.push({ name: 'createprop'})
        
      }).catch(res =>{
      	this.dis = false;
      })
    }
  },
  beforeCreate(){
  	//     获取活动运营信息
    getOperatingsList().then(res => {
        this.nameList = res;
        this.nameList.forEach((item, index) =>{
          item.value = item.UserId;
          item.label = item.UserName;
        })
        
    })
  },
  created () {
    // 获取活动信息
    this.getLayerInfo()
    //    获取广告位数据
		getMediaList().then(res=>{
				this.MediaList = res;
				this.tempMediaList = res;
		});

  }
}
</script>

<style lang="scss">
	.el-button:focus.activeClass,.activeClass {
		background-color: #5898d7 !important;
	  color: white !important;
	}
  .page-controller{
    margin: 20px 0;
    .item-control{
      display: inline-block;
    }
  }
  .checkout:not(img){
    position: relative;
    &:before{
      content: ''; position: absolute; left: 0; top: 0; right: 0; bottom: 0; z-index: 10; border: 1px dashed #fff; pointer-events: none;
    }
  }
  img.checkout{
    border: 1px dashed #fff;
  }
  .module-wrap{
    margin-top: 10px;
    .rule-config{
      margin-top: 20px;
      margin-left: 20px;
    }
  }
  .activity-config{
    margin-bottom: 100px;
    .phone-model{
      position: relative; width: 340px; height: 640px; margin: 0 auto; background: url(//static.qianmaiapp.com/backstage/img/phone.6a6118e.png) no-repeat 0 0; background-size: contain;
      .view-phone{
        position: absolute; left: 8.5%; top: 13.5%; width: 264px; height: 469px; overflow: hidden;
      }
      .phone-tip{
      	position: absolute;
      	top:50%;
      	left: 40%;
      	z-index: 2001;
      }
    }
    .editable-ele{
      .config-wrapper{
        height: 638px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;
        .el-row,.edit-list{
          position: relative; height: 100%;
        }
        .edit-list{
          padding: 10px 20px 0;
        }
        .edit-detail{
          height: 638px; padding: 0 10px; background: rgba(0, 0, 0, .05);
        }
        // 操作活动按钮
        .operate-activity{
          position: absolute; left: 0; right: 0; bottom: 0; z-index: 10; padding: 20px 10px; background: #f9f9f9;
          .btn-wrap{
            margin-left: 10px;
          }
        }
        // 右侧title
        .edit-detail-top{
          position: relative; margin-top: 3px; border-bottom: 2px solid #e4e7ed; text-align: right;
          .revoke{
            font-weight: normal;
            .icon-back{
              position: relative; top: 1px; font-size: 18px;
            }
          }
        }
        // 右侧body
        .edit-detail-body{
          .preview-img{
            position: relative; width: 90%; margin: 10px auto;
            img{
              width: 100%;
            }
            .removeImg{
              display: none; position: absolute; left: 50%; top: 50%; width: 40px; height: 40px; margin: -20px 0 0 -20px; text-align: center; background: rgba(0, 0, 0, .3); border-radius: 50%; transition: all .3s ease; cursor: pointer;
              .el-icon-close{
                position: absolute; left: 50%; top: 50%; font-size: 20px; color: #fff; font-weight: bold; -webkit-transform: translate(-50%, -50%);
              }
              &:hover{
                background: rgba(0, 0, 0, 1);
              }
            }
            &:hover{
              .removeImg{
                display: block;
              }
            }
          }
          .img-size{
            font-size: 12px; color: rgba(0,0,0,.65);
          }
          .el-upload__tip{
            line-height: 18px; text-align: left;
          }
          .blank-img{
            line-height: 80px; margin: 10px 0; border: 2px solid #ddd; font-size: 12px; text-align: center; color: #666; background: #fff;
          }
          .color-edit{
            margin-top: 10px;
          }
          .text-area textarea{
            margin-top: 10px; font-size: 12px;
          }
        }
      }
    }
  }
  
  
   /*弹出层样式*/
 /*选中的样式*/

.pro-ul .select {
    background-color: #5898d7;
    color: white;
}
 .el-button:focus.activeClass,.activeClass {
		background-color: #5898d7;
    color: white;
 }
 .el-dialog__header{
 		display: none;
 }
 .frame-header{
 	  width: 100%;
    height: 45px;
    background-color: #5898d7;
    position: absolute;
    left: 0;
    top: 0;
    
 }
 .frame-header h4{
 		line-height: 45px;
    margin: 0;
    color: white;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
 }
 .frame-header span{
 	display: inline-block;
 		position: absolute;
    right: 20px;
    top: 14px;
    font-size: 18px;
    color: white;
    cursor: pointer;
 }
 .frame-header .search-box{
 		position: absolute;
    top: 10px;
    right: 64px;
 } 
 .frame-header .search-box .icon{
 		position: absolute;
    top: 5px;
    right: 10px;
    color: #999;
 }
 .frame-header .search-box #search-input{
 		border: 1px solid #ccc;
    padding-left: 12px;
    border-radius: 12px;
    height: 24px;
 		
 }
 
 
    
 .pro-ul{
 	  height: 450px;
 	  overflow: auto;
 	  margin: 0 auto;
 	  margin-top: 45px;
 }
 .pro-li{
 		float: left;
    margin-right: 16px;
    margin-bottom: 16px;
    position: relative;
    
 }
 .pro-btn{
 		padding: 6px 12px;
 		margin-bottom: 0;
 		font-size: 14px;
 		font-weight: 400;
 		outline:none;
 		border:1px solid #ccc;
 		width: 138px; 
 		height: 40px;
 		color: #333;
 		background-color: #fff;
 		border-color: #ccc;
 		white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-radius: 4px;
 }
 .el-switch{
 	  margin-top: 10px;
 }
 
 .el-upload__input {
    display: none !important;
 }
 
</style>
