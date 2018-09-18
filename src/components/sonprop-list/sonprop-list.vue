<template>
	
	<div class="sonprop-list">
		<input name="" id="Endtime" style="display:none"/>
		<div class="crumbs">
			
		    <el-breadcrumb separator=">">
		      <!--<el-breadcrumb-item :to="{ path: '/' }">当前位置</el-breadcrumb-item>-->
		      <span style="float: left;font-size: 100%;font-weight: 700;">当前位置&nbsp;:&nbsp;</span>
			  <el-breadcrumb-item>数据管理</el-breadcrumb-item>
			  <el-breadcrumb-item><a style="color:#72ACE3;" :href="hrefProp()">弹层数据</a></el-breadcrumb-item>
			  <el-breadcrumb-item>分媒体数据</el-breadcrumb-item>
			</el-breadcrumb>
		    
		</div>
		<div class="form-list-argument">
			<!--这里放一个input是为了解决自动补全的bug-->
			
			<ul>
				<li>
		        	<label style="position: absolute;top: 13px;left: -0;">统计时间：</label>
			        <el-date-picker class = "timepicker" v-model="ruleConfig.date"   value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
			    </li>
			    <li class="libtn">
		        	<el-button type="primary" @click="search">搜索</el-button>
		        	<el-button type="primary" @click="exportdata" >导出数据</el-button>
		        
		        </li>
		        <input placeholder="结束日期" name="" class="el-range-input" style="display: none;">
			</ul>
			
		</div>
		
		<!--数据切换按钮-->
		<div class="changedata">
			<span class="el-icon-menu icon"></span>
			<span class="pronum">弹层分媒体数据</span>
			
		</div>
		
		<!--表格部分-->
		<template>
		    <el-table
		      v-loading="loading"
		      element-loading-text="拼命加载中"
			  element-loading-spinner="el-icon-loading"
			  element-loading-background="rgba(0, 0, 0, 0.6)"
		      :data="tableData"
		      style="width: 100%">
		      <el-table-column prop="StatisDate" label="统计日期" align="center"></el-table-column>
		      <el-table-column prop="SourceId" label="广告位ID" align="center"></el-table-column>
		      <el-table-column prop="SourceName" label="广告位名称" min-width = "120" align="center"></el-table-column>
		      <el-table-column prop="IadShowPvCount" label="弹层访问pv" min-width = "120" sortable align="center"></el-table-column>
		      <el-table-column prop="IadShowUvCount" label="弹层访问uv" min-width = "120" sortable align="center"></el-table-column>
		      <el-table-column prop="ActJoinUvCount" min-width = "130" label="弹层参与人数" sortable align="center" ></el-table-column>
		      <el-table-column prop="ActJoinPvCount" min-width = "130" label="弹层参与次数" sortable align="center"> </el-table-column>
		      <el-table-column prop="ExposureCount"  min-width = "110" label="广告曝光" sortable align="center"></el-table-column>
		      <el-table-column prop="ClickPvCount"   min-width = "110" label="广告点击" sortable align="center"></el-table-column>
		      <el-table-column prop="BtnCloseCount"  min-width = "110" label="关闭按钮" sortable align="center"></el-table-column>
		      <el-table-column prop="CTR" label="CTR" align="center" sortable></el-table-column>
		      <el-table-column prop="JoinRate" label="参与率" align="center" sortable></el-table-column>
			  <el-table-column prop="RepeatJoinRate" label="复参" align="center" sortable ></el-table-column>
		    </el-table>
		</template>
		<div class="pagination"  align="center">
			<el-pagination
			  @current-change="handleCurrentChange"
	          :current-page="currentPage"
	          :page-size="20"
			  background
			  layout="prev, pager, next"
			  :total="totalCount">
			</el-pagination>
		</div>
	</div>
	
</template>

