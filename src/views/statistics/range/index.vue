<template>
  <div class="activity" style="padding:30px">
    <div class="block" style="padding:20px;">
      <span class="demonstration">用户注册的时间：</span>
      <el-date-picker
        v-model="value1"
        :picker-options="pickerOptions"
        align="right"
        type="date"
        placeholder="选择日期"/>
    </div>
    <div class="block" style="padding:20px;">
      <span class="demonstration">最近活跃的时间：</span>
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
      <span class="demonstration">注册人数：</span>
      <el-tag type="success">{{ data1 }}</el-tag>
    </div>
    <div style="padding:20px;">
      <span class="demonstration">活跃人数：</span>
      <el-tag type="success">{{ data2 }}</el-tag>
    </div>
  </div>
</template>
