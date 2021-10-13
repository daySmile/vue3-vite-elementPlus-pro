import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import' //实现按需加载模块，减少文件体积
import {resolve} from 'path'; // 主要用于alias文件路径别名
import legacy from '@vitejs/plugin-legacy'
import {viteMockServe} from 'vite-plugin-mock'


export default defineConfig({
    base: './',
    optimizeDeps: {
        include: ['schart.js']
    },
    plugins: [           // 类型： (Plugin | Plugin[])[]  将要用到的插件数组
        // vue(),
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: tag => tag.startsWith('fc-')
                }
            }
        }),
        styleImport({
            libs: [{
                libraryName: 'element-plus',
                esModule: true,
                ensureStyleFile: true,
                resolveStyle: (name) => {
                    // eslint-disable-next-line no-param-reassign
                    name = name.slice(3)
                    return `element-plus/packages/theme-chalk/src/${name}.scss`;
                },
                resolveComponent: (name) => `element-plus/lib/${name}`,
            }, {
                libraryName: 'vxe-table',
                esModule: true,
                resolveComponent: (name) => `vxe-table/es/${name}`,
                resolveStyle: (name) => `vxe-table/es/${name}/style.css`
            }]
        }),
        legacy({
            targets: ['ie >= 11'],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime']
        }),
        viteMockServe({
            // close support .ts file
            supportTs: false,
        })
    ],
    resolve: {          // 类型：Record<string, string> | Array<{ find: string | RegExp, replacement: string }> 将会被传递到 @rollup/plugin-alias 作为它的 entries。
        alias: {
            '~': resolve(__dirname, './'),
            '@': resolve(__dirname, 'src'),
        },
        extensions: ['.js', '.ts', '.jsxsa', '.tsx', '.json', '.vue', '.mjs'] // 类型： string[] 导入时想要省略的扩展名列表。
    },
    server: {
        hmr: {overlay: false}, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层

        // 服务配置
        port: 3000,    // 类型： number 指定服务器端口;
        open: true,   // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
        cors: true,  // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
        // proxy: {    // 类型： Record<string, string | ProxyOp 为开发服务器配置自定义代理规则
        //     '/api-dri': {
        //         target: 'http://192.168.2.134:5000', // 服务器
        //         changeOrigin: true,
        //         secure: false,
        //         rewrite: (path) => path.replace('/api-dri', '/api-dri')
        //     }
        // }
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: []
        }
    },
    // 全局引入动态变量
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "~@/assets/css/variables.scss";`
            }
        }
    }
})
