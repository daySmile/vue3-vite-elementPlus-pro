<template>
  <div class="sidebar">
    <div class="side_top">
      <img :src="logo" class="sidebar-logo" />
<!--      <h1 class="sidebar-title">Vue3+ElementPlus</h1>-->
      <h1 class="sidebar-title" v-if="!collapse">{{titles}}</h1>
    </div>

    <el-menu
        class="sidebar-el-menu"
        :default-active="onRoutes"
        :collapse="collapse"
        text-color="#bfcbd9"
        unique-opened
        router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template #title>{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                  {{ threeItem.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import {computed, watch,ref} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import logo from '@/assets/logo.png'

export default {
  name: "SideBar",
  setup() {
    const items = [
      {
        icon: "el-icon-s-home",
        index: "/dashboard",
        title: "系统首页",
      }, {
        icon: "el-icon-folder-opened",
        index: "3",
        title: "表格相关",
        subs: [
          {
            index: "/form",
            title: "基本表格",
          }, {
            index: "/stepForm",
            title: "分步表单",
          }
        ],
      }, {
        icon: "el-icon-notebook-1",
        index: "4",
        title: "列表相关",
        subs: [
          {
            index: "/tableList",
            title: "基本列表",
          }, {
            index: "/table",
            title: "封装列表",
          }, {
            index: "/advanceForm",
            title: "高级列表",
          }
        ],
      }, {
        icon: "el-icon-notebook-1",
        index: "5",
        title: "Vxe Table",
        subs: [
          {
            index: "/vxeList",
            title: "基本使用",
          }
        ],
      }, {
        icon: "el-icon-folder",
        index: "6",
        title: "Excel",
        subs: [
          {
            index: "/uploadExcel",
            title: "上传excel",
          }, {
            index: "/exportExcel",
            title: "导出excel",
          }
        ],
      }, {
        icon: "el-icon-folder",
        index: "7",
        title: "组件",
        subs: [
          {
            index: "/fullCalendar",
            title: "日历组件",
          }, {
            icon: "el-icon-folder",
            index: "/fileUpload",
            title: "文件上传",
          }, {
            icon: "el-icon-s-promotion",
            index: "/dragDialog",
            title: "弹框拖拽",
          }, {
            icon: "el-icon-folder",
            index: "/zip",
            title: "Zip",
          }, {
            index: "/luckDraw",
            title: "幸运转盘",
          },
          {
            index: "/jGGDraw",
            title: "九宫格",
          }
        ],
      }, {
        icon: "el-icon-folder",
        index: "/userInfo",
        title: "个人中心",
      }, {
        icon: "el-icon-collection",
        index: "/404",
        title: "404",
      }, {
        icon: "el-icon-collection",
        index: "/bigScreen",
        title: "大屏展示",
      }
    ];
    const route = useRoute();

    const onRoutes = computed(() => {
      return route.path;
    });

    const store = useStore()
    const collapse = computed(() => store.state.collapse)
    const headerTitle = computed(() => store.state.settingsModule.title)
    const titles = headerTitle.value


    return {
      logo,
      items,
      onRoutes,
      collapse,
      titles
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  min-height: 400px;
  text-align: left;

  .side_top {
    height: 60px;
    line-height: 60px;
    text-align: left;
    padding-left: 20px;
    background-color: #c9dfed;
    .sidebar-logo {
      width: 30px;
      height: 32px;
      vertical-align: middle;
      margin-right: 15px;
    }
    .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #5c4a4a;
      font-weight: 600;
      line-height: 60px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}

.sidebar > ul {
  height: calc(100vh - 60px) !important;
  overflow-y: scroll;
  background: #c9dfed;
  //background: #ebf1f5;
}


</style>