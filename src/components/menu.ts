/*
 * @Author: xiaozhaoJqk
 * @Date: 2024-08-06 21:38:25
 * @LastEditTime: 2024-08-06 21:53:30
 * @LastEditors: xiaozhaoJqk
 * @Description: 
 * @FilePath: \p_manager\src\components\menu.ts
 */
import { Menus } from '@/types/menu';

export const menuData: Menus[] = [
    {
        id: '0',
        title: '系统首页',
        index: '/dashboard',
        icon: 'Odometer',
    },
    {
        id: '1',
        title: '系统管理',
        index: '1',
        icon: 'HomeFilled',
        children: [
            {
                id: '10',
                pid: '1',
                index: '/system-group',
                title: '部门管理',
            },
            {
                id: '13',
                pid: '1',
                index: '/system-menu',
                title: '菜单管理',
            },
            {
                id: '12',
                pid: '1',
                index: '/system-role',
                title: '角色管理',
            },
            {
                id: '11',
                pid: '1',
                index: '/system-user',
                title: '用户管理',
            },
            {
                id: '14',
                pid: '1',
                index: '/system-form',
                title: '表单管理'
            }
        ],
    },
    
];
