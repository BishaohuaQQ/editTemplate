<template lang="html">
  <div class="custom-crumbs">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">互动宝</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in superiorCatalogue.parents" :to="{ path: item.path }" :key="item.text">{{item.text}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{superiorCatalogue.currentText}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    superiorCatalogue: {
      type: Object
    }
  }
}
</script>

<style lang="scss">
  .custom-crumbs{
    margin-top: 10px; padding: 10px 10px 10px 8px; border-left: 2px solid #bbb; background: #f5f5f5;
  }
</style>
