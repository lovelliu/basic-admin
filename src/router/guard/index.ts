import type { Router } from 'vue-router';
import { createPermisssionGuard } from './permissionGuard';

export function setupRouterGuard(router: Router) {
  createPermisssionGuard(router);
}
