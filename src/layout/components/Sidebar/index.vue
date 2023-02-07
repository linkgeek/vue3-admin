<template>
  <div class="">
    <div class="logo-container">
      <el-avatar shape="square" :src="logoUrl" />
      <h1 class="logo-title" v-if="$store.getters.sidebarOpened">Vue3-admin</h1>
    </div>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import SidebarMenu from './SidebarMenu'
import {} from 'vue'

const logoUrl = require('../../../assets/logo-icon.png')
const logoHeight = 40
</script>

<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoHeight) + 'px';
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .el-avatar {
    width: 43px;
    height: 40px;
  }
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
