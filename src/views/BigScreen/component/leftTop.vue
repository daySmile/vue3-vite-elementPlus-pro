<template>
  <div class="left_top">
    <div style="width: 400px;height: 630px;overflow-y: scroll" id="left_top"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "middleLeft",
  data() {
    return {
      timer: null,
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
      let myChart = echarts.init(document.getElementById('left_top'));
      let option = {
        legend: {},
        tooltip: {
          trigger: 'axis',
          showContent: false
        },
        dataset: {
          source: [
            ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
            ['Milk Tea', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
            ['Matcha Latte', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
            ['Cheese Cocoa', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
            ['Walnut Brownie', 25.2, 37.1, 41.2, 18, 33.9, 49.1]
          ]
        },
        xAxis: { type: 'category' },
        yAxis: { gridIndex: 0 },
        grid: { top: '55%' },
        series: [
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
          },
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
          },
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
          },
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
          },
          {
            type: 'pie',
            id: 'pie',
            radius: '30%',
            center: ['50%', '25%'],
            emphasis: {
              focus: 'self'
            },
            label: {
              formatter: '{b}: {@2012} ({d}%)'
            },
            encode: {
              itemName: 'product',
              value: '2012',
              tooltip: '2012'
            }
          }
        ]
      };

      myChart.on('updateAxisPointer', function (event) {
        const xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
          const dimension = xAxisInfo.value + 1;
          myChart.setOption({
            series: {
              id: 'pie',
              label: {
                formatter: '{b}: {@[' + dimension + ']} ({d}%)'
              },
              encode: {
                value: dimension,
                tooltip: dimension
              }
            }
          });
        }
      });
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
.left_top {
  position: absolute;
  top: 80px;
  left: 0;
  width: 19.7%;
  border-radius: 2px;
  height: 56%;
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