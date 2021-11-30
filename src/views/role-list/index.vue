<template>
  <div>
    <el-card>
      <el-table :data="roleLists" border style="width: 100%">
        <el-table-column
          type="index"
          :label="$t('msg.role.index')"
          width="120"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.name')"
          prop="title"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.desc')"
          prop="describe"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.action')"
          width="200"
          #default="{ row }"
        >
          <!-- v-permission="['distributePermission']" -->
          <el-button
            type="primary"
            size="mini"
            @click="onDistributePermissionClick(row)"
          >
            {{ $t('msg.role.assignPermissions') }}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>

    <permission-dialog v-model="visible" :roleId="selectRoleId" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { roleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import PermissionDialog from './components/permission.vue'

// 获取角色列表
const roleLists = ref([])
const getRoleList = async () => {
  roleLists.value = await roleList()
}
getRoleList()
watchSwitchLang(getRoleList)

// 分配权限
const visible = ref(false)
const selectRoleId = ref('')
const onDistributePermissionClick = (row) => {
  visible.value = true
  selectRoleId.value = row.id
}
</script>

<style lang="scss" scoped></style>
