<template>
  <div class="menu">
    <page-content :content-table-config="contentTableConfig" page-name="menu"></page-content>
  </div>
</template>

<script setup lang="ts">

import pageContent from '@/components/page-content'

import {contentTableConfig} from './config/page-content'
</script>

<style scoped></style>
