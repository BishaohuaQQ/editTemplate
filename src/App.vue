<template>
<div id="app">
  <div class="fixed-top">
    <!--<el-header>
      <el-row>
        <el-col :span="20">
          <el-menu mode="horizontal" background-color="#5898d7" text-color="#fff" active-text-color="#fff">
            <el-menu-item index="1" class="logo">
              <a href="/"><img src="http://static.adjuz.com/platformv2/media/image/logo@3x.png"></a>
            </el-menu-item>
            <el-menu-item index="2">投放明细</el-menu-item>
            <el-menu-item index="3">广告管理</el-menu-item>
            <el-menu-item index="4">广告管理</el-menu-item>
            <el-menu-item index="5">媒体管理</el-menu-item>
            <el-submenu index="6">
              <template slot="title">数据管理</template>
              <el-menu-item index="6-1">活动数据</el-menu-item>
              <el-menu-item index="6-2">广告数据</el-menu-item>
            </el-submenu>
            <el-menu-item index="7">活动中心</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="4">
          <el-menu class="login-info" mode="horizontal" background-color="#5898d7" text-color="#fff" active-text-color="#fff">
            <el-submenu index="1">
              <template slot="title">名字</template>
              <el-menu-item index="1-1">修改密码</el-menu-item>
              <el-menu-item index="1-2">退出</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </el-header>-->
  </div>
  <div class="view-content">
    <router-view/>
  </div>
</div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  #app {
    min-width: 1300px;
  }
  .fixed-top{
    position: fixed; left: 0; top: 0; right: 0; z-index: 2000;
    .login-info{
      .el-submenu__title{
        border-bottom: none !important;
      }
    }
  }
  .el-header{
    padding: 0;
    .logo{
      a{
        display: block; width: 100px;
        img{
          width: 100%;
        }
      }
    }
  }
  .el-submenu__title i{
    color: #fff; font-weight: bold;
  }
  .login-info.el-menu--horizontal>.el-submenu{
    float: right;
  }
  .view-content{
    margin: 0 20px; overflow: hidden;
    padding-top: 60px;
  }
  .iScrollLoneScrollbar{
    z-index: 99 !important;
  }
</style>
