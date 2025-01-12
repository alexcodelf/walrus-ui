import { Resources } from '@/permissions/config';
import SYSTEMSETTINGS from '../../config/system-settings';

export default {
  path: 'system',
  name: SYSTEMSETTINGS.Index,
  component: () => import('@/views/system/index.vue'),
  meta: {
    hideInMenu: false,
    ignoreCache: true,
    locale: 'menu.system.setting',
    icon: 'icon-settings',
    requiresAuth: true,
    isRouteView: true,
    order: 6,
    onlyRenderChildren: true,
    permission: [
      {
        resource: Resources.Settings,
        actions: ['POST']
      }
    ]
  },
  children: [
    {
      path: 'settings',
      name: SYSTEMSETTINGS.Settings,
      component: () => import('@/views/system/pages/main.vue'),
      meta: {
        hideInMenu: false,
        ignoreCache: true,
        clearMenuStatus: false,
        locale: 'menu.system.setting',
        requiresAuth: true,
        permission: [
          {
            resource: Resources.Settings,
            actions: ['POST']
          }
        ],
        roles: ['*']
      }
    }
  ]
};
