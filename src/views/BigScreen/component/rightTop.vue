<template>
  <div class="right_top">
    <div style="width: 230px;height: 230px;" id="right_top"></div>
    <div style="width: 250px;text-align: center;font-size: 20px;color: #c50">部门构成图</div>
    <div class="legent_style">
      <ul>
        <li>
          <div style="background: #c50"></div>
          <span>数据尺寸</span>
        </li>
        <li>
          <div style="background: #094EC0"></div>
          <span>记录数</span>
        </li>
        <li>
          <div style="background: #c00"></div>
          <span>表数</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: "rightTop",
  data() {
    return {
      data: [
        {
          name: 'Grandpa',
          value: 10,
          itemStyle: {
            color: '#c00'
          },
          children: [
            {
              name: 'Father',
              value: 20,
              itemStyle: {
                color: '#094EC0'
              },
              children: [
                {
                  name: 'son2',
                  value: 10,
                  itemStyle: {
                    color: '#c50'
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  },
  mounted() {
    this.getEchartRight1();
    this.timer = setInterval(() => {
      this.getEchartRight1();
    }, 5000)
  },
  methods: {
    getEchartRight1() {
      let myChart = echarts.init(document.getElementById('right_top'));
      let option = {
        grid: {
          top: '3%',
          left: '0%',
          right: '0%',
          bottom: '6%',
          containLabel: true
        },
        series: {
          type: 'sunburst',
          data: this.data,
          radius: [0, '75%'],
          itemStyle: {
            borderRadius: 0,
            borderWidth: 0
          },
          label: {
            show: false
          }
        }
      }

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
.right_top {
  position: absolute;
  top: 80px;
  right: 0;
  width: 19.65%;
  border-radius: 2px;
  height: 25%;
  border: 1px solid #053FEFFF;
  margin: 5px 5px;

  .legent_style {
    font-size: 16px;
    position: absolute;
    right: 0%;
    bottom: 20px;
    width: 30%;

    ul {
      li {
        height: 25px;
        line-height: 10px;
        display: flex;
        > div {
          width: 20px;
          height: 10px;
          line-height: 40px;
          margin-right: 10px;
        }
        > span {
          font-size: 20px;
          color: #fff;
        }
      }
    }
  }
}
</style>