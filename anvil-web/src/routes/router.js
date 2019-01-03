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
