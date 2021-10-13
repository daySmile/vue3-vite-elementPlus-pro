/**
 * @description register mock data right here
 */

import Mock from 'mockjs'

Mock.mock('/api-dri/login', 'post', (option) => {
    const {account, password} = JSON.parse(option.body)
    console.log(account, password)
    if (account === 'admin' && password === 'admin') {
        return {
            code: 0,
            data: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjIyODA1MjAxMjhAcXEuY29tIiwic3ViIjo5LCJpYXQiOjE2MjU4MzQ3MTksImV4cCI6MTYyODQyNjcxOX0.YQLVi-zw4XWQEd8Hy2YZGlFaqX8c7xyRPrYuxcFywFE'
            },
            success: true,
            message: '成功'
        }
    }
    if (account === 'superAdmin' && password === 'superAdmin') {
        return {
            code: 0,
            data: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjIyODA1MjAxMjhAcXEuY29tIiwic3ViIjo5LCJpYXQiOjE2MjU4MzQ3MTksImV4cCI6MTYyODQyNjcxOX0.YQLVi-zw4XWQEd8Hy2YZGlFaqX8c7xyRPrYuxcFywFE'
            },
            success: true,
            message: '成功'
        }
    }
    if (account === '10000018018' && password === '12345678') {
        return {
            code: 0,
            data: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjIyODA1MjAxMjhAcXEuY29tIiwic3ViIjo5LCJpYXQiOjE2MjU4MzQ3MTksImV4cCI6MTYyODQyNjcxOX0.YQLVi-zw4XWQEd8Hy2YZGlFaqX8c7xyRPrYuxcFywFE'
            },
            success: true,
            message: '成功'
        }
    }
    return {
        code: 0,
        data: null,
        message: '账户或者密码错误'
    }
})

// 登录成功，查询用户信息，包括角色
Mock.mock('/api/auth/user/userInfo', 'post', (option) => {
    const {username} = JSON.parse(option.body)

    if (username === 'admin') {
        return {
            code: 0,
            data: {
                roleName: '超级管理员'
            },
            success: true,
            message: '成功'
        }
    }
    if (username === 'user') {
        return {
            code: 0,
            data: {
                roleName: '管理员'
            },
            success: true,
            message: '成功'
        }
    }
    return {
        code: 0,
        data: null,
        message: '账户或者密码错误'
    }
})
