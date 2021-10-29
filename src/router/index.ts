// import type { RouteRecordRaw } from 'vue-router';
// import type { App } from 'vue';

import { createRouter, createWebHashHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: [],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
