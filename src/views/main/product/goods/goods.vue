<template>
  <div class="goods">
    <page-content :content-table-config="contentTableConfig" pageName="goods">
      <template #imgUrl="scope">
        <el-image
          :src="scope.row.imgUrl"
          style="width: 60px; height: 60px"
          :preview-src-list="[scope.row.imgUrl]"
        >
        </el-image>
      </template>
      <template #oldPrice="scope">{{'¥'+scope.row.oldPrice}}</template>
      <template #newPrice="scope">{{'¥'+scope.row.newPrice}}</template>
    </page-content>
  </div>
</template>

<script setup lang="ts">
import pageContent from '@/components/page-content'

import { contentTableConfig } from './config/page-content'
</script>

<style scoped>
</style>
