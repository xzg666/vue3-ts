<template>
  <div class="user">
    <page-search
      :search-form-config="searchFormConfig"
      @resetBtnClick="handleResetBtnClick"
      @queryBtnClick="handleQueryBtnClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @newBtnClick="newBtnClick"
      @editBtnClick="editBtnClick"
    ></page-content>
    <page-modal
      :defaultValue="defaultValue"
      ref="pageModalRef"
      :modal-config="modalConfigRef"
      pageName="users"
    ></page-modal>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { computed } from 'vue-demi'

import { searchFormConfig } from './config/page-search'
import { contentTableConfig } from './config/page-content'
import { modalConfig } from './config/page-modal'

import pageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { usePageSeach } from '@/hooks/use-page-search'
import { useModal } from '@/hooks/use-modal'

const newCallback = () => {
  const passwordItem = modalConfig.formItems.find((item: any) => {
    return item.field === 'password'
  })
  passwordItem!.isHidden = false
}
const editCallback = () => {
  const passwordItem = modalConfig.formItems.find((item: any) => {
    return item.field === 'password'
  })
  passwordItem!.isHidden = true
}
const [pageContentRef, handleResetBtnClick, handleQueryBtnClick] =
  usePageSeach()
const [pageModalRef, defaultValue, newBtnClick, editBtnClick] = useModal(
  newCallback,
  editCallback
)

//动态添加部门和角色列表
const store = useStore()
//响应式
const modalConfigRef = computed(() => {
  const departmentItem = modalConfig.formItems.find((item: any) => {
    return item.field === 'departmentId'
  })
  departmentItem!.options = store.state.entireDepartment.map((item: any) => {
    return { title: item.name, value: item.id }
  })
  const roleItem = modalConfig.formItems.find((item: any) => {
    return item.field === 'roleId'
  })
  roleItem!.options = store.state.entireRole.map((item: any) => {
    return { title: item.name, value: item.id }
  })
  return modalConfig
})

// const pageModalRef = ref<InstanceType<typeof PageModal>>()
// const defaultValue = ref({})

// const newBtnClick = () =>{
//   if(pageModalRef.value){
//     pageModalRef.value.dialogVisible = true
//     defaultValue.value = {}
//   }
// }
// const editBtnClick = (item:any) =>{
//   if(pageModalRef.value){
//     pageModalRef.value.dialogVisible = true
//     defaultValue.value = {...item}
//   }
// }
</script>

<style scoped lang="less">
</style>
