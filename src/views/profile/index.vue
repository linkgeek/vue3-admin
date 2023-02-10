<template>
  <div class="profile-container">
    <div class="header">
      <trend-user :data="terendUserData"></trend-user>
    </div>

    <div class="block" style="margin-top: 30px">
      <!-- 累计收益趋势图 -->
      <trend-vue></trend-vue>
    </div>

    <div class="block" style="margin-top: 30px"></div>
  </div>
</template>

<script setup>
import trendVue from '../chart/components/trend'
import trendUser from './components/trend-user.vue'
import { ref } from 'vue'

// 用户数据概况
const terendUserData = ref({})
terendUserData.value = {
  totalUserAmount: 111222,
  todayAddUserAmount: 46,
  activeUserAmount: 219,
  chargeAmount: 34860
}
</script>

<style lang="scss" scoped>
.profile-container {
  .header {
    padding-bottom: 40px;
  }
}
</style>
