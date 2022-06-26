<template>
  <div>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="手机号" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="验证码" prop="password" >
        <div class="get-code">
          <el-input v-model="ruleForm.password" />
        <el-button type="primary" class="get-code-btn" @click="handleGetCodeClick">获取验证码</el-button>
        </div>

      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: '',
  password: ''
})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^[1][3-9][0-9]{9}$/, message: '手机号格式不正确', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { pattern: /^[0-9]{6}$/,  message: '验证码为6位数字', trigger: 'blur' }
  ]
})

//获取验证码
// const time = ref(10)
const handleGetCodeClick= ()=>{
  // console.log(time.value)
  // setTimeout(()=>{
  //   if(time.value === 0){
  //     time.value =  10
  //   }else{
  //     time.value --
  //   }
  // },1000)
}


</script>

<style scoped lang="less">
.get-code{
  display: flex;
  .get-code-btn{
    margin-left: 20px;
  }
}
</style>
