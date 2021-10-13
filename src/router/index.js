import {createRouter, createWebHashHistory} from "vue-router";
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/login',
        name: "Login",
        meta: {
            title: 'login',
        },
        component: () => import('../views/Login.vue')
    },
    {
        path: '/bigScreen',
        name: "BigScreen",
        meta: {
            title: 'bigScreen',
        },
        component: () => import('../views/BigScreen/index.vue')
    },
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "Dashboard",
                meta: {
                    title: '系统首页',
                    permission: true
                },
                // 惰性加载
                component: () => import('../views/Dashboard/index.vue'),
            }, {
                path: "/form",
                name: "Form",
                meta: {
                    title: '基础表单'
                },
                component: () => import('../views/Components/Form/Form.vue'),
            }, {
                path: "/stepForm",
                name: "StepForm",
                meta: {
                    title: '分步表单'
                },
                component: () => import('../views/Components/Form/StepForm.vue'),
            }, {
                path: "/advanceForm",
                name: "AdvanceForm",
                meta: {
                    title: '高级表单'
                },
                component: () => import('../views/Components/Form/AdvanceForm.vue'),
            }, {
                path: "/table",
                name: "Table",
                meta: {
                    title: '基本表格'
                },
                component: () => import('../views/Components/Table/MyTable.vue'),
            }, {
                path: "/tableList",
                name: "TableList",
                meta: {
                    title: '列表页'
                },
                component: () => import('../views/Components/Table/TableList.vue'),
            }, {
                path: "/vxeList",
                name: "VxeList",
                meta: {
                    title: 'VxeTable'
                },
                component: () => import('../views/Components/VxeTable/index.vue'),
            }, {
                path: "/luckDraw",
                name: "LuckDraw",
                meta: {
                    title: 'LuckDraw'
                },
                component: () => import('../views/Components/LuckDraw/index.vue'),
            }, {
                path: "/jGGDraw",
                name: "JGGDraw ",
                meta: {
                    title: 'JGGDraw'
                },
                component: () => import('../views/Components/LuckDraw/JGGLuck.vue'),
            }, {
                path: "/uploadExcel",
                name: "UploadExcel",
                meta: {
                    title: '上传excel'
                },
                component: () => import('../views/Components/Excel/UploadExcel.vue'),
            }, {
                path: "/exportExcel",
                name: "ExportExcel",
                meta: {
                    title: '导出excel'
                },
                component: () => import('../views/Components/Excel/exportExcel.vue'),
            }, {
                path: "/fileUpload",
                name: "FileUpload",
                meta: {
                    title: '文件上传'
                },
                component: () => import('../views/Components/Upload/FileUpload.vue'),
            }, {
                path: "/dragDialog",
                name: "DragDialog",
                meta: {
                    title: 'DragDialog'
                },
                component: () => import('../views/Components/DragDialog.vue'),
            }, {
                path: "/zip",
                name: "Zip",
                meta: {
                    title: 'Zip'
                },
                component: () => import('../views/Components/Zip.vue'),
            }, {
                path: "/userInfo",
                name: "UserInfo",
                meta: {
                    title: '个人中心'
                },
                component: () => import('../views/UserInfo.vue'),
            }, {
                path: "/fullCalendar",
                name: "FullCalendar",
                meta: {
                    title: '日历'
                },
                component: () => import('../views/Components/FullCalendar/index.vue'),
            }, {
                path: "/404",
                name: "404",
                meta: {
                    title: '404'
                },
                component: () => import('../views/notFound/index.vue'),
            }]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// router.beforeEach((to, from, next) => {
//     document.title = `${to.meta.title} | vue-manage-system`;
//     const role = JSON.parse(localStorage.getItem('userInfo'));
//     if (!role && to.path !== '/login') {
//         next('/login');
//     } else if (to.meta.permission) {
//         // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//         role.username === 'admin'
//             ? next()
//             : next('/403');
//     } else {
//         next();
//     }
// });

router.beforeEach((to, from, next) => {
    if (sessionStorage.getItem('auth')) {
        console.log('auth', sessionStorage.getItem('auth'))
        next()
    } else if (to.path === '/login') {
        console.log('/login')
        next()
    } else {
        console.log('unauthed into login')
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        })
    }
})



export default router;