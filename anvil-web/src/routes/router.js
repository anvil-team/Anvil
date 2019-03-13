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
        component: LazyLoad(() => import('./permission/user/UserManage')),
      },
      {
        path: '/person-center',
        title: '个人中心',
        component: LazyLoad(() => import('./permission/PersonalCenter')),
      },
    ],
  },
  {
    path: '/project',
    auth: true,
    children: [
      {
        path: '/',
        title: '项目配置',
        component: LazyLoad(() => import('./application/ApplicationConfiguration')),
      },
      {
        path: '/cluster',
        title: '集群配置',
        component: LazyLoad(() => import('./application/cluster/ClusterConfiguration')),
      },
    ],
  },
  {
    path: '/configuration',
    auth: true,
    children: [
      {
        path: '/publish',
        title: '配置发布',
        component: LazyLoad(() => import('./configuration/Publish')),
      },
      {
        path: '/approval',
        title: '配置审核',
        component: LazyLoad(() => import('./configuration/Approval')),
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
