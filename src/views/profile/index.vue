<template>
  <div class="profile-container">
    <div class="header">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple" style="background-color:#67C23A">用户总数</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple" style="background-color:#E6A23C">注册总数</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple" style="background-color:#F56C6C">文章总数</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple" style="background-color:#409EFF">最新消息</div>
        </el-col>
      </el-row>
    </div>

    <div class="block" style="margin-top: 30px">
      <!-- 累计收益趋势图 -->
      <trend-vue></trend-vue>
    </div>

    <div class="block" style="margin-top: 30px">

    </div>
  </div>
</template>

<script setup>
import trendVue from '../chart/components/trend'
</script>

<style lang="scss" scoped>
.profile-container {
  .header {
    padding-bottom: 30px;
    .el-row {
      height: 40px;
      margin-bottom: 30px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      height: 40px;
      border-radius: 4px;
    }
    .bg-purple {
      border: 1px solid #d3dce6;
      padding: 4px;
      color: #fff;
    }
    .grid-content {
      border-radius: 4px;
      height: 80px;
      font-weight: bold;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
  }
}
</style>
