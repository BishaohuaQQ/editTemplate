<template>
	<div class="prop-list">
		<crunmbs :superiorCatalogue="superiorCatalogue"></crunmbs>
		<!--筛选条件部分-->
		<div class="form-list-argument">
			<ul>
				<li>
		            <label>弹层ID/标题：</label>
		            <el-input placeholder="请输入" v-model="propid"></el-input>
		        </li>
		        <li>
		            <label>广告位名称：</label>
		            <el-input placeholder="请输入" v-model="adverid"></el-input>
		        </li>
		        <li>
		        	<label style="position: absolute;top: 13px;left: -10px;">活动时间：</label>
		            <el-date-picker  class = "timepicker" v-model="ruleConfig.date"   value-format="yyyy-MM-dd HH:mm" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
		        </li>
		        <li class="libtn">
		        	<el-button type="primary" disabled>搜索</el-button>
		        	<el-button type="primary" disabled>导出数据</el-button>
		        </li>
			</ul>
			
		</div>
		
		<!--三个指标-->
		<div class="target">
			<ul>
				<li>参与率100%</li>
				<li>复参1.05</li>
				<li>总发券13110</li>
			</ul>
		</div>
		
		<!--数据切换按钮-->
		<div class="changedata">
			<span class="el-icon-menu icon"></span>
			<span class="pronum">弹层数据</span>
			<el-button :class="{ activeClass : isActive === 1}"  @click="selectedClass(1)">活动数据</el-button>
			<el-button :class="{ activeClass : isActive === 2}"  @click="selectedClass(2)">会场数据</el-button>
			<el-button :class="{ activeClass : isActive === 3}"  @click="selectedClass(3)">弹层数据</el-button>
			
		</div>
		<!--表格部分-->
		<template style="margin-top: 100px;">
		    <el-table
		      :data="tableData"
		      style="width: 100%">
		      <el-table-column prop="name" label="操作" align="center"> </el-table-column>
		      <el-table-column prop="date" label="统计日期" align="center"></el-table-column>
		      <el-table-column prop="propid" label="弹层ID" align="center"></el-table-column>
		      <el-table-column prop="proname" label="弹层标题" align="center"></el-table-column>
		      <el-table-column prop="propv" label="弹层访问pv" align="center"></el-table-column>
		      <el-table-column prop="prouv" label="弹层访问uv" align="center"></el-table-column>
		      <el-table-column prop="propeo" label="复参" align="center" ></el-table-column>
		      <el-table-column prop="pronum" label="弹层参与人数" align="center" ></el-table-column>
		      <el-table-column prop="read" label="弹层参与次数" align="center"> </el-table-column>
		      <el-table-column prop="clicknum" label="广告曝光" align="center"></el-table-column>
		      <el-table-column prop="closebtn" label="广告点击" align="center"></el-table-column>
		      <el-table-column prop="ctr" label="关闭按钮" align="center"></el-table-column>
		      <el-table-column prop="bate" label="ctr" align="center"></el-table-column>
		      <el-table-column prop="rebate" label="参与率" align="center"></el-table-column>

		    </el-table>
		</template>
	</div>
</template>

<script>
	var arr = [{ name: '分媒体数据',
            date: '2018-07-08',
            proid: '3021',
            proname:"媒体名称",
            propv:2,
            prouv:2,
            propeo:3,
            pronum:4,
            read:3,
            clicknum:5,
            closebtn:2,
            ctr:"100%",
            bate:"90%",
            rebate:4
	}]
	import Crunmbs from 'base/crumbs/crumbs'
	import {getEditTemplate, saveActivityInfo, getActivityInfo} from 'api/create-activity'
	export default {
		data() {
	      return {
	        superiorCatalogue: {
	          currentText: '活动数据'
	        },
	        ruleConfig: {
		        activityTitle: '',
		        media: '默认全部',
		        frequency: '',
		        sort: '',
		        date: ''
		    },
//		    切换选中
			isActive:1,
//		        弹层id
			propid:"",
//			广告位id
			adverid:"",
//			表格数据
			tableData:arr
	      }
	    },
	    components: {
		    Crunmbs
		},
		methods:{
			selectedClass: function (index) { 
		  		this.isActive = index;
		  		
			}
		}
	}
	
</script>

<style lang="scss" scoped>
	/*筛选条件样式*/
	.form-list-argument {
		margin-bottom: 30px;
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
	    	
	      li {
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
  	/*时间选择器样式*/
  	.timepicker{
  		position: absolute;
  		left: 30%;
  		max-width: 250px;
  	}
  	/*三个指标样式*/
  	.target{
  		ul:after {
	      content: '';
	      display: block;
	      clear: both;
	    }
  		ul{
  			li{
  				height: 60px;
  				width: 200px;
  				float: left;
  				margin: 20px 10px;
  				border: 1px solid #BBBBBB;
  				text-align: center;
  				line-height: 60px;
  				border-radius: 10px;
  			}
  		}
  	}
  	.libtn{
  		margin-left: 80px;
  	}
  	
  	/*切换数据按钮样式*/
  	.changedata{
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
  	
  	/*切换数据是选中的样式*/
  	.changedata .activeClass {
		background-color: #5898d7;
	    color: white;
	}
</style>