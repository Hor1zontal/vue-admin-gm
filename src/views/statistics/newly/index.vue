<template>
  <div class="activity" style="padding:30px">
    <div class="block" style="padding:20px;">
      <span class="demonstration">start time：</span>
      <el-date-picker
        v-model="value1"
        :picker-options="pickerOptions"
        align="right"
        type="date"
        placeholder="选择日期"/>
    </div>
    <div class="block" style="padding:20px;">
      <span class="demonstration">end time：</span>
      <el-date-picker
        v-model="value2"
        :picker-options="pickerOptions"
        align="right"
        type="date"
        placeholder="选择日期"/>
    </div>
    <div style="padding:20px;">
      <el-button type="primary" autofocus plain @click="searchOnClick()" >查询</el-button>
    </div>
    <!--<div style="padding:20px;">-->
    <!--<span class="demonstration">注册人数：</span>-->
    <!--<el-tag type="success">{{ data1 }}</el-tag>-->
    <!--</div>-->
    <!--<div style="padding:20px;">-->
    <!--<span class="demonstration">活跃人数：</span>-->
    <!--<el-tag type="success">{{ data2 }}</el-tag>-->
    <!--</div>-->
    <div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column prop="date" label="日期"/>
        <el-table-column prop="first" label="第一天"/>
        <el-table-column prop="second" label="第二天"/>
        <el-table-column prop="third" label="第三天"/>
        <el-table-column prop="forth" label="第四天"/>
        <el-table-column prop="fifth" label="第五天"/>
        <el-table-column prop="sixth" label="第六天"/>
        <el-table-column prop="seventh" label="第七天"/>
      </el-table>
    </div>
  </div>
</template>

<script>
import { remainNewly } from '@/api/log'
// import util from '@/utils/util'
import { formatDate } from '@/utils/util'
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      value1: '',
      value2: '',
      data1: 0,
      data2: 0,
      tableData: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    searchOnClick() {
      // var reg = formatDate(this.value1)
      // var active = formatDate(this.value2)
      // remainNewly(reg, active).then(response => {
      //   const data = response.data
      //   this.data1 = data.reg_count
      //   this.data2 = data.active_count
      // })
      // var startDate = formatDate(this.value1)
      // var endDate = formatDate(this.value2)
      this.tableData = []
      this.searchRange(this.value1, this.value2)
    },
    async searchRange(startTime, endTime) {
      for (let i = 0; ; i++) {
        var searchTime = new Date(startTime.getTime() + 24 * 60 * 60 * 1000 * i)
        var respData = await this.searchOneDay(searchTime)
        this.tableData.push(respData)
        if (formatDate(searchTime) === formatDate(endTime)) {
          break
        }
      }
    },
    async searchOneDay(startTime) {
      var reg = formatDate(startTime)
      // var curDate = new Date()
      var ite = 0
      var newly_rate = new Array(5)
      for (let i = 1; i <= 7; i++) {
        var day = new Date(startTime.getTime() + 24 * 60 * 60 * 1000 * i)
        var active = formatDate(day)
        // console.log(reg, active)
        var response = await remainNewly(reg, active)
        var rate = 0
        if (response.data.active_count !== 0) {
          rate = response.data.active_count / response.data.reg_count
        }
        var ratePercent = Number(rate * 100).toFixed(1) + '%'
        newly_rate[i - 1] = ratePercent
        ite++
        if (ite === 7) {
          // console.log(this.tableData)
          // this.tableData.push()
          return {
            date: reg,
            first: newly_rate[0],
            second: newly_rate[1],
            third: newly_rate[2],
            forth: newly_rate[3],
            fifth: newly_rate[4],
            sixth: newly_rate[5],
            seventh: newly_rate[6]
          }
        }
      }
    },
    init() {
    }
  }
}
</script>
