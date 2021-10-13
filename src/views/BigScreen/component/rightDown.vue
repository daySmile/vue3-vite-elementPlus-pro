<template>
  <div class="middle_down">
    <div class="chart" style="width: 360px;height: 380px" id="middle_down"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts-wordcloud/dist/echarts-wordcloud';  // 词云引入
import 'echarts-wordcloud/dist/echarts-wordcloud.min';

export default {
  name: "MiddleDown",
  data() {
    return {
      timer: null
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
      let myChart = echarts.init(document.getElementById('middle_down'));
      let option = {
        series: [{
          type: 'wordCloud',
          gridSize: 5,  // 词之间的艰间距
          sizeRange: [18, 40], // 调整字大小的间距
          rotationRange: [-90, 90], // 调整词的旋转方向
          rotationStep: 45, //
          shape: 'diamond',
          width: '100%',
          textPadding: 0,
          autoSize: {
            enable: true,
            minSize: 6
          },
          // 随机生成字体颜色
          textStyle: {
            normal: {
              // textBorderColor: 'rgba(255,255,255,0.3)',
              textBorderWidth: 1,
              color: () => {
                return 'rgb(' + [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160)
                ].join(',') + ')';
                // var colors = ['#fda67e', '#81cacc', '#cca8ba', "#88cc81", "#82a0c5", '#fddb7e', '#735ba1', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
                // return colors[parseInt(Math.random() * 10)];
              },
            },
            // emphasis: {
            //   fontSize: 14,
            //   shadowBlur: 10,
            //   shadowColor: 'rgba(255,255,255, .1)'
            // }
          },
          data: [
            {
              name: '区块链',
              value: 810
            }, {
              name: '云计算',
              value: 520
            }, {
              name: "人工智能",
              value: 928
            }, {
              name: "大数据",
              value: 906
            }, {
              name: "工业互联网",
              value: 825
            }, {
              name: "医疗",
              value: 514
            }, {
              name: "质量溯源",
              value: 486
            }, {
              name: "政务",
              value: 53
            }, {
              name: "密码学",
              value: 927
            }, {
              name: "金融行业",
              value: 1308
            }, {
              name: "供应链",
              value: 693
            }, {
              name: "公有链",
              value: 611
            }, {
              name: "私有链",
              value: 512
            }, {
              name: "联盟链",
              value: 382
            }, {
              name: "数据共享",
              value: 312
            }, {
              name: "文创版权",
              value: 187
            }, {
              name: "天河链",
              value: 163
            }, {
              name: "数据存证",
              value: 104
            }, {
              name: "UDFS存储",
              value: 3
            }, {
              name: "在线教育",
              value: 31
            }, {
              name: "关联分析",
              value: 941
            }, {
              name: "智慧停车",
              value: 585
            }, {
              name: "链云生态",
              value: 473
            }, {
              name: "应用层",
              value: 358
            }, {
              name: "网络层",
              value: 246
            }, {
              name: "数据层",
              value: 207
            }, {
              name: "基础层",
              value: 194
            }, {
              name: "智能合约",
              value: 104
            }, {
              name: "去中心化",
              value: 87
            }, {
              name: "数字货币",
              value: 415
            }, {
              name: "酷屏",
              value: 253
            }, {
              name: "可视化",
              value: 211
            }, {
              name: "P2P",
              value: 116
            }, {
              name: "数据挖掘",
              value: 1309
            }]
        }]
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
.middle_down {
  position: absolute;
  top: 64%;
  right: 0;
  width: 19.65%;
  border-radius: 2px;
  height: 34.3%;
  border: 1px solid #053FEFFF;
  margin: 5px 5px;
}

.el-carousel__item {
  margin-top: 5px;
  width: 100%;
  height: 120%;

  ul > li {
    text-align: center;
    color: #475669;
    font-size: 24px;
    opacity: 1;
    line-height: 80px;
  }
}
.el-carousel__indicators--outside{
  display: none;
}
.el-carousel__arrow--left {
  display: none !important;
}
.el-carousel__arrow--right {
  display: none !important;
}
</style>