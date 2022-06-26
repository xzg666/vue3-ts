<template>
  <div>
    <zz-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h2 style="color:red">高级检索</h2>
      </template>
      <template #footer>
        <el-button  icon="refresh" @click="handleResetClick">重置</el-button>
        <el-button type="primary" icon="search"
        @click="handleQueryClick"
        >搜索</el-button>
      </template>
    </zz-form>
  </div>
</template>

<script setup lang="ts">
import { ref,defineProps,defineEmits } from 'vue';
import ZzForm from '@/base-ui/form';

const props = defineProps({
  searchFormConfig:{
    type:Object,
    default:()=>({})
  }
})
//formData的值不是写死的而是使用者传配置动态生成的
//双向绑定的属性应该是由配置文件的field来决定
const formItems = props.searchFormConfig?.formItems ?? []
const formOriginData:any = {}
formItems.forEach((item:any)=>{
  formOriginData[item.field] = ''
})
const formData = ref(formOriginData)



const emit = defineEmits(['resetBtnClick','queryBtnClick'])
//重置
const handleResetClick = ()=>{
  // formData.value = formOriginData
  //这会出现引用问题，form组件的fordata使用的浅拷贝modelvalue，这里直接修改formdata的值是无法修改到form组件的值的，因此需要修改里面的值
  for(const key in formOriginData){
    formData.value[`${key}`] = formOriginData[key]
  }
  emit('resetBtnClick')
}
//搜索
const handleQueryClick = ()=>{
  emit('queryBtnClick',formData.value)
}

</script>

<style scoped>

</style>
