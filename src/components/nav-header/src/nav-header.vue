<template>
  <div class="nav-header">
    <div class="left">
      <el-icon @click="handleCollapseChange" size="32px">
        <component :is="isCollapse ? 'fold' : 'expand'" />
      </el-icon>
      <hy-breadcrumb :breadcrumbs="breadcrumbs"></hy-breadcrumb>
    </div>
    <user-info></user-info>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

import HyBreadcrumb, { IBreadcrumb } from '@/base-ui/breadcrumb'
import userInfo from './user-info.vue'

import { pathMapBreadcrumb } from '@/utils/mapMenusToRoutes'
import UserInfo from './user-info.vue'

const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['collapseChange'])
const handleCollapseChange = () => {
  emit('collapseChange')
}

//添加响应式
const breadcrumbs = computed<IBreadcrumb[]>(() => {
  const route = useRoute()
  const currentPath = route.path
  const store = useStore()
  const userMenus: IBreadcrumb[] = store.state.login.userMenus
  return pathMapBreadcrumb(userMenus, currentPath)
})
// const route = useRoute()
// const currentPath = route.path
// const store = useStore()
// const userMenus:IBreadcrumb[] = store.state.login.userMenus
// const breadcrumbs: IBreadcrumb[] = pathMapBreadcrumb(userMenus,currentPath)
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  .left{
    display: flex;
    align-items: center;
  }
}
</style>
