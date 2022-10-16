<template>
  <div class="page-modal">
    <el-dialog title="新建用户" v-model="dialogVisible" width="30%" center destroy-on-close>
      <zz-form v-bind="modalConfig" v-model="formData"></zz-form>
      <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancleClick">取消</el-button>
        <el-button type="primary" @click="handleConfirmClick">确定</el-button>
      </span>
    </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { defineProps,ref,defineExpose, watch } from 'vue';

import ZzForm from '@/base-ui/form';
import { useStore } from 'vuex';

const props = defineProps({
  modalConfig:{
    type:Object,
    rquired:true
  },
  defaultValue:{
    type:Object,
    default:()=>({})
  },
  pageName:{
    type:String,
    required:true
  },
  otherInfo:{
    type:Object,
    default:()=>({})
  }
})
const dialogVisible = ref(false)
const formData = ref({})


defineExpose({
  dialogVisible
})

watch(()=>props.defaultValue,(newValue)=>{
  console.log('nv',newValue)
  for(const item of props.modalConfig?.formItems){
    formData.value[`${item.field}`] = newValue[`${item.field}`]
  }
})

const handleCancleClick = ()=>{
  dialogVisible.value = !dialogVisible.value
}
const store = useStore()
const handleConfirmClick = ()=>{
  dialogVisible.value = !dialogVisible.value
  if(Object.keys(props.defaultValue).length){
    //编辑
    console.log('编辑用户',props.otherInfo)
    store.dispatch('system/editPageDataAction',{
      pageName:props.pageName,
      editData:{...formData.value,...props.otherInfo},
      id:props.defaultValue.id
    })

  }else{
    //新建
    console.log('新建用户',props.otherInfo)
    store.dispatch('system/createPageDataAction',{
      pageName:props.pageName,
      newData:{...formData.value,...props.otherInfo}

    })
  }
}

</script>

<style scoped>
</style>
