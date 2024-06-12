<script lang="ts" setup>
import {
  Memo,
  Reading, View,
} from '@element-plus/icons-vue'
</script>

<template>
  <div class="layout-container">
    <el-container>
      <el-header class="el-header">
        <span class="header_slogan">
          <p style="margin-top: 15px;color: #00ca4e">图书后台管理系统</p>
        </span>
      </el-header>
      <el-container>
        <el-aside class="el-aside">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu
                  default-active="2"
                  class="el-menu-vertical-demo"
                  router
              >
                <el-menu-item index="/dataReport">
                  <el-icon><View /></el-icon>
                  <span>数据报表</span>
                </el-menu-item>
                <el-menu-item index="/bookList">
                  <el-icon><Reading /></el-icon>
                  <span>图书管理</span>
                </el-menu-item>
                <el-menu-item index="/bookCategory">
                  <el-icon><Memo /></el-icon>
                  <span>图书分类管理</span>
                </el-menu-item>
                <el-menu-item index="/customer">
                  <el-icon><Memo /></el-icon>
                  <span>图书借阅记录</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-container>
          <el-main class="el-main">
            <router-view></router-view>
          </el-main>
          <el-footer class="el-footer">
            <el-text class="mx-1">CreateBy © 河南科技大学 wszqj</el-text>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<style lang="scss"  scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}
.layout-container {
  height: 90vh;
  .el-header {
    height: 100px;
    width: auto;
    background-color: #F8FBFE;
    .header_slogan{
      width: 700px;
      height: 80px;
      text-align: center;
      font-size: 45px;
      font-weight: 500;
      float: left;
      margin-left: 520px;
      margin-top: 10px;
    }
    .logo img {
      width: 199px;
      height: 100px;
      float: left;
      padding-right: 1px;
      background-color: #eeefff;
    }
  }
  .el-aside {
    height: 815px;
    width: 200px;
    border: 0;
    //margin-top: 10px;
    background-color: #eeefff;
  }
  .el-main {
    height: 740px;
    width: auto;
    margin-top: 5px;
    margin-left: 5px;
  }
  .el-footer {
    height: 25px;
    width: auto;
    text-align: center;
    font-size: 15px;
  }
  .el-menu{
    --el-menu-border-color: transparent;
    --el-menu-text-color: black;
    --el-menu-hover-bg-color: #FFF9E9;
    --el-menu-f-bg-color: #FFF9E9;
    --el-menu-bg-color: #eeefff;
    --el-menu-item-font-size: 18px;
    --el-menu-item-bg-color: transparent;
  }
}
</style>