<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button type="primary">{{ $t('msg.excel.importExcel') }}</el-button>
        <el-button type="primary">{{ $t('msg.excel.exportExcel') }}</el-button>
      </div>
    </el-card>

    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column
          prop="username"
          :label="$t('msg.excel.name')"
        ></el-table-column>
        <el-table-column
          prop="mobile"
          :label="$t('msg.excel.mobile')"
        ></el-table-column>
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>

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
        <el-table-column
          prop="openTime"
          :label="$t('msg.excel.openTime')"
        ></el-table-column>
        <!-- 操作 -->
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="200"
        >
          <template #default>
            <el-button type="primary" size="mini">
              {{ $t('msg.excel.show') }}
            </el-button>
            <el-button type="info" size="mini">
              {{ $t('msg.excel.showRole') }}
            </el-button>
            <el-button type="danger" size="mini">
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
        :page-sizes="[2, 5, 10, 20]"
        layout="total, sizes, prev, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getUserManageList } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'

const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)

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
</script>

<style lang="scss" scoped></style>
