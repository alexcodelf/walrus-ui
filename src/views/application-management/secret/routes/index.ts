export default [
  {
    path: 'secrets/list',
    name: 'secretsList',
    component: () =>
      import('@/views/application-management/secret/pages/list.vue'),
    meta: {
      hideInMenu: false,
      ignoreCache: true,
      locale: 'applications.applications.secret',
      requiresAuth: true,
      icon: 'icon-apps'
    }
  },
  {
    path: 'secrets/detail',
    name: 'secretDetail',
    component: () =>
      import('@/views/application-management/secret/pages/detail.vue'),
    meta: {
      hideInMenu: true,
      ignoreCache: true,
      locale: 'applications.applications.secret',
      requiresAuth: true,
      icon: 'icon-apps'
    }
  }
];