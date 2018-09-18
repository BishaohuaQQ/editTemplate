<template>
	<div class="create-prop">
		<div class="crumbs">
		    <el-breadcrumb separator=">">
		      <!--<el-breadcrumb-item :to="{ path: '/' }">当前位置</el-breadcrumb-item>-->
		      <span style="float: left;font-size: 100%;font-weight: 700;">当前位置&nbsp;:&nbsp;</span>
			  <el-breadcrumb-item><a style="color:#72ACE3;" >配置中心</a></el-breadcrumb-item>
			  <el-breadcrumb-item>弹层中心</el-breadcrumb-item>
			</el-breadcrumb>   
		</div>
		<div class="main">
			<div class="page-controller">
		        <router-link class="item-control" :to="{ path: '/modelprop'}">
		          <el-button  style="margin-right: 20px;">弹层模板库</el-button>
		        </router-link>
		        <el-button type="primary" >已创建弹层</el-button>
		    </div>
		    
		    <div class="form-list-argument">
		        <ul>
			        <li>
			            <el-select v-model="types"  placeholder="全部类型" style="height: 35px;">
			              <el-option
			                v-for="item in typesList"
			                :key="item.value"
			                :label="item.label"
			                :value="item.value">
			              </el-option>
			            </el-select>
			        </li>
			        <li>
			            <el-select v-model="states" filterable  placeholder="全部状态">
			              <el-option
			                v-for="item in stateList"
			                :key="item.value"
			                :label="item.label"
			                :value="item.value">
			              </el-option>
			            </el-select>
			        </li>
		            <li>
		            	<el-select v-model="operatings"  placeholder="全部运营">
			              <el-option
			                v-for="item in operatingsList"
			                :key="item.value"
			                :label="item.label"
			                :value="item.value">
			              </el-option>
			            </el-select>
		            </li>
		            <li>
		            	<!--<el-input placeholder="请输入弹层ID" v-model="ids"></el-input>-->
		            	
		            	<el-select v-model="ids" filterable clearable placeholder="请输入弹层ID">
						    <el-option
						      v-for="item in idsarr"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
		            </li>
		          	<li>
		            	<!--<el-input placeholder="请输入弹层标题" v-model="titles"></el-input>-->
		            	<el-select v-model="titles" filterable clearable placeholder="请输入弹层标题">
						    <el-option
						      v-for="(item,index) in titlesarr"
						      :key="index"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
		         	</li>
			        <li>
			            <el-select v-model="shapes"  placeholder="全部形式">
			              <el-option
			                v-for="item in  shapeList"
			                :key="item.value"
			                :label="item.label"
			                :value="item.value">
			              </el-option>
			            </el-select>
			        </li>
		          	<li>
		            	<el-button @click="search">筛选</el-button>
		          	</li>
		    	</ul>
        	</div>
		</div>
		<!--表格部分-->
		<div>
			<template>
			    <el-table
			      :data="tableData"
			      style="width: 100%">
			      <el-table-column prop="Title" label="弹层标题" align="center"></el-table-column>
			      <el-table-column prop="ActivityId" label="弹层ID" align="center"> </el-table-column>
			      <el-table-column prop="UserName" label="活动运营" align="center"></el-table-column>
			      <el-table-column prop="TempName" label="类型" align="center"></el-table-column>
			      <el-table-column prop="SourceRange" label="选择媒体" align="center"></el-table-column>
			      <el-table-column prop="ExposureMode" label="弹层形式" align="center"></el-table-column>
			      <el-table-column label="操作时间" align="center"> 
		             <template slot-scope="scope">{{scope.row.UpdateDate | tableDate}}</template>
		          </el-table-column>
			      <el-table-column prop="ActiveOperatorId" label="操作" align="center" >
			      		<template slot-scope="scope">
				              <el-popover
				                title="删除"
				                placement="top"
				                width="200"
				                :ref="`popovert-${scope.$index}`"
				                popper-class="icon-popover">
				                <div class="icon-delect-btn">
				                  <p>确定删除此弹层吗？</p>
				                  <p>删除后不可恢复，请谨慎操作！</p>
				                  <div>
				                    <el-button  @click="closeDelect(scope._self.$refs[`popovert-${scope.$index}`], '')">取消</el-button>
				                    <el-button type="primary" @click="closeDelect(scope._self.$refs[`popovert-${scope.$index}`], scope.row.ActivityId,scope.$index)">确定</el-button>
				                  </div>
				                </div>
				                <el-button slot="reference" class="el-icon-delete"></el-button>
				              </el-popover>
				              <!--<router-link class="el-icon-document"-->
				                           <!--:to="{name: 'create_activity', params: {activity_id: scope.row.ActivityId, template_id: scope.row.TemplateId.toLowerCase()}}"></router-link>-->
				              <router-link title="复制" class="el-icon-document" :to="{name: 'exposureprop', params:
				              	{template_id: scope.row.TemplateId.toLowerCase(),activity_id: scope.row.ActivityId,copy:1
				              	}}"></router-link>
				              <a target="_blank" class="el-icon-search" title="预览" :href="previewPopAdress(scope.row)"></a>
				              <router-link title="编辑" class="el-icon-edit" :to="{name: 'exposureprop', params: 
				              	{template_id: scope.row.TemplateId.toLowerCase(),activity_id: scope.row.ActivityId
				              }}">
				              </router-link>
				            </template>
			      	
			      </el-table-column>
			      <el-table-column  label="开启状态" align="center">
			      	
			      	  	<template slot-scope="scope">
			              <el-switch
			                v-model="scope.row.OpenState" 
			                @change=change(scope.row.OpenState,scope.row)    
			                active-color="#13ce66"
			                inactive-color="#999999">
			              </el-switch>
			            </template>
			      </el-table-column>	     
			    </el-table>
			</template>
		</div>
	</div>
