import LazyLoad from 'components/LazyLoad';

export const routes = [
  {
    path: '/sys',
    auth: true,
    children: [
      {
        path: '/',
        title: '面板',
        component: LazyLoad(() => import('./dashboard/Dashboard')),
      },
      // {
      //   path: '/user',
      //   title: '用户管理',
      //   component: LazyLoad(() => import('./permission/UserManage')),
      // },
      {
        path: '/category',
        title: '目录管理',
        component: LazyLoad(() => import('./system/CategoryManage')),
      },
    ],
  },
  {
    path: '/permission',
    auth: true,
    children: [
      {
        path: '/',
        title: '权限',
        component: LazyLoad(() => import('./permission/PermissionManage')),
      },
      {
        path: '/user',
        title: '用户',
        component: LazyLoad(() => import('./permission/UserManage')),
      },
      {
        path: '/person-center',
        title: '个人中心',
        component: LazyLoad(() => import('./permission/PersonalCenter')),
      },
    ],
  },
  {
    path: '/login',
    title: '登录',
    component: LazyLoad(() => import('./login/Login')),
  },
  {
    path: '/',
    title: 'Anvil',
    redirect: '/login',
  },
];
