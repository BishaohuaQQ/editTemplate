<template lang="html">
  <div ref="wrapper" id="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import IScroll from 'iscroll'
export default {
  props: {
    scrollY: {
      type: Boolean,
      default: true
    },
    mouseWheel: {
      type: Boolean,
      default: false
    },
    scrollbars: {
      type: Boolean,
      default: false
    },
    fadeScrollbars: {
      type: Boolean,
      default: false
    },
    loadMore: {
      type: Function
    }
  },
  data () {
    return {
      myScroll: Object
    }
  },
  methods: {
    refresh () {
      this.myScroll.refresh()
    }
  },
  mounted () {
    let _this = this
    this.myScroll = new IScroll(this.$refs.wrapper, {
      scrollY: this.scrollY,
      scrollX: !this.scrollY,
      fadeScrollbars: this.fadeScrollbars,
      mouseWheel: this.mouseWheel,
      scrollbars: this.scrollbars,
      preventDefault: false
    })
    if (!this.loadMore) return
    this.myScroll.on('scrollEnd', function () {
      if (this.y <= this.maxScrollY + 20) {
        _this.loadMore()
      }
    })
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  #wrapper{
    position: relative; width: 100%; height: 100%;
  }
</style>
