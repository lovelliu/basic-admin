import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'

export const LayoutBreadcrumb = createAsyncComponent(() => import('./Breadcrumb.vue'))

export const UserDropDown = createAsyncComponent(
  () => import('./user-dropdown/index.vue'),
  {
    loading: true,
  },
)
