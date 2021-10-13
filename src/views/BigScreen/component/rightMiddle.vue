<template>
  <div class="right_middle">
    <div style="width: 370px;height: 320px;" id="right_middle"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: "rightMiddle",
  data() {
    return {
      timer: null,
      data: [
        {
          category: "bgColor",
          name: "侯亮平",
          symbolSize: 50
        }, {
          name: "李达康",
          category: "bgColor",
          symbolSize: 60
        }, {
          name: "祁同伟",
          category: "bgColor",
          symbolSize: 70
        }, {
          name: "祁同伟2",
          category: "bgColor",
          symbolSize: 80
        }, {
          name: "祁同伟3",
          category: "bgColor",
          symbolSize: 90
        }],
      links: [
        {
          source: "李达康",
          target: "侯亮平"
        }, {
          source: "高育良",
          target: "祁同伟"
        }, {
          source: "赵立春",
          target: "高育良"
        }, {
          source: "赵立春",
          target: "赵瑞龙"
        }],
    }
  },
  mounted() {
    this.getEchartRight1(this.data, this.links);
    this.timer = setInterval(() => {
      this.getEchartRight1(this.data, this.links);
    }, 5000)
  },
  methods: {
    getEchartRight1(data, line) {
      var myChart = echarts.init(document.getElementById("right_middle"));
      // let that = this
      let option = {
        tooltip: {
          enterable: true,//鼠标是否可进入提示框浮层中
          formatter: function(params) {
            if (params.componentType === "series") {
              if (params.seriesType === "graph") {
                if (params.dataType === "edge") {
                  // 点击到了 graph 的 edge（边）上。
                } else {
                  // params.data.category = 'bgHover'

                  let dataIndex = params.dataIndex;
                  option.series[0].data[dataIndex].category = "bgHover";
                  myChart.setOption(option);
                }
              }
            }
          }
        },
        animationDuration: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph",
            layout: "force",
            focusNodeAdjacency: false,
            roam: true,
            edgeSymbolSize: [4, 10],
            draggable: true,
            edgeSymbol: ["circle", "none"], // 边两端的标记类型，可以是一个数组分别指定两端，也可以是单个统一指定。默认不显示标记，常见的可以设置为箭头
            cursor: "pointer",
            force: {
              repulsion: [100, 200], //节点之间的斥力因子,支持设置成数组表达斥力的范围
              edgeLength: [60, 100],
              layoutAnimation: true,
              friction: 0.1 //节点的移动速度。取值范围 0 到 1。
            },
            itemStyle: {
              emphasis: {
                scale: true,
                focus: "adjacency"
              }
            },
            labelLayout: {
              moveOverlap: "shiftX", //在标签重叠的时候是否挪动标签位置以防止重叠。
              draggable: true //标签是否可以允许用户通过拖拽二次调整位置。
            },
            lineStyle: {
              color: "#094EC0",
              width: 1,
              opacity: 1,
              curveness: 0 //关系线的曲度，支持从 0 到 1 的值，值越大曲度越大。
            },
            edgeLabel: {
              normal: {
                show: false,  // 去掉线上的标记
                formatter: function(x) {
                  return x.data.name;
                }
              }
            },
            categories: [
              {
                name: "bgColor",
                itemStyle: {
                  normal: {
                    color: "#094EC0"
                  }
                }
              }, {
                name: "bgHover",
                itemStyle: {
                  normal: {
                    color: "#eb0d0d"
                  }
                }
              }
            ],
            label: {
              show: true, // 图形上的文本标签， 可用于说明图形的一些数据信息， 比如值， 名称等
              fontSize: 14,
              color: "#fff", //如果设置为 'inherit'，则为视觉映射得到的颜色，如系列色。
              width: 100,
              overflow: "break" //文字超出宽度是否截断或者换行。配置width时有效
            },
            data: data,
            links: line
          }]
      };

      myChart.setOption(option);

      // 鼠标离开事件
      myChart.on("mouseout", function(param) {
        let dataIndex2 = param.dataIndex;
        option.series[0].data[dataIndex2].category = "bgColor";
        myChart.setOption(option);

        // that.$nextTick(() => {
        //   that.$emit('outNodeInfo', param)
        // })
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>

<style scoped lang="scss">
.right_middle {
  position: absolute;
  top: 33%;
  right: 0;
  width: 19.65%;
  border-radius: 2px;
  height: 30.35%;
  border: 1px solid #053FEFFF;
  margin: 5px 5px;
}
</style>