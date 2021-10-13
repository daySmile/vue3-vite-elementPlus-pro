/****   http.js   ****/
// 导入封装好的axios实例
import request from './request'
import qs from 'qs'


let setParams = {}
// 请求header
const header = {
    clientIp: '11',
    clientType: '11',
    serialNum: ''
}


/*
get 请求
*/
export function get(url, params, response) {
    return request.get(url, params, response)
}


// post 请求无header
export function postBase(url, params, response) {
    return request.post(url, params, response)
}

// post 请求有header
export function post(url, params, response) {
    setParams = {
        // header,
        body: params
    }
    return request.post(url, setParams, response)
}

// post 请求FormData
export function postForm(url, params) {
    return request.post(url, qs.stringify(params))
}

// put请求有header
export function putBase(url, params, response) {
    return request.put(url, params, response)
}

// put请求有header
export function put(url, params, response) {
    setParams = {
        header,
        body: params
    }
    return request.put(url, setParams, response)
}

// delete请求
export function DEL(url, params) {
    return request.detele(url, params)
}