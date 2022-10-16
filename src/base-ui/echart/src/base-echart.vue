<template>
  <div class="base-echart">
    <div ref="echartsDivRef" :style="{width,height}"></div>
  </div>
</template>

<script setup lang="ts">
 import {onMounted, ref,defineProps,withDefaults, watchEffect} from 'vue'
 import useEchart from '../hooks/useEchart'
 import { EChartsOption } from 'echarts'

 const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
 )


 const echartsDivRef = ref<HTMLElement>()

 onMounted(()=>{
  const {setOption} = useEchart(echartsDivRef.value!)//非空类型断言

  watchEffect(()=>{
    setOption(props.options)
  })


 })
</script>

<style scoped>

</style>
