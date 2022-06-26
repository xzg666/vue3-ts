<template>
  <div class="role">
    <page-search
      :search-form-config="searchFormConfig"
      @resetBtnClick="handleResetBtnClick"
      @queryBtnClick="handleQueryBtnClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :content-table-config="contentTableConfig"
      page-name="role"
      @newBtnClick="newBtnClick"
      @editBtnClick="editBtnClick"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :modal-config="modalConfig"
      :default-value="defaultValue"
      page-name="role"
      :other-info="otherInfo"
    >
      <el-tree
        ref="elTreeRef"
        :data="menus"
        show-checkbox
        node-key="id"
        :props="{
          children: 'children',
          label: 'name'
        }"
        @check="handleCheckChange"
      />
    </page-modal>
  </div>
</template>

<script setup lang="ts">

import { computed, nextTick, ref } from 'vue'
import { useStore } from 'vuex'

import pageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { usePageSeach } from '@/hooks/use-page-search'
import { useModal } from '@/hooks/use-modal'

import { searchFormConfig } from './config/page-search'
import { contentTableConfig } from './config/page-content'
import { modalConfig } from './config/page-modal'
import { getMenuLeafKeys } from '@/utils/mapMenusToRoutes'

import { ElTree } from 'element-plus'

//处理pageModal的hook
const elTreeRef = ref<InstanceType<typeof ElTree>>()
const editCallback = (item:any) => {
  //拿到所有的子节点数组
  const leafKeys = getMenuLeafKeys(item.menuList)
  //这里需要使用nexttick,因为可能来不及绑定ref
  nextTick(()=>{
    elTreeRef.value?.setCheckedKeys(leafKeys,false)
  })


}

const [pageContentRef, handleResetBtnClick, handleQueryBtnClick] = usePageSeach()
const [pageModalRef, defaultValue, newBtnClick, editBtnClick] = useModal(undefined,editCallback)

const store = useStore()
const menus = computed(() => store.state.entireMenu)

const otherInfo = ref({})
const handleCheckChange = (data1:any,data2:any) => {
  console.log(data1,'---',data2)
  const checkedKeys = data2.checkedKeys
  const halfCheckedKeys = data2.halfCheckedKeys
  const menuList = [...checkedKeys,...halfCheckedKeys]
  otherInfo.value = {menuList}
}
</script>

<style scoped></style>
