<template>
  <div class="profile-container">
    <div class="header">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">用户总数</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">注册总数</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">文章总数</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">最新消息</div>
        </el-col>
      </el-row>
    </div>

    <div class="block" style="margin-top: 30px">
      <el-timeline>
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <el-card>
            <h4>Update Github template</h4>
            <p>Tom committed 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/3" placement="top">
          <el-card>
            <h4>Update Github template</h4>
            <p>Tom committed 2018/4/3 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/2" placement="top">
          <el-card>
            <h4>Update Github template</h4>
            <p>Tom committed 2018/4/2 20:46</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script setup>

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
      color: #666;
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
