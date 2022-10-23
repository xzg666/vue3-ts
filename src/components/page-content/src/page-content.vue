<template>
  <div class="content">
    <hy-table
      :listData="dataList"
      :list-count="listCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- header中的插槽 -->
      <template #header-handler>
        <el-button
          v-if="isCreate"
          type="primary"
          size="medium"
          @click="handleNewClick"
          >新建用户</el-button
        >
      </template>
      <template #status="scope">
        <el-button size="small" :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">{{
        $filters.formatTime(scope.row.createAt)
      }}</template>
      <template #updateAt="scope">{{
        $filters.formatTime(scope.row.updateAt)
      }}</template>
      <template #handler="scope">
        <div class="handler-btns">
          <el-button
            v-if="isUpdate"
            icon="edit"
            size="mini"
            type="text"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            icon="delete"
            size="mini"
            type="text"
            @click="handleDeteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 在page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropsSlot"
        :key="item.slotName"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </hy-table>
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  computed,
  defineExpose,
  ref,
  watch,
  defineEmits
} from 'vue'
import { useStore } from 'vuex'

import HyTable from '@/base-ui/table'
import { usePermission } from '@/hooks/use-permission'
import { ElMessage, ElMessageBox } from 'element-plus'

const props = defineProps({
  contentTableConfig: {
    type: Object,
    required: true
  },
  pageName: {
    type: String,
    required: true
  }
})

//1.列表数据配置
const store = useStore()
//获取按钮操作的权限
const isCreate = usePermission(props.pageName, 'create')
const isUpdate = usePermission(props.pageName, 'update')
const isDelete = usePermission(props.pageName, 'delete')
const isQuery = usePermission(props.pageName, 'query')
//双向绑定pageinfo
const pageInfo = ref({ currentPage: 1, pageSize: 10 })
watch(pageInfo, () => getPageData()) //点击分页双向绑定的pageinfo发生变化，则根据最新的pageinfo信息发送请求

//2.发送网络请求
const getPageData = (queryInfo: any = {}) => {
  if (!isQuery) return
  store.dispatch('system/getPageListAction', {
    pageName: props.pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo
    }
  })
}
getPageData()
//将方法暴露出去，父组件可以调用
defineExpose({ getPageData })

// 3.从vuex中获取数据
const dataList = computed(() => {
  return store.getters['system/pageListData'](props.pageName)
})
const listCount = computed(() => {
  return store.getters['system/pageListCount'](props.pageName)
})

//4.获取其他的（非公共的）动态插槽名称
const otherPropsSlot = props.contentTableConfig.propList.filter((item: any) => {
  if (item.slotName === 'status') return false
  if (item.slotName === 'createAt') return false
  if (item.slotName === 'updateAt') return false
  if (item.slotName === 'handler') return false
  return true
})

//删除event
const handleDeteClick = (item: any) => {
  // console.log(item)
  ElMessageBox.confirm(
    `是否删除${item.name}?`,
    {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
      center: true
    }
  )
    .then(() => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
      ElMessage({
        type: 'success',
        message: '已删除'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除'
      })
    })
}

const emit = defineEmits(['newBtnClick', 'editBtnClick'])
//新建
const handleNewClick = () => {
  emit('newBtnClick')
}
//编辑
const handleEditClick = (item: any) => {
  emit('editBtnClick', item)
}
</script>

<style scoped>
.handler-btns {
  display: flex;
  justify-content: space-around;
}
</style>
