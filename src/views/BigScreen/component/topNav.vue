<template>
  <div class="topNav">
    <span>
      大屏页面展示
    </span>
  </div>
</template>

<script>
// import vueSeamless from 'vue-seamless-scroll'

export default {
  name: "topNav",
  // components: {
  //   vueSeamless
  // },
  data() {
    return {
      listData: [
        {
          name: '部门',
          num1: '3个',
          num2: 9,
          num3: '20%',
          children: [
            {content: '测试系统名称11'},
            {content: '测试系统名称1111111111'},
            {content: '测试系统名称1111111111'},
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称11111'},
            {content: '测试系统名称'},
            {content: '测试系统名称1111111111'},
            {content: '测试系统名称'}
          ]
        }, {
          name: '系统',
          num1: '301亿',
          num2: 9,
          num3: '20%',
          children: [
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称'}
          ]
        }, {
          name: '尺寸',
          num1: '20T',
          num2: 9,
          num3: '20%',
          children: [
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称'}
          ]
        }, {
          name: '条数',
          num1: '20T',
          num2: 9,
          num3: '20%',
          children: [
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称'}
          ]
        }, {
          name: '表数',
          num1: '203条',
          num2: 9,
          num3: '20%',
          children: [
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称'},
            {content: '测试系统名称'}
          ]
        }]
    }
  },
  computed: {
    optionSetting() {
      return {
        step: 0.4, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.topNav {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 80px;
  background: url("../../../assets/img/head_bg.png") no-repeat;
  background-position: 50% 0;
  border: none;
  overflow: hidden;
  text-align: center;


  > span {
    width:500px;
    height:200px;
    margin: 50px auto;
    font-size: 50px;
    line-height: 80px;
    font-weight: 800;
    text-decoration: #20a0ff;
    text-space: 5;
    background-image: -webkit-gradient(linear, left 0, right 100%, from(rgb(107, 154, 224)), to(rgb(55, 59, 245)));
    /*必需加前缀 -webkit- 才支持这个text值 */
    -webkit-background-clip: text;
    /*text-fill-color会覆盖color所定义的字体颜色： */
    -webkit-text-fill-color: transparent;
  }
}


</style>