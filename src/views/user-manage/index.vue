<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-form :inline="true" :model="searchUser" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="searchUser.user" placeholder="姓名" />
          </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="searchUser.phone" placeholder="手机号" />
            </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>

          <el-form-item class="text-right" style="margin-right:0">
            <el-button type="warning">{{ $t('msg.excel.userAdd') }}</el-button>
            <el-button type="primary">{{ $t('msg.excel.importExcel') }}</el-button>
            <el-button type="success">{{ $t('msg.excel.exportExcel') }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          :label="$t('msg.excel.id')"
          prop="_id"
          width="220"
        ></el-table-column>
        <el-table-column
          prop="username"
          :label="$t('msg.excel.name')"
        ></el-table-column>
        <!-- 联系方式 -->
        <el-table-column
          prop="mobile"
          :label="$t('msg.excel.mobile')"
        ></el-table-column>
        <!-- 头像 -->
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <!-- 角色 -->
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="mini">
                {{ item.title }}
              </el-tag>
            </div>
            <div v-else>
              <el-tag size="mini">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- 时间 -->
        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="300"
        >
          <template #default="{ row }">
            <el-button type="primary" size="mini" @click="onShowClick(row._id)">
              {{ $t('msg.excel.show') }}
            </el-button>
            <el-button
              type="info"
              size="mini"
              @click="onShowRoleClick(row)"
            >
              {{ $t('msg.excel.showRole') }}
            </el-button>
            <el-button
              type="danger"
              size="mini"
              @click="onRemoveClick(row)"
            >
              {{ $t('msg.excel.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="size"
        :page-sizes="[5, 10, 20, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <roles-dialog
      v-model="roleDialogVisible"
      :userId="selectUserId"
      @reflushRole="getListData"
    ></roles-dialog>
  </div>
</template>

<script setup>
import { ref, watch, reactive } from 'vue'
import { getUserManageList } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import RolesDialog from './components/roles.vue'

const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(5)

const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value
  })

  tableData.value = result.list
  total.value = result.total
}
getListData()
watchSwitchLang(getListData)

// 分页刷新
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}

// 获取用户角色
const roleDialogVisible = ref(false)
const selectUserId = ref('')
const onShowRoleClick = (row) => {
  roleDialogVisible.value = true
  selectUserId.value = row._id
}

// 删除
const onRemoveClick = (row) => {
  console.log('row: ', row)
}

// 保证数据刷新
watch(roleDialogVisible, (val) => {
  if (!val) selectUserId.value = ''
})

// 查询用户
const searchUser = reactive({
  user: '',
  phone: ''
})

const onSubmit = () => {
  console.log('submit!', searchUser)
}
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
  }
  ::v-deep .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  ::v-deep .el-tag {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
  }

  .text-right {
    float: right;
  }
}
</style>
