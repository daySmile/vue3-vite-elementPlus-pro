# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)


### mock本地模拟数据和服务器请求数据进行切换

1、mock数据
在main.js中引入 mock.js文件就可以切换到mock环境
缺点： 不能再network下看到请求的接口
研究 mockServe技术可以弥补该缺点

2、和服务器对接口环境：
在vite中添加  server配置：
***
    server: {
        hmr: {overlay: false}, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
        // 服务配置
        port: 3000,    // 类型： number 指定服务器端口;
        open: true,   // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
        cors: true,  // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
        proxy: {    // 类型： Record<string, string | ProxyOp 为开发服务器配置自定义代理规则
            '/api-dri': {
                target: 'http://192.168.2.134:5000', // 服务器
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace('/api-dri', '/api-dri')
            }
        }
    },
