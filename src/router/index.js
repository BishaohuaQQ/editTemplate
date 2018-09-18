import Vue from 'vue'
import Router from 'vue-router'
import TemplateList from '@/components/template-list/template-list'
import CreateActivity from '@/components/create-activity/create-activity'
import ActivityList from '@/components/activity-list'
import PropList from '@/components/prop-list/prop-list'
import SonPropList from '@/components/sonprop-list/sonprop-list'		//分媒体弹层数据组件
import ModelProp from '@/components/modelprop/modelprop'				//弹层模板组件
import CreateProp from '@/components/create-prop/create-prop'		   //已创建弹层组件
import ExposureProp from '@/components/exposure-prop/exposure-prop'    //曝光弹层组件

Vue.use(Router)
 

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/template_list'
    },
    // 模板列表
    {
      path: '/template_list',
      name: 'template_list',
      component: TemplateList
    },
    // 创建活动
    {
      path: '/create_activity/:activity_id/:template_id',
      name: 'create_activity',
      component: CreateActivity
    },
    // 活动列表
    {
      path: '/activity_list',
      name: 'activity_list',
      component: ActivityList
    },
// 		弹层数据
//		{
//    path: '/propList',
//    name: 'propList',
//    component: PropList
// 	},
   	// 		分媒体弹层数据
	{
      path: '/LayerSourceView',
      name: 'sonpropList',
      meta: {
       title: '分媒体数据'
      },
      component: SonPropList
    },
    // 		弹层模板库
	{
      path: '/modelprop',
      name: 'modelprop',
      meta: {
       title: '弹层模板'
      },
      component: ModelProp
    },
   // 		已创建弹层
	{
      path: '/createprop',
      name: 'createprop',
      meta: {
       title: '已创建弹层'
      },
      component: CreateProp
    },
   // 		曝光弹层
	{
      path: '/exposureprop/:activity_id/:template_id',
      name: 'exposureprop',
      meta: {
       title: '曝光弹层'
      },
      component: ExposureProp
    }
   
  ]
})
router.beforeEach((to, from, next) => {//beforeEach是router的钩子函数，在进入路由前执行
  if (to.meta.title) {//判断是否有标题
    document.title = to.meta.title
  }
  next()//执行进入路由，如果不写就不会进入目标页
})
export default router


//      我修改了 这个文件进行测试一下
//      我是dev分支，我也修改了这个文件，让master去合并代码吧
