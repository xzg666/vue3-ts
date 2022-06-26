<template>
  <div>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref,defineExpose } from 'vue'
import {useStore} from 'vuex'
import type { FormInstance, FormRules } from 'element-plus'
import localCache from '../../../utils/cache'

const store = useStore()

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: 'coderwhy',
  password: '123456'
})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { pattern: /^[a-z0-9]{5,10}$/, message: '账号必须为5到10位数字或者字母', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { pattern: /^[a-z0-9]{5,}$/,  message: '密码必须是5位及以上数组或字母', trigger: 'blur' }
  ]
})

const loginAction = (isRemerberPsd:boolean)=>{
  ruleFormRef.value?.validate(isOk=>{
    if(isOk){
      //1.是否需要记住密码
      if(isRemerberPsd){
        localCache.setCache('name',ruleForm.name)
        localCache.setCache('password',ruleForm.password)
      }else{
        localCache.deleteCache('name')
        localCache.deleteCache('password')
      }
      store.dispatch('login/accountLoginAction',ruleForm)

    }
  })
}

 defineExpose({
  loginAction
})

</script>

<style scoped>
</style>
