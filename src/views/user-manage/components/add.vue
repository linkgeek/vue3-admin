<template>
  <el-dialog
    title="添加用户"
    :model-value="modelValue"
    @close="closed"
  >
    <el-form :model="addForm">
      <el-form-item label="名称" :label-width="formLabelWidth">
        <el-input v-model="addForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" :label-width="formLabelWidth">
        <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="头像" :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          action="http://120.25.227.106:9095/sys/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="分配角色" :label-width="formLabelWidth">
        <el-checkbox-group v-model="addForm.roles">
          <el-checkbox
            v-for="item in allRoleList"
            :label="item.title"
            :key="item.id"
          />
        </el-checkbox-group>
      </el-form-item>
    </el-form>

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
import { defineProps, defineEmits, ref, reactive } from 'vue'
import { roleList } from '@/api/role'
import { updateRole } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { Plus } from '@element-plus/icons-vue'

const imageUrl = ref('')

const handleAvatarSuccess = (res, uploadFile) => {
  console.log(res, 222, uploadFile)
  if (res && res.code === 0) {
    imageUrl.value = res.data.imageUrl
    ElMessage.success('图片上传成功！')
  } else {
    if (res && res.msg) {
      ElMessage.error(res.msg)
    } else {
      ElMessage.error('图片上传失败！')
    }
  }
}

// 上传文件前检验
const beforeAvatarUpload = (rawFile) => {
  // console.log(rawFile)
  const type = ['image/jpeg', 'image/jpg', 'image/png']
  if (type.indexOf(rawFile.type) === -1) {
    ElMessage.error('上传的文件支持JPG、JPEG、PNG')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过2MB!')
    return false
  }
  return true
}

const addForm = reactive({
  name: '',
  mobile: '',
  roles: []
})

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['update:modelValue', 'reflushRole'])

const closed = () => {
  emits('update:modelValue', false)
}

// 获取所有角色
const allRoleList = ref([])
const getRoleListData = async () => {
  allRoleList.value = await roleList()
}
getRoleListData()
watchSwitchLang(getRoleListData)

const i18n = useI18n()
const onConfirm = async () => {
  console.log(props.userId)
  await updateRole(props.userId)

  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))

  emits('reflushRole')
  closed()
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>