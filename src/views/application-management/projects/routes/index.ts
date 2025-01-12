import { Resources } from '@/permissions/config';
import { PROJECT, WORKFLOW } from '@/router/config';
import { permissionKey } from '@/store/modules/user/types';
import { PageAction } from '@/views/config';
import workflowRoutes from '@/views/application-management/workflows/routes';
import connectorRoutes from './connectors';
import templateRoutes from '../../templates/routes';

export default [
  ...connectorRoutes,
  ...templateRoutes,
  ...workflowRoutes,
  {
    path: 'project/list',
    name: PROJECT.List,
    component: () =>
      import('@/views/application-management/projects/pages/list.vue'),
    meta: {
      hideInMenu: false,
      hideMenu: false,
      ignoreCache: true,
      locale: 'menu.applicationManagement',
      requiresAuth: true,
      permission: {
        resource: Resources.Projects,
        actions: ['GET']
      },
      cachePages: [PROJECT.Detail],
      icon: 'icon-apps'
    }
  },
  {
    path: 'project/:projectId/detail',
    name: PROJECT.Detail,
    component: () =>
      import('@/views/application-management/projects/pages/detail.vue'),
    meta: {
      hideInMenu: true,
      hideMenu: false,
      ignoreCache: false,
      locale: 'applications.projects.menu',
      requiresAuth: true,
      selectedMenu: PROJECT.List,
      permission: {
        resource: Resources.Projects,
        type: permissionKey.projectRoles,
        actions: ['GET']
      },
      cachePages: [
        PROJECT.ConnectorK8sDetail,
        PROJECT.ConnectorScmDetail,
        PROJECT.ConnectorProviderDetail,
        PROJECT.ConnectorCustomDetail,
        PROJECT.EnvDetail,
        PROJECT.EnvEdit,
        PROJECT.EnvClone,
        PROJECT.TemplateDetail,
        WORKFLOW.Detail,
        WORKFLOW.Edit,
        WORKFLOW.Records
      ],
      icon: 'icon-apps'
    }
  },
  {
    path: 'project/:projectId/environment/:environmentId/detail',
    name: PROJECT.EnvDetail,
    component: () =>
      import('@/views/application-management/environments/pages/detail.vue'),
    meta: {
      hideInMenu: true,
      hideMenu: false,
      ignoreCache: false,
      selectedMenu: PROJECT.List,
      locale: 'applications.projects.menu',
      requiresAuth: true,
      permission: {
        resource: Resources.Environments,
        type: permissionKey.projectRoles,
        actions: ['GET']
      },
      cachePages: [
        PROJECT.ServiceEdit,
        PROJECT.ServiceDetail,
        PROJECT.ServiceClone
      ],
      icon: 'icon-apps'
    }
  },
  {
    path: 'project/:projectId/environment/:action',
    name: PROJECT.EnvEdit,
    component: () =>
      import('@/views/application-management/environments/pages/edit.vue'),
    meta: {
      hideInMenu: true,
      hideMenu: false,
      ignoreCache: true,
      selectedMenu: PROJECT.List,
      locale: 'applications.projects.menu',
      requiresAuth: true,
      permission: {
        resource: Resources.Environments,
        type: permissionKey.projectRoles,
        pageAction: {
          [PageAction.VIEW]: ['GET'],
          [PageAction.EDIT]: ['POST']
        }
      },
      icon: 'icon-apps'
    }
  },
  {
    path: 'project/:projectId/environment/:environmentId/clone',
    name: PROJECT.EnvClone,
    component: () =>
      import('@/views/application-management/environments/pages/edit.vue'),
    meta: {
      hideInMenu: true,
      hideMenu: false,
      ignoreCache: true,
      selectedMenu: PROJECT.List,
      locale: 'applications.projects.menu',
      requiresAuth: true,
      permission: {
        resource: Resources.Environments,
        type: permissionKey.projectRoles,
        actions: ['POST']
      },
      icon: 'icon-apps'
    }
  },
  {
    path: 'project/:projectId/environment/:environmentId/page/:dataType/detail',
    name: PROJECT.ServiceDetail,
    component: () =>
      import('@/views/application-management/services/pages/detail.vue'),
    meta: {
      hideInMenu: true,
      hideMenu: false,
      ignoreCache: true,
      selectedMenu: PROJECT.List,
      locale: 'applications.projects.menu',
      requiresAuth: true,
      permission: {
        resource: Resources.Services,
        type: permissionKey.projectRoles,
        actions: ['GET']
      },
      icon: 'icon-apps'
    }
  },
  {
    path: 'project/:projectId/environment/:environmentId/page/:dataType/:action',
    name: PROJECT.ServiceEdit,
    component: () => import('../../services/pages/edit.vue'),
    meta: {
      hideInMenu: true,
      hideMenu: false,
      ignoreCache: true,
      selectedMenu: PROJECT.List,
      locale: 'applications.projects.menu',
      requiresAuth: true,
      permission: {
        resource: Resources.Services,
        type: permissionKey.projectRoles,
        actions: ['POST']
      },
      icon: 'icon-apps'
    }
  },
  {
    path: 'project/:projectId/environment/:environmentId/data/clone',
    name: PROJECT.ServiceClone,
    component: () => import('../../services/pages/clone.vue'),
    meta: {
      hideInMenu: true,
      hideMenu: false,
      ignoreCache: true,
      selectedMenu: PROJECT.List,
      locale: 'applications.projects.menu',
      requiresAuth: true,
      permission: {
        resource: Resources.Services,
        type: permissionKey.projectRoles,
        actions: ['POST']
      },
      icon: 'icon-apps'
    }
  }
];
