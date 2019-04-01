<template>
  <div class="activity" style="padding:30px">
    <div class="block" style="padding:20px">
      <span class="demonstration">上次活跃的时间</span>
      <el-date-picker
        v-model="value1"
        :picker-options="pickerOptions"
        align="right"
        type="date"
        placeholder="选择日期"/>
    </div>
    <div class="block" style="padding:20px">
      <span class="demonstration">最近活跃的时间</span>
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
    <div style="padding:20px;">
      <span class="demonstration">上次活跃人数：</span>
      <el-tag type="success">{{ data1 }}</el-tag>
    </div>
    <div style="padding:20px;">
      <span class="demonstration">最近活跃人数：</span>
      <el-tag type="success">{{ data2 }}</el-tag>
    </div>
  </div>
</template>

<script>
// import { util } from '@/api/util'
import { remainActivity } from '@/api/log'
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
      data2: 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    searchOnClick: function() {
      console.log('onClick')
      var last_active = formatDate(this.value1)
      var active = formatDate(this.value2)
      console.log(last_active, active)
      remainActivity(last_active, active).then(response => {
        // console.log(response.data)
        const data = response.data
        this.data1 = data.last_active_count
        this.data2 = data.active_count
      })
    },
    init() {
    }
  }
}
</script>
