<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-tree
      ref="treeRef"
      :data="allPermission"
      :props="defaultProps"
      node-key="id"
      show-checkbox
      check-strictly
      default-expand-all
    />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { permissionList } from '@/api/permission'
import { rolePermission, distributePermission } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})

// 渲染权限
const defaultProps = {
  label: 'permissionName',
  children: 'children'
}

// 获取所有权限
const allPermission = ref([])
const getPermissionList = async (roleId) => {
  allPermission.value = await permissionList(roleId)
}
getPermissionList()
watchSwitchLang(getPermissionList)

// ref
const treeRef = ref(null)

// 获取当前角色权限
const getRolePermission = async () => {
  const checkedKeys = await rolePermission(props.roleId)
  treeRef.value.setCheckedKeys(checkedKeys)
}

watch(
  () => props.roleId,
  (val) => {
    if (val) getRolePermission()
  }
)

const emits = defineEmits(['update:modelValue'])

const i18n = useI18n()
const onConfirm = async () => {
  await distributePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys()
  })

  ElMessage.success(i18n.t('msg.role.updatePermissionSuccess'))

  closed()
}

const closed = () => {
  emits('update:modelValue', false)
}
</script>
