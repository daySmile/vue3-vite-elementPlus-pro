<template>
  <div class="middle_left">
<!--    <vue-seamless :data="dataList" :class-option="optionSetting" class="seamless-warp">-->
<!--    </vue-seamless>-->
    <div style="width: 350px;height: 380px;overflow-y: scroll" id="middle_left"></div>

  </div>
</template>

<script>
// import vueSeamless from 'vue-seamless-scroll'
import * as echarts from 'echarts'

export default {
  name: "middleLeft",
  // components: {vueSeamless},
  data() {
    return {
      timer: null,
      dataList: [{
        name: '111'
      }]
    }
  },
  computed: {
    optionSetting() {
      return {
        step: 1, // 数值越大速度滚动越快
        limitMoveNum: 1, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }
  },
  mounted() {
    this.initEcharts()
    this.timer = setInterval(() => {
      this.initEcharts()
    }, 5000)
  },
  methods: {
    initEcharts() {
      let myChart = echarts.init(document.getElementById('middle_left'));
      let options = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          top: '3%',
          left: '3%',
          right: '6%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
          // boundaryGap: [0, 0.01]
        },
        yAxis: {
          // max: 200,
          // min: 10,
          // splitNumber: 10,
          axisTick: {
            show: false
          },
          axisLine: {
            show: true
          },
          splitLine: {
            show: false
          },
          type: 'category',
          data: [
            '表名5', '表名6', '表名7', '表名8', '表名9', '表名10', '表名11', '表名12',
          ],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#A2A3A2',
              fontSize: 18
            }
          }
        },
        series: [
          {
            type: 'bar',
            barCategoryGap: 20,
            barMinWidth: 15,
            data: [
                18203, 23489, 29034, 104970, 131744, 630230, 18203, 23489
            ],
            itemStyle: {
              normal: {
                color: '#c50',
                label: {
                  show: true,
                  position: "right",
                  textStyle: {
                    color: '#A2A3A2',
                    fontSize: 14
                  }
                }
              }
            }
          },
          {
            type: 'bar',
            barCategoryGap: 20,
            barMinWidth: 15,
            data: [
                19325, 23438, 31000, 121594, 134141, 681807, 19325, 23438
            ],
            itemStyle: {
              normal: {
                color: '#cc0',
                label: {
                  show: false,
                  position: "right",
                  textStyle: {
                    color: '#A2A3A2',
                    fontSize: 12
                  }
                }
              }
            }
          }
        ]
      }
      myChart.setOption(options, true);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>

<style scoped lang="scss">
.middle_left {
  position: absolute;
  top: 63%;
  left: 19.9%;
  width: 19.8%;
  border-radius: 2px;
  height: 34.3%;
  border: 1px solid #053FEFFF;
  margin: 16px 5px;
}
.seamless-warp {
  margin-right: 10px;
  padding: 10px;
  margin-top: 5px;
  height: 100%;
  //height: 42%;
  overflow: hidden;
  visibility: visible;
}
</style>