import {get, post, postBase, putBase} from '../utils/http'

let requestApi = '/api-dri'

let requestURL = {
    /**登录*/
    postLogin: (data) => postBase(requestApi + '/login', data),
    /**查询用户信息*/
    // api-dri/big-screen/example
    postAuthUserInfo: (data) => get(requestApi + '/userInf', data),
}

export default requestURL
