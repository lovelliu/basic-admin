import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const permission: AppRouteModule = {
  path: '/user',
  name: 'User',
  component: LAYOUT,
  redirect: '/user/index',
  meta: {
    orderNo: 2000,
    hideChildrenInMenu: true,
    icon: 'ant-design:user-outlined',
    title: t('routes.demo.system.user'),
  },
  children: [
    {
      path: 'index',
      name: 'UserManagement',
      meta: {
        title: t('routes.demo.system.user'),
        ignoreKeepAlive: true,
        hideMenu: true,
      },
      component: () => import('/@/views/user/index.vue'),
    },
  ],
}

export default permission