</template>

<script>			
	import Crunmbs from 'base/crumbs/crumbs'
	import {getPropList} from 'api/create-activity'
	import {deleteLayer} from 'api/create-activity'
	import {openCloseLayer} from 'api/create-activity'
	import {getActiveTypeList ,getOperatingsList,GetActivityLayerType} from 'api/create-activity'
	
	const appkey = '1d7f1f30b2b42c8482c74e8153249f46'
	
	export default{
		data() {
	      return {
	      	superiorCatalogue: {
	          currentText: '弹层中心'
	        },
	        operatings: 0,
	        operatingsList: [
	        {
	          value: 0,
	          label: '全部运营'
	        },
	        {
	          value: 1,
	          label: '类型一'
	        }],
	        ids: '',
	        idsarr:[],
	        titles: '',
	        titlesarr:[],
	        shapes:-1,
	        states: -1,
	        stateList: [
	        	{
		          value: -1,
		          label: '全部状态'
		        },
		        {
		        	value: 0,
		            label: '未开启'
		        },
		        {
		        	value: 1,
		            label: '已开启'
		        }],
	        types:'',
	        typesList: [],
	        shapeList: [
	        {
	          value: -1,
	          label: '全部形式'
	        },
	        {
	          value: 0,
	          label: '直接曝光'
	        },
	        {
	          value: 1,
	          label: '参与曝光'
	        }],
//			表格数据
			tableData:[]
	      }
	    },
	    components: {
		    Crunmbs
		},
		methods:{
//			search:function(){  //点击筛选
//				this.operatings  全部类型
//				this.states      状态
//              this.types       运营
//				this.ids         弹层id
//				this.titles      弹层标题
//			},
			change(flag,row){
				var oc;
				var acid = row.ActivityId;
				if(flag == true){
					oc=1
				}else{
					oc=0
				}
				let that = this;
				openCloseLayer({
					ActivityId :acid,
					OpenState: oc
				}).then(res => { 
					this.$notify({
			            title: '成功',
			            message: '状态保存成功～',
			            type: 'success'
			        })
				})
			},
			firstsearch(){
				let that = this;
		        getPropList({
		          Title: that.titles,
		          TemplateId: that.types,
		          ActiveOperatorId: that.operatings,
		          OpenState: that.states,
		          ActivityId :that.ids,
		          ExposureMode :that.shapes
		        }).then(res => {
//		        	console.log(res);
//		        	先要将弹层ID数组和弹层标题数组置为空,否则会重复添加
		        	that.idsarr = [];
		        	that.titlesarr = [];
		        	for(var i=0 ;i<res.length;i++){
		        		if(res[i].OpenState == 1){
		        			res[i].OpenState = true
		        		}else{
		        			res[i].OpenState = false
		        		}
		        		that.idsarr.push({
		        			value:res[i].ActivityId,
		        			lable:res[i].ActivityId
		        		})
		        		that.titlesarr.push({
		        			value:res[i].Title,
		        			lable:res[i].Title,
		        			index:i
		        		})
		        		if(res[i].SourceRange == 0){
		        			res[i].SourceRange = "默认全部";
		        		}
		        		if(res[i].SourceRange == 1){
		        			res[i].SourceRange = "定投";
		        		}
		        		if(res[i].SourceRange == 2){
		        			res[i].SourceRange = "屏蔽";
		        		}
		        		if(res[i].ExposureMode == -1){
		        			res[i].ExposureMode = "全部曝光"
		        		}
		        		if(res[i].ExposureMode == 0){
		        			res[i].ExposureMode = "直接曝光"
		        		}
		        		if(res[i].ExposureMode == 1){
		        			res[i].ExposureMode = "参与曝光"
		        		}
		        	}
		        	that.tableData = res 
		        })
			},
			search() {
		        let that = this;
		        getPropList({
		          Title: that.titles,
		          TemplateId: that.types,
		          ActiveOperatorId: that.operatings,
		          OpenState: that.states,
		          ActivityId :that.ids,
		          ExposureMode :that.shapes
		        }).then(res => {
		        	for(var i=0 ;i<res.length;i++){
		        		if(res[i].OpenState == 1){
		        			res[i].OpenState = true
		        		}else{
		        			res[i].OpenState = false
		        		}
		        		
		        		if(res[i].SourceRange == 0){
		        			res[i].SourceRange = "默认全部";
		        		}
		        		if(res[i].SourceRange == 1){
		        			res[i].SourceRange = "定投";
		        		}
		        		if(res[i].SourceRange == 2){
		        			res[i].SourceRange = "屏蔽";
		        		}
		        		if(res[i].ExposureMode == -1){
		        			res[i].ExposureMode = "全部曝光"
		        		}
		        		if(res[i].ExposureMode == 0){
		        			res[i].ExposureMode = "直接曝光"
		        		}
		        		if(res[i].ExposureMode == 1){
		        			res[i].ExposureMode = "参与曝光"
		        		}
		        	}
		     
		        	that.tableData = res 
		        })
		    },
			closeDelect(dom,id,titleindex) {
//				console.log(titleindex);
//				将删除的id和标题要删除
				this.idsarr.splice(this.idsarr.findIndex(item => item.value ==id), 1);
				this.titlesarr.splice(this.titlesarr.findIndex(item => item.index == titleindex), 1);
		        let that = this;
		        if(id) {
		          deleteLayer({
		            ActivityId: id
		          }).then((res) => {
		            that.$notify({
		              message: '删除成功',
		              type: 'success'
		            });
		            dom.doClose();
		            that.search()
		          })
		        } else {
		          dom.doClose();
		        }
		
		    },
		    // 预览弹层活动地址
		    previewPopAdress (popInfo) {
		    	let adress = `${iadInfDomain}?appkey=${appkey}`
		    	// 0为会场1为活动
				if (popInfo.DisplayPlace === 0) {
					adress = `${adress}&back=1&actback=1&isvenue=1&meetlayerid=${popInfo.ActivityId}`
				} else {
					adress = `${adress}&activitylayerid=${popInfo.ActivityId}`
				}
		    	return adress
		    }
		},
		created () {
			this.firstsearch();
//			获取活动类型
			GetActivityLayerType().then(res => {
		        this.typesList = res;
		        this.typesList.forEach((item, index) => {
		          item.value = item.TemplateId;
		          item.label = item.TempName;
		        });
		        this.typesList.unshift({
		          value: '',
		          label: '全部类型'
		        })
		    });
		    //     获取活动运营信息
		    getOperatingsList().then(res => {
		        this.operatingsList = res;
		        this.operatingsList.forEach((item, index) =>{
		          item.value = item.UserId;
		          item.label = item.UserName;
		        })
		        this.operatingsList.unshift({
		          value: -1,
		          label: '全部运营'
		        })
		    })
		    
		},
		filters: {
		      tableDate(date) {
		        if (date) {
		          let timeSpan = date.replace('Date', '').replace('(', '').replace(')', '').replace('-', '').replace(/\//g, '');
		          let dates = new Date(parseInt(timeSpan));
		          let year = dates.getFullYear()
		          let month = dates.getMonth() + 1 > 9 ? dates.getMonth() + 1 : '0' + (dates.getMonth() + 1);
		          let day = dates.getDate() > 9 ? dates.getDate() : '0' + dates.getDate();
		          let hours = dates.getHours() > 9 ? dates.getHours() : '0' + dates.getHours();
		          let minutes = dates.getMinutes() > 9 ? dates.getMinutes() : '0' + dates.getMinutes();
		          let seconds = dates.getSeconds() > 9 ? dates.getSeconds() : '0' + dates.getSeconds();
		          return year + '-' + month + '-' + day + " " + hours + ":" + minutes
		        } else {
		          return '';
		        }
		      }
		}
	}
</script>

<style lang="scss" scoped>
	.page-controller {
	    margin: 20px 0;
	    button{
    		width: 150px;
    		text-align: center;
    	}
	    .item-control {
	      display: inline-block;
	    }
	}
	.form-list-argument {
	    ul:after {
	      content: '';
	      display: block;
	      clear: both;
	    }
	    ul {
	      li {
	        float: left;
	        width: 12%;
	        height: 50px;
	        margin-right: 20px;
	        .el-input {
	          width: 100%;
	        }
	        .el-button {
	          background: cornflowerblue;
	          color: #ffffff;
	          margin-left: 10px;
	        }
	        .el-select {
	          width: 100%;
	        }
	      }
	    }
	}
	
	.el-button.el-popover__reference {
	    border: none;
	    padding: 0;
	  }
	  .icon-popover {
	    .icon-delect-btn {
	      p{
	        font-size: 12px;
	      }
	      div{
	        margin-top: 10px;
	        text-align: center;
	        button {
	          padding: 0;
	          width: 70px;
	          height: 30px;
	          line-height: 30px;
	        }
	      }
	    }
	    .icon-share-btn {
	      text-align: center;
	      p{
	        font-size: 16px;
	      }
	      div{
	        margin-top: 10px;
	        text-align: center;
	        button {
	          padding: 0;
	          width: 100px;
	          height: 30px;
	          line-height: 30px;
	          font-size: 12px;
	          &.el-button+.el-button {
	            margin-left: 0;
	            margin-top: 10px;
	          }
	        }
	      }
	    }
	  }
	  .el-select-dropdown__item{
	    max-width: 200px;
	    overflow: hidden;
	    text-overflow:ellipsis;
	    white-space: nowrap;
	  }
	  td .cell button,td .cell a,td .cell i{
	    font-size: 16px;
	    color: #666666;
	    background: none;
	    cursor: pointer;
	  }
	  .weight-table {
	    cursor: pointer;
	  }
	  .weight-dialog {
	    .el-dialog{
	      min-width: 300px;
	    }
	    .weight-dialog-div {
	      text-align: center;
	    }
	    .el-input{
	      width: 200px;
	      margin-left: 20px;
	    }
	}
	.crumbs{
	    margin-top: 10px; padding: 10px 10px 10px 8px; border-left: 2px solid #bbb; background: #f5f5f5;
	}
  	
</style>
<style>
	.create-prop .el-table th{
		background:#f7f7f7 !important;
		color: #666 !important;
	} 
	/*修改选择框的高度*/
	.create-prop .el-input__inner{
		height: 35px;
		line-height: 35px;
	}
</style>