<script>
	import Crunmbs from 'base/crumbs/crumbs'
	import {getEditTemplate, saveActivityInfo, getActivityInfo} from 'api/create-activity'
	import {LayerSourceStatis,LayerSourceStatisExport} from 'api/create-activity'
	
	export default {
		data() {
	      return {
	      	superiorCatalogue: {
	          currentText: '弹层分媒体数据',
	          parents:[{
	          	text:"数据管理",
	          },
	          {
	          	text:"活动数据",
	          	path:""
	          }
	          ]
	        },
	        ruleConfig: {
		        activityTitle: '',
		        media: '默认全部',
		        frequency: '',
		        sort: '',
		        date: ''
		    },
//		        弹层id
			propid:"",
//			广告位id
			adverid:"",
//			表格数据
			tableData:[],
//			当前页数
			currentPage:1,
//			加载中
 			loading: true,
// 			页面传参id
			aid:"",
//			初始时间
            time:"",
			totalCount:null
	      }
	    },
	    components: {
		    Crunmbs
		},
		methods:{
//			http://10.1.0.240/iad_adstatis/activestatis?ActivityId=%E8%AF%B7%E9%80%89%E6%8B%A9&ActivityName=&TemplateId=0&ActiveOperatorId=0&StartDate=2018-09-05&EndDate=2018-09-05&SourceName=&SourceId=&AdName=&MediaName=&State=0&SortField=&SortType=&Ltype=2&BusiType=1
//			跳转到弹层中心
			hrefProp(){
				let datatime = this.time;
				let adress = "/iad_adstatis/activestatis?ActivityId=%E8%AF%B7%E9%80%89%E6%8B%A9&ActivityName=&TemplateId=0&ActiveOperatorId=0&StartDate="+datatime+"&EndDate="+ datatime +"&SourceName=&SourceId=&AdName=&MediaName=&State=0&SortField=&SortType=&Ltype=2&BusiType=1"
//				console.log(adress);
				return adress
			},
//			首次加载
			firstsearch(){
				this.loading = true;
				LayerSourceStatis({
					aid:this.aid,
					sdate:this.time,
					page:this.currentPage
				}).then(res=>{
//					console.log(res);
					this.totalCount = res.totalNum
					this.tableData = res.data;
					this.loading = false;
				}).catch(err=>{
            		this.loading = false;
            		this.$message({
			          message: '请求数据失败',
			          type: 'warning'
			        });
            	})
			},
			search () {    //进行时间筛选
				this.loading = true;
				//当吧日式插件 的市价清掉，这回date值为null，就会报错，将null改为"",
				if(this.ruleConfig.date == null){
					this.ruleConfig.date = ""
				}
				LayerSourceStatis({
					aid:this.aid,
//					aid:306,
					StartDate:this.ruleConfig.date[0] || this.time,
					EndDate: this.ruleConfig.date[1] || this.time,
					page:this.currentPage
				}).then(res=>{
//					console.log(res);
					this.totalCount = res.totalNum
					this.tableData = res.data;
					this.loading = false;
				}).catch(err=>{
            		this.loading = false;
            		this.$message({
			          message: '请求数据失败',
			          type: 'warning'
			        });
            	})
			},
			handleCurrentChange: function(val) {
                    this.currentPage = val;
                    this.search();
            }, 
            exportdata () {   //导出数据
            	let that = this;
//          	this.loading = true;
				let	exportAdress = ''
            	if(this.ruleConfig.date == null){
					this.ruleConfig.date = ""
				}
              	window.location.href="/IAD_ADStatis/LayerSourceStatisExport?aid="+this.aid + "&StartDate=" + (this.ruleConfig.date[0] || this.time) + "&EndDate=" + (this.ruleConfig.date[1] || this.time);
//          	LayerSourceStatisExport({
//          		aid:this.aid,
//					StartDate:this.ruleConfig.date[0] || this.time,
//					EndDate: this.ruleConfig.date[1] || this.time,
//          	}).then(res=>{
//          		this.loading = false;
//          		that.$notify({
//		              message: '导出成功',
//		              type: 'success'
//		            });
//          		console.log(res)
//          	}).catch(err=>{
//          		this.loading = false;
//          		this.$message({
//			          message: '请求数据失败',
//			          type: 'warning'
//			        });
//          	})
            },
            getaid () {   //获取上页传来的aid 
				let url = window.location.href;
    			let nowstr = url.substring(url.indexOf('=')+1, url.length);  
    			let nowAid = nowstr.split("&")[0];
    			let stime = nowstr.split("&")[1];
    			let newti = stime.split("=")[1];
    			var newstrt = newti.split("#")[0];
//  			console.log(newstrt);
				this.aid = nowAid;
				this.time = newstrt;
				this.ruleConfig.date = [this.time,this.time];   //未初始时间赋值
//				var arrObj = url.split("?");
//				console.log(url.split("?"));
//				console.log(arrObj[1].split("&"));
//				var arrPara = arrObj[1].split("&");
			
			}
			
		},
		created () {
			this.getaid()
			this.firstsearch();
			
				
			

		}
//		beforeRouteEnter (to, from, next) {
//		       console.log(to)
//		       console.log(from)
//		       console.log(next)
//		}
		
	}
</script>

<style lang="scss" scoped>
/*筛选条件样式*/
	/*筛选条件样式*/
	.form-list-argument {
		border: 1px solid #F2F2F2;
		margin-top: 20px;
		padding-top: 30px;
		padding-bottom: 20px;
	    ul:after {
	      content: '';
	      display: block;
	      clear: both;
	    }
	    ul {
		  .libtn{
		  		margin-left: 80px;
		  }
	      li {
	      	.timepicker{
		  		position: absolute;
		  		left: 30%;
		  		max-width: 250px;
		  	}
	      	position: relative;
	        float: left;
	        width: 20%;
	        height: 50px;
	        label {
	          display: inline-block;
	          min-width: 30%;
	          max-width: 110px;
	          text-align: right;
	          font-weight: bold;
	        }
	        .el-input {
	          width: 60%;
	        }
	        .el-button {
	          background: cornflowerblue;
	          color: #ffffff;
	          margin-left: 10px;
	        }
	        .el-select {
	          width: 60%;
	        }
	      }
	    }
  	}
  	
  	.changedata{
  		margin-top: 30px;
  		margin-bottom: 10px;
  		.icon{
  			color: #BBBBBB;
  			font-size: 25px;
  			top: 5px;
  			position: relative;
  		}
  		.pronum{
  			margin-right: 10px;
  		}
  		button{
  			line-height: 1px;
  			padding-left:10px;
  			padding-right: 10px;
  			font-size: 12px;
  			color: black;
  		}
  	}
  	/*分页样式*/
  	.pagination{
  		margin-top: 20px;
  	}
  	.sonprop-list .pagination{
		display: block !important;
	}
	.crumbs{
    margin-top: 10px; padding: 10px 10px 10px 8px; border-left: 2px solid #bbb; background: #f5f5f5;
  }
  	
</style>
<style>
	.sonprop-list .el-table th{
		background:#f7f7f7 !important;
		color: #666 !important;
	} 
	.sonprop-list .el-range-separator{
		width: 10% !important;
	}
	.sonprop-list .el-range-input{
		
	}
</style>