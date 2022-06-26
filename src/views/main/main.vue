<template>
  <div>
      <div class="common-layout">
    <el-container>
      <el-aside :width="!isCollapse?'200px':'70px'">
        <nav-menu :is-collapse="isCollapse"></nav-menu>
      </el-aside>
      <el-container>
        <el-header>
          <nav-header :is-collapse="isCollapse" @collapse-change="handleCollapseChange"></nav-header>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import NavHeader from '@/components/nav-header';
import NavMenu from '@/components/nav-menu';

const isCollapse = ref(false)
const handleCollapseChange = () => {
  isCollapse.value = !isCollapse.value
}


</script>

<style
  components: { navMenu }, scoped>
  .el-aside{
    /* width: 70px; */
    min-height: 100vh;
    background-color: #041527;
    text-align: center;
  }
  .el-header{
    background-color: #fff;
    align-items: center;
  }
  .el-main{
    background-color: #f0f0f0;
  }
</style>

