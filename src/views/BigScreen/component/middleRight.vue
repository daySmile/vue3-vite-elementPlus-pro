<template>
  <div class="middle_right">
    <div style="width: 750px;height: 380px" id="middle_right"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: "middleRight",
  data() {
    return {
      timer: null,
      option: null,
      xData:['系统名称一', '系统名称一', '系统名称一', '系统名称一', '系统名称一', '系统名称一', '系统名称一'],
      setBarColor: [90, 149, 170, 140, 105, 176, 120],
      data2: [146, 159, 190, 186, 128, 170, 160],
      data3: [96, 49, 80, 76, 108, 110, 120],
      currentStyle: {

        itemStyle: {
          // color: '#FFFF0B',
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgb(235,243,17)' },
            { offset: 0.2, color: 'rgba(235,243,17,0.5)' },
            { offset: 1, color: 'rgba(20,200,212,0)' }
          ]),
        }
      },
      lineStyle: {
        symbolSize: 20,
        symbol: 'circle',
        itemStyle: {
          color: '#fff'
        }
      }
    }
  },
  mounted() {
    this.initEchartsFn()
  },
  methods: {
    initEchartsFn() {
      this.initEcharts(this.xData, this.setBarColor, this.data2, this.data3)
      let num = 0
      this.timer = setInterval(() => {
        this.option = null
        let arr = this.setBarColor
        let arr2 = this.data2
        let arr3 = this.data3
        let list = JSON.parse(JSON.stringify(arr))
        let list2 = JSON.parse(JSON.stringify(arr2))
        let list3 = JSON.parse(JSON.stringify(arr3))
        arr = list
        arr2 = list2
        arr3 = list3
        for (let i = 0; i < arr.length; i++) {
          if (num == i) {
            arr[i] = {value: arr[i], ...this.currentStyle}
            arr2[i] = {value: arr2[i], ...this.lineStyle}
            arr3[i] = {value: arr3[i], ...this.lineStyle}
          }
        }
        this.initEcharts(this.xData,arr, arr2, arr3)
        num++
        if (num == arr.length) {
          num = 0
        }
      }, 5000)
    },
    initEcharts(xData, barData,data2, data3) {
      let myChart = echarts.init(document.getElementById('middle_right'));
      this.option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          // orient: 'vertical',
          x: 'right',
          y: 'top',
          data: ['数据尺寸', '记录数', '表数'],
          textStyle: { //图例文字的样式
            color: '#fff',
            fontSize: 18
          },
        },
        grid: {
          top: '15%',
          left: '2%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xData,
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              show: true,
              interval: 0,
              rotate: 20,
              textStyle: {
                color: '#A2A3A2',
                fontSize: 16
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            // name: 'Precipitation',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              show: true
            },
            axisTick: {
              show: true
            },
            axisLine: {
              show: true
            },
            splitLine: {
              show: true
            }
          },
          {
            type: 'value',
            // name: 'Temperature',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              show: true
            },
            axisTick: {
              show: true
            },
            axisLine: {
              show: true
            },
            splitLine: {
              show: true
            }
          }
        ],
        series: [
          {
            name: '数据尺寸',
            type: 'bar',
            barMaxWidth: 25,
            data: barData,
            z: -12,
            itemStyle: {
              normal: {
                // color: '#053FEFFF',
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgba(20,200,212,0.9)' },
                  { offset: 0.2, color: 'rgba(20,200,212,0.5)' },
                  { offset: 1, color: 'rgba(20,200,212,0)' }
                ]),
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: '#053FEFFF',
                    fontSize: 18
                  }
                }
              }
            }
          },
          {
            name: '记录数',
            type: 'line',
            data: data2,
            // label: {
            //   normal: {
            //     show: true,
            //     position: 'top',
            //     offset: [10, 0],
            //     textStyle: {//拐点上标字体大小颜色
            //       color: '#ff9c35',
            //       fontSize: '18',
            //     }
            //   }
            // },
            // smooth: true,//折点是圆弧状的
            showSymbol: true,
            symbol: 'emptyCircle',     //折点设定为实心点
            symbolSize: 10,   //设定实心点的大小
            hoverAnimation: true,
            itemStyle: {
              normal: {
                color: '#FB0007', //折点颜色
                lineStyle: {
                  width: 3, //设置线条粗细
                  color: '#ff9c35' //折线颜色
                }
              }
            }
          },
          {
            name: '表数',
            type: 'line',
            // yAxisIndex: 1,
            data: data3,
            // smooth: true,//折点是圆弧状的
            showSymbol: true,
            symbol: 'emptyCircle',     //折点设定为实心点
            symbolSize: 10,   //设定实心点的大小
            hoverAnimation: false,
            itemStyle: {
              normal: {
                color: '#ff9c35', //折点颜色
                lineStyle: {
                  width: 3, //设置线条粗细
                  color: '#F6000B' //折线颜色
                }
              }
            }
          }
        ]
      }
      myChart.setOption(this.option, true);
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
.middle_right {
  position: absolute;
  top: 63%;
  left: 40%;
  width: 39.5%;
  border-radius: 2px;
  height: 34.3%;
  border: 1px solid #053FEFFF;
  //background-color: #ffffff;
  margin: 16px 5px;
}
</style>