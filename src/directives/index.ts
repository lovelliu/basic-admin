/**
 * Configure and register global directives
 */
import type { App } from 'vue';
import { setupLoadingDirective } from './loading';

export function setupGlobDirectives(app: App) {
  // setupPermissionDirective(app);
  setupLoadingDirective(app);
}
