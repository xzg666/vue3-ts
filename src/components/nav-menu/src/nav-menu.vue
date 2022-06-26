<template>
  <div class="nav-menu">
    <div class="title-box">
      <img src="~@/assets/img/logo.svg" class="logo-pic" />
      <span v-if="!isCollapse">vue3+ts</span>
    </div>
    <!-- 菜单栏 -->
    <el-menu
      active-text-color="#ffd04b"
      background-color="#041527"
      text-color="#fff"
      :default-active="defaultValue"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 遍历二级路由 -->
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon><component :is="iconNameUtils(item.icon)" /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历二级路由的children -->
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.id + ''" @click="handleMenuClick(subItem)">
              <template #title>
              <el-icon><component v-if="subItem.icon" :is="iconNameUtils(subItem.icon)" /></el-icon>
              <span>{{ subItem.name }}</span>
            </template>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 遍历一级路由的children -->
        <template v-if="item.type === 2">
          <el-menu-item :index="item.id + ''" >
            <template #title>
              <el-icon><component :is="iconNameUtils(item.icon)" /></el-icon>
              <span>{{ item.name }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { defineProps,ref,computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router';
import { iconNameUtils } from '@/utils/icon-name'
import router from '@/router';
import { pathMapToMenu } from '@/utils/mapMenusToRoutes';

const props = defineProps({
  isCollapse:{
    type:Boolean,
    default:false
  }
})

//store
const store = useStore()
const userMenus = computed(()=>store.state.login.userMenus)

//点击菜单函数
const handleMenuClick = (item:any) => {
  router.push(item.url)
}
//设置默认选中
const route = useRoute()
const currentPath = route.path
const menu = pathMapToMenu(userMenus.value,currentPath)
// console.log('menu',menu)
const defaultValue = ref(menu?.id + '')
// console.log('menu',menu,defaultValue.value)




</script>

<style scoped lang="less">
.nav-menu {
  overflow: hidden;
  background-color: #041527;
  height: auto;
  .title-box {
    height: 35px;
    width: 100%;
    line-height: 35px;
    display: flex;
    justify-content: center;
    margin: 10px 0;
    .logo-pic {
      width: 35px;
      height: 35px;
    }
    span {
      color: #fff;
      display: block;
    }
  }
  .el-menu-vertical-demo{
    width: 102%;
  }
}
.el-menu{
  border-right: none !important;
}
</style>
