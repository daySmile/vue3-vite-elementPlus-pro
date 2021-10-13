<template>
  <div class="left_part">
    <div style="width: 380px;height: 370px;overflow-y: scroll" id="left_part"></div>

  </div>
</template>

<script>
import * as echarts from 'echarts';

// Generate data
let category = [];
let dottedBase = +new Date();
let lineData = [];
let barData = [];
for (let i = 0; i < 10; i++) {
  let date = new Date((dottedBase += 3600 * 24 * 1000));
  category.push(
      [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-')
  );
  let b = Math.random() * 200;
  let d = Math.random() * 200;
  barData.push(b);
  lineData.push(d + b);
}

export default {
  name: "middleLeft",
  // components: {vueSeamless},
  data() {
    return {
      timer: null
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
      let myChart = echarts.init(document.getElementById('left_part'));
      // option
      let option = {
        // backgroundColor: '#0f375f',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['line', 'bar'],
          textStyle: {
            color: '#ccc',
            fontSize: 18
          }
        },
        xAxis: {
          data: category,
          axisLabel: {
            show: true,
            interval: 0,
            rotate: 40,
            textStyle: {
              color: '#A2A3A2',
              fontSize: 14
            }
          },
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          }
        },
        yAxis: {
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          }
        },
        series: [
          {
            name: 'line',
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 15,
            data: lineData
          },
          {
            name: 'bar',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              borderRadius: 5,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#14c8d4' },
                { offset: 1, color: '#43eec6' }
              ])
            },
            data: barData
          },
          {
            name: 'line',
            type: 'bar',
            barGap: '-100%',
            barWidth: 10,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(20,200,212,0.5)' },
                { offset: 0.2, color: 'rgba(20,200,212,0.2)' },
                { offset: 1, color: 'rgba(20,200,212,0)' }
              ])
            },
            z: -12,
            data: lineData
          },
          {
            name: 'dotted',
            type: 'pictorialBar',
            symbol: 'rect',
            itemStyle: {
              color: '#0f375f'
            },
            symbolRepeat: true,
            symbolSize: [12, 4],
            symbolMargin: 1,
            z: -10,
            data: lineData
          }
        ]
      };

      myChart.setOption(option, true);
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
.left_part {
  position: absolute;
  top: 64%;
  left: 0;
  width: 19.7%;
  border-radius: 2px;
  height: 34.3%;
  //background-color: #ffffff;
  border: 1px solid #053FEFFF;
  margin: 5px 3px;

  .seamless-warp {
    margin-left: 10px;
    padding: 10px;
    margin-top: 10px;
    height: 97%;
    overflow: hidden;
    visibility: visible;
    color: #094EC0;

    .first_level {
      font-size: 24px;
      height: 40px;
      line-height: 40px;
    }

    .second_level {
      margin-left: 5%;
      font-size: 20px;
      height: 40px;
      line-height: 40px;
    }

    .third_level {
      margin-left: 10%;
      font-size: 18px;
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>