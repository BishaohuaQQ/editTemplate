<template>
	<div class="modelprop">

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
		        <el-button type="primary"  style="margin-right: 20px;">弹层模板库</el-button>
		        <router-link :to="{ path: '/createprop' }"><el-button>已创建弹层</el-button></router-link>
		    </div>
		    <div class="page-list">
		        <div class="item-page" v-for="item in pageList" :key="item.template_id">
		          <div class="item-inner">
		            <div class="cover-panel" :style="'background-image: url('+ item.img +')'"></div>
			            <div class="cover-mask">
			              <div class="cover-inner">
			                <a class="cover-button" :href="previewPopAdress(item)" target="_blank">
			                  <el-button type="primary" size="small" round>预 览</el-button>
			                </a>
			                <router-link class="cover-button" :to="{ name: 'exposureprop', params: {activity_id: 0, template_id: item.templateId} }">
			                  <el-button type="primary" size="small" round>创 建</el-button>
			                </router-link>
			              </div>
			            </div>
		          </div>
		          <p class="page-title">{{item.text}}</p>
		        </div>
	      </div>
		</div>
	</div>
</template>

<script>
	import Crunmbs from 'base/crumbs/crumbs'
	const appkey = '1d7f1f30b2b42c8482c74e8153249f46'
	export default {
		data() {
			const domain = 'http://static.qianmaiapp.com'
   			const address = '/platformv2/module/image'
		    return {
		      	superiorCatalogue: {
		          currentText: '弹层中心'
		        },
		        pageList: [
//			        {
//			          img: `${domain}${address}/grab-red.png`,
//			          text: '砸红包',
//			          templateId: 'grab-red-envelope'
//			        },
//			        {
//			          img: `${domain}${address}/sma_eggs.png`,
//			          text: '砸金蛋',
//			          templateId: 'smaEggs'
//			        },
//			        {
//			          img: `${domain}${address}/unpacked.png`,
//			          text: '拆箱子',
//			          templateId: 'unpacked'
//			        },
//			        {
//			          img: `${domain}${address}/template4.png`,
//			          text: '刮刮乐',
//			          templateId: 'guaguale'
//			        },
//			        {
//			          img: `${domain}${address}/rotary_disc.png`,
//			          text: '大转盘（新版）',
//			          templateId: 'rotary_disc'
//			        },
//			        {
//			          img: `${domain}${address}/scratch_card.png`,
//			          text: '刮刮乐（新版）',
//			          templateId: 'scratch_card'
//			        },
//			        {
//			          img: `${domain}${address}/scratch_card.png`,
//			          text: '领红包',
//			          templateId: 'slip_packet'
//			        },
//			        {
//			          img: `${domain}${address}/scratch_card.png`,
//			          text: '砸金蛋v2',
//			          templateId: 'smaeggs_plus'
//			        },
//			        {
//			          img: `${domain}${address}/smaeggs_simplify.png`,
//			          text: '砸金蛋V4',
//			          templateId: 'smaeggs_simplify'
//			        },
			        {
			          img: `${domain}${address}/toast-at.png`,
			          text: '红包弹层',
			          templateId: 'toast-at'
			        },
			        {
			          img: `${domain}${address}/toast-tg.png`,
			          text: '财神弹层',
			          templateId: 'toast-tg'
			        }
			    ]
		    }
	    },
	    components: {
		    Crunmbs
		},
		methods:{
//			 :href="'http://test5.iadapi.mobjz.com/iad/entry?appkey=1D7F1F30B2B42C8482C74E8153249F46?activity_id=0&template_id='+ item.templateId"
			 // 预览弹层模板地址
		    previewPopAdress (popInfo) {
		    	console.log(iadInfDomain);
//		    	let adress = `${iadInfDomain}?appkey=1D7F1F30B2B42C8482C74E8153249F46?activity_id=0&template_id=${popInfo.templateId}`
		    	let adress = `${iadInfDomain}?appkey=${appkey}`;
//		    	adress = `${adress}&back=1&actback=1&isvenue=1&meetlayerid=${popInfo.ActivityId}`;
		    	adress = `${adress}&layertemplate_id=${popInfo.templateId}`;
		    	return adress
		    }
		}
	}
</script>

<style lang="scss" scoped>
	
	.page-controller{
    	margin: 20px 0;
    	button{
    		width: 150px;
    		text-align: center;
    	}
  	}
  	.page-list{
	    .item-page{
	      float: left; width: 280px; margin: 0 30px 20px 0;
	      .item-inner{
	        &:hover{
	          border-color: #0eaaf0;
	          .cover-mask{
	            display: block;
	          }
	          .cover-panel{
	            background-position: bottom;
	          }
	        }
	      }
	    }
	    .item-inner{
	      position: relative; padding: 6px; border: 1px solid #ddd; border-radius: 4px; box-shadow: 4px 3px 6px #ddd;
	      .cover-mask{
	        display: none; position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: 10; background: hsla(0, 0%, 100%, .5);
	        .cover-inner{
	          position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
	          .cover-button{
	            display: inline-block; color: #fff;
	            &:first-child{
	              margin-right: 10px;
	            }
	          }
	        }
	      }
	    }
	    .cover-panel{
	      height: 440px; background: no-repeat top; background-size: cover; transition: all 1.5s ease;
	    }
	    .page-title{
	      line-height: 26px; font-size: 14px; text-align: center; padding: 6px; font-weight: 700;
	    }
	}
	.crumbs{
    margin-top: 10px; padding: 10px 10px 10px 8px; border-left: 2px solid #bbb; background: #f5f5f5;
  }
</style>