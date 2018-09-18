<template>
  <div class="activity-center">
    <crunmbs :superiorCatalogue="superiorCatalogue"></crunmbs>
    <div class="main">
      <div class="page-controller">
        <el-button type="primary" disabled>活动模板库</el-button>
        <router-link :to="{ path: '/activity_list' }"><el-button>已创建活动</el-button></router-link>
      </div>
      <div class="page-list">
        <div class="item-page" v-for="item in pageList" :key="item.template_id">
          <div class="item-inner">
            <div class="cover-panel" :style="'background-image: url('+ item.img +')'"></div>
            <div class="cover-mask">
              <div class="cover-inner">
                <a class="cover-button" :href="'http://iad.api.adjuz.net/index.html?appkey=1D7F1F30B2B42C8482C74E8153249F46?activity_id=0&template_id='+ item.templateId" target="_blank">
                  <el-button type="primary" size="small" round>预 览</el-button>
                </a>
                <router-link class="cover-button" :to="{ name: 'create_activity', params: {activity_id: 0, template_id: item.templateId} }">
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

<script type="text/ecmascript-6">
import Crunmbs from 'base/crumbs/crumbs'
export default {
  data () {
    const domain = 'http://static.qianmaiapp.com'
    const address = '/platformv2/module/image'

    return {
      superiorCatalogue: {
        currentText: '活动中心'
      },
      pageList: [
        {
          img: `${domain}${address}/grab-red.png`,
          text: '砸红包',
          templateId: 'grab-red-envelope'
        },
        {
          img: `${domain}${address}/sma_eggs.png`,
          text: '砸金蛋',
          templateId: 'smaEggs'
        },
        {
          img: `${domain}${address}/unpacked.png`,
          text: '拆箱子',
          templateId: 'unpacked'
        },
        {
          img: `${domain}${address}/template4.png`,
          text: '刮刮乐',
          templateId: 'guaguale'
        },
        {
          img: `${domain}${address}/rotary_disc.png`,
          text: '大转盘（新版）',
          templateId: 'rotary_disc'
        },
        {
          img: `${domain}${address}/scratch_card.png`,
          text: '刮刮乐（新版）',
          templateId: 'scratch_card'
        },
        {
          img: `${domain}${address}/scratch_card.png`,
          text: '领红包',
          templateId: 'slip_packet'
        },
        {
          img: `${domain}${address}/scratch_card.png`,
          text: '砸金蛋v2',
          templateId: 'smaeggs_plus'
        },
        {
          img: `${domain}${address}/smaeggs_simplify.png`,
          text: '砸金蛋V4',
          templateId: 'smaeggs_simplify'
        }
      ]
    }
  },
  components: {
    Crunmbs
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .custom-crumbs{
    padding: 10px 10px 10px 8px; border-left: 2px solid #bbb; background: #f5f5f5;
  }
  .page-controller{
    margin: 20px 0;
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
</style>
