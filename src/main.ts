import 'virtual:windi.css';
import '/@/design/index.less';
import 'virtual:svg-icons-register';
import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from './store';
import { setupErrorHandle } from '/@/logics/error-handle';
import { setupI18n } from '/@/locales/setupI18n';
import { setupGlobDirectives } from '/@/directives';
import { router, setupRouter } from '/@/router';
import { initAppConfigStore } from '/@/logics/initAppConfig';
import { registerGlobComp } from '/@/components/registerGlobComp';
import { setupRouterGuard } from './router/guard';

async function bootstrap() {
  const app = createApp(App);

  setupStore(app);
  initAppConfigStore();
  registerGlobComp(app);
  await setupI18n(app);
  setupRouter(app);
  setupRouterGuard(router);
  setupGlobDirectives(app);
  setupErrorHandle(app);

  app.mount('#app');
}

bootstrap();
