import { Resources } from '@/permissions/config';

export default [
  {
    path: 'global-secrets/list',
    name: 'GlobalSecretsList',
    component: () => import('../pages/list.vue'),
    meta: {
      hideInMenu: false,
      ignoreCache: true,
      locale: 'operation.secret.menu',
      requiresAuth: true,
      permission: {
        resource: Resources.Secrets,
        actions: ['GET']
      },
      icon: 'icon-apps'
    }
  }
];
