import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { usePermissStore } from '../store/permiss';
import Home from '../views/home.vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                meta: {
                    title: '系统首页',
                    noAuth: true,
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard.vue'),
            },
            {
                path: '/system-group',
                name: 'system-group',
                meta: {
                    title: '部门管理',
                    permiss: '10',
                },
                component: () => import(/* webpackChunkName: "system-group" */ '../views/system/group.vue'),
            },
            {
                path: '/system-user',
                name: 'system-user',
                meta: {
                    title: '用户管理',
                    permiss: '11',
                },
                component: () => import(/* webpackChunkName: "system-user" */ '../views/system/user.vue'),
            },
            {
                path: '/system-role',
                name: 'system-role',
                meta: {
                    title: '角色管理',
                    permiss: '12',
                },
                component: () => import(/* webpackChunkName: "system-role" */ '../views/system/role.vue'),
            },
            {
                path: '/system-menu',
                name: 'system-menu',
                meta: {
                    title: '资源管理',
                    permiss: '13',
                },
                component: () => import(/* webpackChunkName: "system-menu" */ '../views/system/menu.vue'),
            },
            {
                path: '/system-form',
                name: 'system-form',
                meta: {
                    title: '表单管理',
                    permiss: '14',
                },
                component: () => import(/* webpackChunkName: "system-form" */ '../views/system/form.vue')
            }
        ],
    },
    {
        path: '/login',
        meta: {
            title: '登录',
            noAuth: true,
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/pages/login.vue'),
    },
    {
        path: '/register',
        meta: {
            title: '注册',
            noAuth: true,
        },
        component: () => import(/* webpackChunkName: "register" */ '../views/pages/register.vue'),
    },
    {
        path: '/reset-pwd',
        meta: {
            title: '重置密码',
            noAuth: true,
        },
        component: () => import(/* webpackChunkName: "reset-pwd" */ '../views/pages/reset-pwd.vue'),
    },
    {
        path: '/403',
        meta: {
            title: '没有权限',
            noAuth: true,
        },
        component: () => import(/* webpackChunkName: "403" */ '../views/pages/403.vue'),
    },
    {
        path: '/404',
        meta: {
            title: '找不到页面',
            noAuth: true,
        },
        component: () => import(/* webpackChunkName: "404" */ '../views/pages/404.vue'),
    },
    { path: '/:path(.*)', redirect: '/404' },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    NProgress.start();
    const role = localStorage.getItem('vuems_name');
    const permiss = usePermissStore();

    if (!role && to.meta.noAuth !== true) {
        next('/login');
    } else if (typeof to.meta.permiss == 'string' && !permiss.key.includes(to.meta.permiss)) {
        // 如果没有权限，则进入403
        next('/403');
    } else {
        next();
    }
});

router.afterEach(() => {
    NProgress.done();
});

export default router;
