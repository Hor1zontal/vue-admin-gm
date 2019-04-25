<template>
  <div id="line1" style="width: 80%; height: 400px"/>
</template>

<script>
import echarts from 'echarts/lib/echarts'
// import PropTypes from 'prop-types'
// 引入柱状图
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/markLine'
export default {
  // npm install --save src/components/Sevenday/index.vue
  props: {
    // sevenData: [1, -2, 2, 5, 3, 2, 0],
    // sevenX: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    // legendData: ['最高温度', '最低温度']
    sevenData1: {
      type: Array,
      default: () => { return [] }
    },
    sevenData2: {
      type: Array,
      default: () => { return [] }
    },
    sevenDay: {
      type: Array,
      default: () => { return ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] }
    },
    legendData: {
      type: Array,
      default: () => { return ['第一条线', '第二条线'] }
    }
  },
  watch: {
    sevenData1: {
      handler(newName, oldName) {
        this.initData()
      }
    },
    sevenData2: {
      handler(newName, oldName) {
        this.initData()
      }
    },
    sevenDay: {
      handler(newName, oldName) {
        this.initData()
      }
    }
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById('line1'))
    this.initData()
  },
  methods: {
    initData() {
      const option = {
        title: {
          text: '',
          subtext: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.legendData
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.sevenDay
          // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} 人'
          }
        },
        series: [
          {
            name: this.legendData[0],
            type: 'line',
            data: this.sevenData1,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
            // smooth: true
          },
          {
            name: this.legendData[1],
            type: 'line',
            data: this.sevenData2,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          }
        ]
      }
      this.myChart.setOption(option)
    }
  }
}
</script>
