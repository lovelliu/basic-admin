import type { AppRouteModule } from '@/router/types'

import { LAYOUT } from '@/router/constant'
import { t } from '@/hooks/web/useI18n'

const permission: AppRouteModule = {
  path: '/permission',
  name: 'Permission',
  component: LAYOUT,
  redirect: '/permission/menu',
  meta: {
    orderNo: 2000,
    icon: 'ion:settings-outline',
    title: t('routes.demo.permission.permission'),
  },
  children: [
    {
      path: 'menu',
      name: 'MenuManagement',
      meta: {
        title: t('routes.demo.system.menu'),
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/menu/index.vue'),
    },
    {
      path: 'resource',
      name: 'ResourceManagement',
      meta: {
        title: t('routes.demo.system.resource'),
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/resource/index.vue'),
    },
    {
      path: 'resource_cate',
      name: 'ResourceCate',
      meta: {
        hideMenu: true,
        title: t('routes.demo.system.resource_cate'),
        ignoreKeepAlive: true,
        currentActiveMenu: '/permission/resource',
      },
      component: () => import('@/views/resource/ResourceCate.vue'),
    },
    {
      path: 'role',
      name: 'RoleManagement',
      meta: {
        title: t('routes.demo.system.role'),
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/role/index.vue'),
    },
  ],
}

export default permission
