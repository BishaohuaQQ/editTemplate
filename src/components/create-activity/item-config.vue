<template lang="html">
  <div class="item-wrapper">
    <div class="tmp-item" v-for="(item, $index) in itemData" :key="$index" :title="item.content" :class="{'active': item.active}" @click="chooseItem($index)">
      <div class="tmp-content">
        <div class="tmp-content-inner">
          <img v-if="item.editType === 'img' && item['img']" :src="item['img']" :data-query="item.query">
          <img v-if="item.editType === 'bgImg' && item['bgImg']" :src="bgImg2Img(item['bgImg'])" :data-query="item.query">
          <div v-if="(item.editType === 'img' && !item['img']) || (item.editType === 'bgImg' && !item['bgImg'])" :data-query="item.query" class="blank">空</div>
          <div class="context" v-if="item.editType === 'text'" :data-query="item.query">{{item['text']}}</div>
          <div class="bg-color" v-if="item.editType === 'bgC'" :style="`background-color: ${item['bgC']}`" :data-query="item.query"></div>
          <div class="bg-color" v-if="item.editType === 'bdC'" :style="`background-color: ${item['bdC']}`" :data-query="item.query"></div>
          <div class="bg-color" v-if="item.editType === 'color'" :style="`background-color: ${item['color']}`" :data-query="item.query"></div>
        </div>
      </div>
      <div class="tmp-title">{{item.content}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    // 皮肤配置项
    itemData: {
      type: Array
    },
    // 所属区域
    region: {
      type: String
    }
  },
  methods: {
    bgImg2Img (bgImg) {
      return bgImg.replace(/("?url\("?)|("?\)"?)/g, '')
    },
    chooseItem (index) {
      this.itemData.forEach(item => {
        this.$set(item, 'active', false)
      })
      this.itemData && this.$set(this.itemData[index], 'active', true)
      this.$emit('activeItem', this.itemData[index], this.region, index)
    }
  }
}
</script>

<style lang="scss" scoped>
  .item-wrapper{
    overflow: hidden;
  }
  .tmp-item{
    display: inline-block; width: 94px; margin-right: 15px; margin-bottom: 6px; vertical-align: top;
    .tmp-content{
      height: 94px; word-break: break-all; word-wrap: break-word; border: 1px solid #ddd; position: relative; border-radius: 3px;
    }
    .tmp-content-inner{
      position: relative; height: 100%; overflow: hidden;
      img{
        position: absolute; left: 0; top: 0; right: 0; bottom: 0; max-width: 70%; max-height: 70%; margin: auto;
      }
      .bg-color{
        position: absolute; left: 50%; top: 50%; width: 70px; height: 32px; border: 4px solid #fff; box-shadow: 0 0 0 1px #ddd; border-radius: 3px; transform: translate(-50%, -50%);
      }
      .context{
        position: absolute; left: 50%; top: 50%; width: 70px; height: 36px; padding: 4px; border: 1px solid #ddd; font-size: 12px; color: rgba(0,0,0,.65); border-radius: 3px; transform: translate(-50%, -50%); overflow: hidden;
      }
      .blank{
        position: absolute; width: 100%; left: 0; top: 50%; font-size: 12px; color: rgba(0,0,0,.65); text-align: center; transform: translateY(-50%);
      }
    }
    .tmp-title{
      padding: 6px 4px; overflow: hidden; font-size: 12px; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    &.active{
      .tmp-content{
        border-color: #0eaaf0;
      }
      .tmp-title{
        color: #0eaaf0;
      }
      &:before{
        display: none;
      }
    }
  }
</style>
