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
      {
        path: '/user',
        title: '用户管理',
        component: LazyLoad(() => import('./permission/UserManage')),
      },
      {
        path: '/category',
        title: '目录管理',
        component: LazyLoad(() => import('./system/CategoryManage')),
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
