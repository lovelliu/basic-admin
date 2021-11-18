import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '../../constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  meta: {
    title: t('routes.dashboard.dashboard'),
    icon: 'ion:grid-outline',
  },
};

export default dashboard;
