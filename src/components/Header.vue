<template>
  <div class="header">
    <!--  折叠按钮-->
    <div class="collapse-btn" @click="collapseChage">
      <i v-if="!collapse" class="el-icon-s-fold" style="color: rgb(92 74 73)"></i>
      <i v-else class="el-icon-s-unfold" style="color: rgb(92 74 73)"></i>
    </div>

    <div class="header-right">

      <!-- 全屏组件 -->
      <el-button id='fullScreen' class='full-screen'>
        <el-tooltip content='全屏展开' effect='light' placement='bottom'>
          <i v-show='fullScreen == false' class='el-icon-full-screen' @click='toShowFullScreen()'></i>
        </el-tooltip>
        <el-tooltip content='收起全屏' effect='light' placement='bottom'>
          <i v-show='fullScreen == true' class='el-icon-bottom-left' @click='toExitFullScreen()'></i>
        </el-tooltip>
      </el-button>

      <div class="header-user-con">
        <!--  消息组件    -->
        <div id="message" class="btn-bell">
          <el-dropdown>
            <el-badge :value='message' :max='99' class='message-badge' type='danger'>
              <el-button class='message-sty'>
                <i class='el-icon-message-solid'></i>
              </el-button>
            </el-badge>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command='a'>mike 回复了你的邮件</el-dropdown-item>
                <el-dropdown-item command='b'>您有5个新任务</el-dropdown-item>
                <el-dropdown-item command='c'>您已经和Jone成为了好友</el-dropdown-item>
                <el-dropdown-item command='d'>项目验收通知</el-dropdown-item>
                <el-dropdown-item command='e' divided>新会议通知</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="../assets/img/img.jpg"/>
        </div>

        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
           <span class="el-dropdown-link">
               {{ username }}
               <i class="el-icon-caret-bottom" style="color: #505050"></i>
           </span>
          <template #dropdown>
            <el-dropdown-menu>
              <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">
                <el-dropdown-item>项目仓库</el-dropdown-item>
              </a>
              <el-dropdown-item command="user">
                <router-link to="/userInfo">
                  个人中心
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, onMounted, ref} from 'vue'
import {useStore} from 'vuex'
import {langConfig} from '@/utils/constant/config'
import {toFullScreen, exitFullScreen} from "@/utils/fullScreen";
import router from "../router";

export default {
  name: "Header",
  setup() {
    const store = useStore()
    const fullScreen = ref(false)
    const message = ref(2)

    const lang = computed(() => store.getters['settingsModule/getLangState'])

    const collapse = computed(() => store.state.collapse);
    // 侧边栏折叠
    const collapseChage = () => {
      store.commit("handleCollapse", !collapse.value);
    };

    onMounted(() => {
      if (document.body.clientWidth < 1500) {
        collapseChage();
      }
    });

    const username = localStorage.getItem('role');
    const handleCommand = (command) => {
      if (command == 'loginout') {
        localStorage.removeItem('role');
        localStorage.removeItem('userInfo');
        router.push("/login");
      }
    }

    const toShowFullScreen = () => {
      toFullScreen()
      fullScreen.value = true
    }

    const toExitFullScreen = () => {
      exitFullScreen()
      fullScreen.value = false
    }

    return {
      collapse,
      collapseChage,
      username,
      handleCommand,
      langConfig,
      fullScreen,
      message,

      toShowFullScreen,
      toExitFullScreen
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  line-height: 60px;
  font-size: 22px;
  color: #fff;
}

.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  /*line-height: 70px;*/
}

.header .logo {
  float: left;
  width: 250px;
  /*line-height: 70px;*/
}

.header-right {
  float: right;
  display: flex;
  justify-content: space-between;
  padding-right: 20px;

  .full-screen {
    background-color: transparent;
    border: none;
    padding: 15px 20px;

    i {
      background-color: transparent;
      border: none;
      //color: #fff;
      color: #5c4a48;
      font-size: 24px;
    }
  }
}

.header-user-con {
  display: flex;
  height: 60px;
  align-items: center;
}

.btn-bell {
  margin-right: 10px;

  ::v-deep .el-badge__content.is-fixed {
    top: 8px;
    right: 15px;
  }

  .message-badge {
    .is-fixed {
      top: 10px !important;
      right: 28px !important;
    }

    .message-sty {
      border: none;
      padding: 0px 15px;
      margin-bottom: 8px;
      background-color: transparent;

      i {
        background-color: transparent;
        border: none;
        //color: #fff;
        color: #505050;
        font-size: 24px;
      }
    }
  }
}

.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}

.user-name {
  margin-left: 10px;
}

.user-avator {
  margin-left: 20px;
  margin-right: 10px;
}

.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}

.el-dropdown-menu__item {
  text-align: center;
}

.el-dropdown-menu, .el-menu {
  background-color: unset;
}
</style>