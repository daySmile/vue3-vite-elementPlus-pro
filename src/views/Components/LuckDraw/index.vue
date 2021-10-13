<template>
  <div class='LuckDraw'>
    <div class='info'>
      <el-divider content-position='left'>Luck Draw</el-divider>
      <span style='text-align: left'>九宫格，地址：
      <a href="https://xuliangzhan_admin.gitee.io/vxe-table/v4/table/start/quick">
       Luck Draw
      </a>
      </span>
    </div>
    <el-row>
      <el-col :offset='1' :span='22'>
        <div class='grid-content bg-purple-dark' style="display: flex">
          <el-card class='box-card'>
            <template #header>
              <div class='card-header'>
                <span>demo</span>
                <div></div>
              </div>
            </template>
            <LuckyWheel
                ref="LuckyWheel"
                width="200px"
                height="200px"
                :blocks="blocks"
                :prizes="prizes"
                :buttons="buttons"
                :default-config="defaultConfig"
                @start="startCallBack"
                @end="endCallBack"
            />
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {LuckyWheel, LuckyGrid} from 'vue-luck-draw/vue3'
import {reactive, toRefs, ref} from "vue";

export default {
  name: "index",
  components: {LuckyWheel, LuckyGrid},
  setup() {
    const state = reactive({
      prizes: [
        {fonts: [{text: '0'}], background: '#f8d384'},
        {fonts: [{text: '1'}], background: '#f9e3bb'},
        {fonts: [{text: '2'}], background: '#f8d384'},
        {fonts: [{text: '3'}], background: '#f9e3bb'},
        {fonts: [{text: '4'}], background: '#f8d384'},
        {fonts: [{text: '5'}], background: '#f9e3bb'},
      ],
      defaultStyle: {
        fontColor: '#d64737',
        fontSize: '14px'
      },
      blocks: [{padding: '10px', background: '#d64737'}],

      buttons: [
        {radius: '50px', background: '#d64737'},
        {radius: '45px', background: '#fff'},
        {radius: '41px', background: '#f6c66f', pointer: true},
        {
          radius: '35px', background: '#ffdea0',
          fonts: [{text: 'start', top: -10}]
          // imgs: [{ src: import('@/assets/img/img.jpg'), width: '65%', top: '-50%' }]
        }
      ],
    })

    const LuckyWheel = ref()
    const startCallBack = () => {
      LuckyWheel.value.play()
      setTimeout(() => {
        LuckyWheel.value.stop(Math.random() * 8 >> 0)
      }, 3000)
    }
    const endCallBack = (prize) => {
      alert(`恭喜你获得${prize.fonts[0].text}`)
    }

    return {
      LuckyWheel,
      ...toRefs(state),
      endCallBack,
      startCallBack
    }
  }
}
</script>

<style lang="scss" scoped>
.LuckDraw {
  margin-top: 20px;

  .demo-ruleForm {
    text-align: left;
  }

  .info {
    text-align: left;
    padding-left: 20px;
    margin-bottom: 20px;
    font-size: 12px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    width: 100%;
  }
}

</style>