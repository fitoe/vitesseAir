<script setup lang='ts'>
import type {
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineSeriesOption,
  MapSeriesOption,
  PieSeriesOption,
} from 'echarts/charts'
import type {
  // 组件类型的定义后缀都为 ComponentOption
  DatasetComponentOption,
  GridComponentOption,
  LegendComponentOption,
  TitleComponentOption,
  TooltipComponentOption,
} from 'echarts/components'
import type {
  ComposeOption,
  EChartsType,
} from 'echarts/core'
import { BarChart, LineChart, MapChart, PieChart } from 'echarts/charts'
import {
  DatasetComponent,
  GeoComponent,
  GridComponent,
  GridSimpleComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
  TitleComponent,
  TooltipComponent,
  TransformComponent,

} from 'echarts/components'
import * as echarts from 'echarts/core'

import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
// 轮廓地图数据
import linyi from '../data/map/371300.json'
// 各县区地图数据
import linyi_full from '../data/map/371300_full.json'

const props = defineProps<{ options: ECOption, autoplay?: boolean }>()
const emit = defineEmits(['mouseover'])
// 注册主题
// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | MapSeriesOption
  | TitleComponentOption
  | LegendComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>

echarts.use([TitleComponent, GridSimpleComponent, TooltipComponent, GeoComponent, MarkLineComponent, GridComponent, LegendComponent, DatasetComponent, TransformComponent, MarkPointComponent, BarChart, MapChart, LineChart, PieChart, LabelLayout, UniversalTransition, CanvasRenderer])
let chart: EChartsType
window.addEventListener('resize', () => {
  chart.resize()
})

const mainref = ref<HTMLDivElement>()
const lastemit = ref<number>(0)
onMounted(async () => {
  echarts.registerMap('linyi', linyi)
  echarts.registerMap('linyi_full', linyi_full)
  chart = echarts.init(mainref.value)
  chart.setOption({ ...props.options })
  await nextTick()
  auto()
  chart.on('mouseover', (params) => {
    if (params.componentType === 'series' && params.dataIndex !== lastemit.value) {
      lastemit.value = params.dataIndex
      emit('mouseover', params)
    }
  })
})
watchThrottled(() => props.options, (n) => {
  try {
    if (props.options)
      chart.setOption(n)
  }
  catch (e) {
    // console.log(e, n)
  }
}, { throttle: 500 })

const currentindex = ref<number>(0)
function auto() {
  // 自动播放提示
  if (props.autoplay) {
    const { pause, resume, isActive } = useIntervalFn(() => {
      chart.on('mouseover', (params) => {
        if (params.componentType === 'series' && isActive.value) {
          pause()
          cancel()
          currentindex.value = params.dataIndex
          active()
          // console.log('暂停')
        }
      })
      chart.on('mouseout', (params) => {
        if (params.componentType === 'series' && !isActive.value) {
          resume()
          // console.log('恢复')
        }
      })
      active()
      currentindex.value++
      if (currentindex.value >= props.options.series[0].data.length) {
        currentindex.value = 0
      }
    }, 2000)
  }
}

function active() {
  chart.dispatchAction({
    type: 'showTip',
    seriesIndex: 0,
    dataIndex: currentindex.value,
  })
  chart.dispatchAction({
    type: 'select',
    seriesIndex: 0,
    dataIndex: currentindex.value,
  })
}
function cancel() {
  chart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: currentindex.value,
  })
}
</script>

<template>
  <div ref="mainref" class="h-full w-full" />
</template>
