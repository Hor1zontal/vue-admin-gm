<template>
  <div class="dashboard-container">
    <!--<div class="dashboard-text">name:{{ name }}</div>-->
    <!--<div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>-->
    <div style="display: flex">
      <div class="data_list today_head" ><span class="data_num head">当日数据：</span></div>
      <div class="data_list"><span class="data_num">{{ day.register }}</span> 新增用户</div>
      <div class="data_list"><span class="data_num">{{ day.active }}</span> 活跃用户</div>
    </div>
    <div style="display: flex">
      <div class="data_list all_head"><span class="data_num head">总数据：</span></div>
      <div class="data_list"><span class="data_num">{{ day.regTotal }}</span> 注册用户</div>
    </div>
    <sevenDay :seven-data1="registerData" :seven-data2="activeData" :seven-day="sevenDay" :legend-data="legendData" style="padding-top: 50px"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { dayUserData } from '@/api/log'
import { formatDate } from '@/utils/util'
import sevenDay from '../../components/SevenDay'

export default {
  name: 'Dashboard',
  components: {
    sevenDay
  },
  data() {
    return {
      day: {
        register: 0,
        active: 0,
        regTotal: 0
      },
      registerData: [1, 1, 2, 5, 3, 2, 0],
      activeData: [11, 11, 15, 13, 12, 13, 10],
      sevenDay: [],
      legendData: ['注册人数', '活跃人数']
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  mounted() {
    this.initSevenDay()
    var day = new Date()
    this.getDayData(formatDate(day))
  },
  methods: {
    initSevenDay() {
      this.sevenDay = []
      // this.sevenData = [[], []]
      var data1 = new Array(7)
      var data2 = new Array(7)
      var it = 0
      for (let i = 7; i > 0; i--) {
        var curDate = new Date()
        var day = new Date(curDate.getTime() - 24 * 60 * 60 * 1000 * i)
        var format_day = formatDate(day)
        this.sevenDay.push(format_day)
        // var dayData = {
        //   active: 0,
        //   register: 0
        // }
        var that = this
        dayUserData(format_day).then(
          function(result) {
            data1[7 - i] = result.data.register
            data2[7 - i] = result.data.active
            // console.log(that.sevenData[0][7 - i], that.sevenData[1][7 - i], result.data)
            it++
            if (it === 7) {
              that.registerData = data1
              that.activeData = data2
              // console.log(data1, data2)
            }
          }
        )
      }
      // this.sevenDay = result
    },
    getDayData(date) {
      dayUserData(date).then(response => {
        // console.log(response.data)
        const data = response.data
        this.day.active = data.active
        this.day.register = data.register
        this.day.regTotal = data.total
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.data_list{
  /*padding: 30px;*/
  padding: 20px;
  margin: 20px;
  width: 200px;
  text-align: center;
  font-size: 14px;
  color: #666;
  border-radius: 6px;
  background: #E5E9F2;
  .data_num{
    color: #333;
    font-size: 26px;

  }
  .head{
    border-radius: 6px;
    font-size: 22px;
    padding: 4px 0;
    color: #fff;
    display: inline-block;
  }
}
.today_head{
  background: #FF9800;
}
.all_head{
  background: #20A0FF;
}
</style>
