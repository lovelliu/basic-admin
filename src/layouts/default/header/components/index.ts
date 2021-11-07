import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';

export const LayoutBreadcrumb = createAsyncComponent(() => import('./Breadcrumb.vue'));
