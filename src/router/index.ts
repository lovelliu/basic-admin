import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';

import { createRouter, createWebHashHistory } from 'vue-router';

// const WHITE_NAME_LIST: string[] = [];
// const getRouteNames = (array: any[]) =>
//   array.forEach((item) => {
//     WHITE_NAME_LIST.push(item.name);
//     getRouteNames(item.children || []);
//   });
// getRouteNames(basicRoutes);

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: [],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
