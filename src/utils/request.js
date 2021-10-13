import Axios, {Method, ResponseType, AxiosResponse} from 'axios'
import {ElMessage} from 'element-plus'
import {isBlob} from '../utils/blob'
import {useRouter} from 'vue-router'

const router = useRouter()

// const baseURL = 'http://www.mock.com'
const service = Axios.create({
    baseURL: import.meta.env.BASE_URL,
    timeout: 20000
})

// 允许携带cookie
service.defaults.withCredentials = true

// 请求头信息
service.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'

// 默认使用 application/json 形式
// service.defaults.headers.post['Content-Type'] = 'application/json'

service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'


// 请求拦截器
service.interceptors.request.use(
    (config) => {
        if (sessionStorage.getItem("accessToken")) {
            config.headers.Authorization = `Bearer ${sessionStorage.getItem("accessToken")}`;
        }
        return config;
    },
    (err) => Promise.reject(err)
)

// 添加响应拦截器
let num
// 响应拦截器
service.interceptors.response.use(response => {

        // //python返回数据，规范化
        // let obj = {}
        // if (response.data) {
        //     let dataObj = response.data
        //     for (let key in dataObj) {
        //         let name = key.split("__")[1]
        //         obj[name] = dataObj[key]
        //     }
        // }

        console.log("response", response)
        return new Promise((resolve, reject) => {
            const res = response.data
            // const res = obj

            if (!num) {
                num = 0
            }
            if (res.code === 0) {
                resolve(res)
            } else if (res.code === 2 || res.code === 30) {
                if (num === 0) {
                    num++
                    ElMessage('登录信息已过期,请重新登录', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning',
                        callback: function () {
                            router.replace({path: '/login'})
                        }
                    })
                }
            } else if (res.code === 5) {
                ElMessage({type: 'warning', message: res.msg})
            } else if (res.code === '0') {
                resolve(res)
            } else if (isBlob(res)) {
                resolve(res)
            } else {
                ElMessage({type: 'error', message: res.msg, duration: 1000})
                reject(res)
            }
        })
    },
    (err) => {
        if (err.response && err.response.data) {
            const code = err.response.code
            const msg = err.response.data.message
            ElMessage.error(`Code: ${code}, Message: ${msg}`)
        } else {
            ElMessage.error(`${err}`)
        }
        return Promise.reject(err)
    }
)

export default service;