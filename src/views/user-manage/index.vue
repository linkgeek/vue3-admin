<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-form :inline="true" :model="searchUser" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="searchUser.user" placeholder="姓名" clearable />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input
              v-model="searchUser.phone"
              placeholder="手机号"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>

          <el-form-item class="text-right" style="margin-right: 0">
            <el-button type="warning" @click="addUserClick()">{{
              $t('msg.excel.userAdd')
            }}</el-button>
            <el-button type="primary" @click="onImportExcelClick">
              {{ $t('msg.excel.importExcel') }}</el-button
            >
            <el-button type="success" @click="onToExcelClick">
              {{ $t('msg.excel.exportExcel') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <!-- 索引 -->
        <el-table-column label="#" type="index" align="center" />
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
              <el-tag v-for="item in row.role" :key="item.id" size="small">
                {{ item.title }}
              </el-tag>
            </div>
            <div v-else>
              <el-tag size="small">{{ $t('msg.excel.defaultRole') }}</el-tag>
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
          width="240"
          align="center"
        >
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="onShowClick(row._id)">
              {{ $t('msg.excel.show') }}
            </el-button>
            <el-button type="info" size="small" @click="onShowRoleClick(row)">
              {{ $t('msg.excel.showRole') }}
            </el-button>
            <el-button type="danger" size="small" @click="onRemoveClick(row)">
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

    <export-to-excel v-model="exportToExcelVisible"></export-to-excel>

    <!-- 修改角色 -->
    <roles-dialog
      v-model="roleDialogVisible"
      :userId="selectUserId"
      @reflushRole="getListData"
    ></roles-dialog>

    <!-- 添加用户 -->
    <add-dialog
      v-model="addUserDialogVisible"
      :userId="selectUserId"
      @reflushRole="getListData"
    ></add-dialog>
  </div>
</template>

<script setup>
import { ref, watch, reactive } from 'vue'
import { getUserManageList, deleteUser } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessageBox, ElMessage } from 'element-plus'
import RolesDialog from './components/roles.vue'
import addDialog from './components/add.vue'
import ExportToExcel from './components/Export2Excel.vue'

// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(5)
const user = ref('')
const phone = ref('')

// 获取列表
const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value,
    user: user.value,
    phone: phone.value
  })

  tableData.value = result.list
  total.value = result.total
}
getListData()
// 语言监控
watchSwitchLang(getListData)

// 切页刷新
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}
// 修改pageSize刷新
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}

// 添加用户
const addUserDialogVisible = ref(false)
const addUserClick = () => {
  addUserDialogVisible.value = true
}

// 修改用户角色
const roleDialogVisible = ref(false)
const selectUserId = ref('')
const onShowRoleClick = (row) => {
  roleDialogVisible.value = true
  selectUserId.value = row._id
}

/**
 * 删除按钮点击事件
 */
const i18n = useI18n()
const onRemoveClick = row => {
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') +
      row.username +
      i18n.t('msg.excel.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    await deleteUser(row._id)
    ElMessage.success(i18n.t('msg.excel.removeSuccess'))
    // 重新渲染数据
    getListData()
  })
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

// 搜索
const onSubmit = () => {
  page.value = 1
  user.value = searchUser.user
  phone.value = searchUser.phone
  getListData()
}

const router = useRouter()
/**
 * excel 导入点击事件
 */
const onImportExcelClick = () => {
  router.push('/user/import')
}

/**
 * excel 导出点击事件
 */
const exportToExcelVisible = ref(false)
const onToExcelClick = () => {
  exportToExcelVisible.value = true
}

/**
 * 查看按钮点击事件
 */
const onShowClick = (id) => {
  router.push(`/user/info/${id}`)
}
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
  }
  :deep(.avatar) {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  :deep(.el-tag) {
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
