import LazyLoad from 'src/components/LazyLoad'

export const authRoutes = [
  {
    path: '/dashboard',
    auth: true,
    component: LazyLoad(() => import('./Dashboard')),
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
]

export const routes = [
  {
    path: '/login',
    component: LazyLoad(() => import('./Login')),
  },
]
