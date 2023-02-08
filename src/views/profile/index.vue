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
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :hollow="activity.hollow"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </div>

    <div class="block" style="margin-top: 30px">

    </div>
  </div>
</template>

<script setup>
import { MoreFilled } from '@element-plus/icons-vue'

const activities = [
  {
    content: 'Custom icon',
    timestamp: '2018-04-12 20:46',
    size: 'large',
    type: 'primary',
    icon: MoreFilled
  },
  {
    content: 'Custom color',
    timestamp: '2018-04-03 20:46',
    color: '#0bbd87'
  },
  {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    size: 'large'
  },
  {
    content: 'Custom hollow',
    timestamp: '2018-04-03 20:46',
    type: 'primary',
    hollow: true
  },
  {
    content: 'Default node',
    timestamp: '2018-04-03 20:46'
  }
]
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
      min-height: 66px;
      font-weight: bold;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
  }
}
</style>
