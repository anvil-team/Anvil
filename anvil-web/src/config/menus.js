function getMenus() {
  return [
    {
      name: '权限中心',
      base: '/permission',
      children: [
        { name: '个人中心', path: '/my' },
        { name: '权限管理', path: '/role' },
        { name: '用户管理', path: '/user' },
      ],
    },
    {
      name: '项目中心',
      base: '/management',
      children: [
        { name: '机房配置', path: '/room' },
        { name: '服务器配置', path: '/server' },
        { name: '项目配置', path: '/project' },
      ],
    },
    {
      name: '配置中心',
      base: '/configuration',
      children: [{ name: '配置发布', path: '/publish' }],
    },
  ]
}

export default getMenus()
