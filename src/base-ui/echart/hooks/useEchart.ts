import * as echarts from 'echarts'

// 注册地图  json是不识别的 因此我们需要去声明
import ChinaMapData from '../data/china.json'
echarts.registerMap('china', ChinaMapData)

export default function(el:HTMLElement){
  const echartsInstance = echarts.init(el)

  const setOption = (options:echarts.EChartsOption) => {
    echartsInstance.setOption(options)
  }

  window.addEventListener('resize',()=>{
    echartsInstance.resize()
  })

  return {
    echartsInstance,
    setOption
  }
}
