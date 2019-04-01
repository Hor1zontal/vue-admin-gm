<template>
  <div class="dashboard-container">
    <!--<div class="dashboard-text">name:{{ name }}</div>-->
    <!--<div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>-->
    <div style="display: flex">
      <div class="data_list today_head" ><span class="data_num head">当日数据：</span></div>
      <div class="data_list"><span class="data_num">{{ day.register }}</span> 新增用户</div>
      <div class="data_list"><span class="data_num">{{ day.login }}</span> 活跃用户</div>
    </div>
    <div style="display: flex">
      <div class="data_list all_head"><span class="data_num head">总数据：</span></div>
      <div class="data_list"><span class="data_num">{{ day.regTotal }}</span> 注册用户</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { dayUserData } from '@/api/log'
import { formatDate } from '@/utils/util'

export default {
  name: 'Dashboard',
  data() {
    return {
      day: {
        register: 0,
        login: 0,
        regTotal: 0
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  mounted() {
    var day = new Date()
    this.getDayData(formatDate(day))
  },
  methods: {
    getDayData(date) {
      dayUserData(date).then(response => {
        // console.log(response.data)
        const data = response.data
        this.day.login = data.active
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
