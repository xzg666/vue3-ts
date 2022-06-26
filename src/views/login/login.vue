<template>
  <div class="login-box">
    <div class="login-panel">
      <el-tabs type="border-card" stretch>
        <el-tab-pane>
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><Avatar /></el-icon>
              <span>账号登录</span>
            </span>
          </template>
          <login-account ref="loginAccountRef"></login-account>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <el-icon><Iphone /></el-icon>
            <span class="custom-tabs-label">
              <span>手机登录</span>
            </span>
          </template>
          <login-phone />
          <el-icon>
            <arrow-down />
          </el-icon>
        </el-tab-pane>
      </el-tabs>
      <div class="pasw-fun">
        <el-checkbox v-model="isRemerberPsd" label="Option 1" size="large"
          >记住密码</el-checkbox
        >
        <el-link type="primary">忘记密码</el-link>
      </div>
      <el-button type="primary" class="login-btn" size="large" @click="handleLoginClick">登录</el-button>
    </div>
  </div>
</template>

<script lang="ts" >
import { defineComponent,ref } from 'vue'

import { Iphone, Avatar } from '@element-plus/icons-vue'
import LoginAccount from './coms/login-account.vue'
import LoginPhone from './coms/login-phone.vue'


export default defineComponent({
  components: { Iphone, Avatar, LoginAccount, LoginPhone },
  setup() {
    const loginAccountRef = ref<InstanceType<typeof LoginAccount>>()
    const isRemerberPsd = ref()

    const handleLoginClick = () => {
      loginAccountRef.value?.loginAction(isRemerberPsd)
    }
    return {handleLoginClick,loginAccountRef,isRemerberPsd}
  }
})
</script>


<style scoped>
.login-box {
  padding: 10% 0;
  background: url('@/assets/img/login-bg.svg') center ;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.login-panel {
  width: 25%;
  height: auto;
  margin: 0 auto;
}
.pasw-fun {
  display: flex;
  justify-content: space-between;
}
.login-btn{
  width: 100%;
  margin-top: 15px;
}
</style>
