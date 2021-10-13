<template>
  <div class="home-container">
    <div class="wrap" ref="editor">
      <top-nav/>
      <left-top/>
      <left-part/>
      <middle-center/>
      <middle-left/>
      <middle-right/>
      <right-top/>
      <right-middle/>
      <right-dowm/>
    </div>
  </div>
</template>

<script>
import {screenSize} from '../../utils/screenUtils.js'
import TopNav from './component/topNav.vue'
import LeftPart from './component/leftPart.vue'
import MiddleCenter from './component/middleCenter.vue'
import MiddleLeft from './component/middleLeft.vue'
import MiddleRight from './component/middleRight.vue'
import RightTop from './component/rightTop.vue'
import RightMiddle from './component/rightMiddle.vue'
import RightDowm from './component/rightDown.vue'
import LeftTop from './component/leftTop.vue'

export default {
  name: "index",
  components: {
    TopNav,
    LeftPart,
    MiddleCenter,
    MiddleLeft,
    MiddleRight,
    RightTop,
    RightMiddle,
    RightDowm,
    LeftTop
  },
  data() {
    return {
      cardItems: []
    }
  },
  mounted() {
    screenSize(this.$refs.editor);
  }
}
</script>

<style scoped lang="scss">
.home-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: unset;

  .wrap {
    transform-origin: 0px 0px 0px;
    background: url(../../assets/img/bj.jpg) no-repeat;
    background-size: contain;
    background-position: 50% 0;
    //background-color: rgb(0, 0, 0);
    min-width: auto;
    width: 1920px;
    min-height: auto;
    height: 1080px;
    overflow: scroll;
  }
}
</style>