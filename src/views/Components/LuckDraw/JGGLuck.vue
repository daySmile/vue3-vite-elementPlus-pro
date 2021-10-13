<template>
  <div class='LuckDraw'>
    <div class='info'>
      <el-divider content-position='left'>Luck Draw</el-divider>
      <span style='text-align: left'>幸运大转盘，地址：
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
            <lucky-grid
                ref="LuckDraw"
                width="300px"
                height="300px"
                :prizes="prizes"
                :buttons="buttons"
                :blocks="blocks"
                :default-config="defaultConfig"
                :default-style="defaultStyle"
                :active-style="activeStyle"
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
import {LuckyGrid} from 'vue-luck-draw/vue3'
import {reactive, toRefs, ref, onMounted, computed} from "vue";

export default {
  name: "index",
  components: {LuckyGrid},
  setup() {
    const state = reactive({
      blocks: [
        {padding: '15px', background: '#ffc27a', borderRadius: 28},
        {padding: '4px', background: '#ff4a4c', borderRadius: 23},
        {padding: '4px', background: '#ff625b', borderRadius: 20},
      ],
      prizes: [],
      defaultConfig: {
        gutter: 5,
      },
      defaultStyle: {
        borderRadius: 15,
        fontColor: '#DF424B',
        fontSize: '14px',
        textAlign: 'center',
        background: '#fff',
        shadow: '0 5 1 #ebf1f4'
      },
      activeStyle: {
        background: 'linear-gradient(270deg, #FFDCB8, #FDC689)',
        shadow: ''
      },
      buttons: [{x: 1, y: 1, col: 1, fonts: [{text: '抽奖按钮', top: 30}]}],
    })

    const buttons = computed(() => {
      return [{
        x: 1,
        y: 1,
        background: 'linear-gradient(270deg, #FFDCB8, #FDC689)',
        shadow: '0 5 1 #e89b4f',
        fonts: [
          {text: `${state.luckyNum} 次`, fontColor: '#fff', top: '73%', fontSize: '11px'},
        ],
        imgs: [
          // { src: require('./img/button.png'), width: '65%', top: '13%' },
          // { src: require('./img/btn.png'), width: '50%', top: '73%' }
        ]
      }]
    })

    onMounted(() => {
      getPrizeList()
    })

    const getPrizeList = () => {
      // 模拟接口请求奖品列表
      setTimeout(() => {
        const data = [
          {name: '1元红包'},
          {name: '100元红包'},
          {name: '0.5元红包'},
          {name: '2元红包'},
          {name: '10元红包'},
          {name: '50元红包'},
          {name: '0.3元红包'},
          {name: '5元红包'}
        ]
        const prizes = []
        state.luckyNum = 1
        let axis = [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [1, 2], [0, 2], [0, 1]]
        for (let i = 0; i < 8; i++) {
          let item = data[i]
          prizes.push({
            index: i, x: axis[i][0], y: axis[i][1],
            fonts: [{text: item.name, top: '45%'}],
            // imgs: [{src: item.img, width: '55%', top: '8%'}]
          })
        }
        state.prizes = prizes
      }, 0)
    }
    const LuckDraw = ref()
    const startCallBack = () => {
      if (!state.luckyNum) return alert('还剩0次抽奖机会')
      LuckDraw.value.play()
      setTimeout(() => {
        LuckDraw.value.stop(Math.random() * 7 >> 0)
      }, 2000)
    }
    const endCallBack = (prize) => {
      alert(`恭喜你获得大奖: ${prize.fonts[0].text}`)
      state.luckyNum--
    }

    return {
      LuckDraw,
      buttons,
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