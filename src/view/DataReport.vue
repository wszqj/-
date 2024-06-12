<template>
  <el-card class="page-container">
    <!--    按钮-->
    <div style="float: right; width: 250px; height: 150px">
      <el-button :color="buttonColor" @click="buttonColor='blue'">近7天</el-button>
      <el-button :color="buttonColor" @click="buttonColor='blue'">近30天</el-button>
    </div>
    <!--    数据-->
    <div style="float: left;width: 1130px; height:600px; margin-top: 20px">
      <div ref="chartRef1" style="float: left;width: 1130px; height:600px;"></div>
    </div>
  </el-card>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import * as echarts from 'echarts/core';
import {GridComponent} from 'echarts/components';
import {BarChart} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';
import {useTokenStore} from "@/stores/token.js";
import router from "@/router/index.js";
import {ElMessage} from "element-plus";
const userTokenStore = useTokenStore()
if (userTokenStore.token===''){
  ElMessage.error("请先登录！")
  router.push('/login')
}
// 日期集合模型
const reportModel = ref({
  dateList: ['2024-03-19','2024-03-20','2024-03-21','2024-03-22','2024-03-23','2024-03-24','2024-03-25'],
  turnoverList: [350,220,100,200,100,220,350]
})
// 按钮的底色
const buttonColor=ref('');

echarts.use([GridComponent, BarChart, CanvasRenderer]);

const chartRef1 = ref(null);
let myChart1 = null;

onMounted(() => {
  myChart1 = echarts.init(chartRef1.value);
  setOption1();
});

onUnmounted(() => {
  if (myChart1) {
    myChart1.dispose();
  }
});

const setOption1 = () => {
  const option1 = {
    title: {
      text: '图书外借（本）'
    },
    xAxis: {
      type: 'category',
      data: reportModel.value.dateList
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'axis'
    },
    series: [
      {
        data: reportModel.value.turnoverList,
        type: 'line'
      }
    ]
  };
  myChart1.setOption(option1);
};
</script>

<style scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;
  background-color: #F8FBFE;
  border-radius: 25px;
  z-index: 1;
}
button {
  padding: 1.3em 3em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
}

button:hover {
  background-color: #23c483;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-7px);
}

button:active {
  transform: translateY(-1px);
}
</style>