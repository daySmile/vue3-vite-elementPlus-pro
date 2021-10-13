import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import installVXETablePlus from './plugins/vxeTable'

import './mock'  // mock数据

import './assets/css/icon.css'
import './assets/css/index.scss'
// 拖拽
import dialogDrag from './utils/dialogDrag.js'
import {FcWaveFilter} from 'fancy-components'
import VXETable from "vxe-table";  // fancy-components 水波纹花式效果轮子
/* eslint-disable no-new */
new FcWaveFilter()  // 相当于全局注册了组件 注：web components 没有局部注册组件这一说

const app = createApp(App)
installElementPlus(app)
installVXETablePlus(app)

app
    .use(store)
    .use(router)
    .use(dialogDrag)
    .mount('#app')