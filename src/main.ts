import 'virtual:windi.css';
import '/@/design/index.less';
import 'virtual:svg-icons-register';
import App from './App.vue';
import { createApp } from 'vue';
import { setupStore } from './store';
import { setupErrorHandle } from '/@/logics/error-handle';
import { setupI18n } from '/@/locales/setupI18n';
import { setupGlobDirectives } from '/@/directives';
import { router, setupRouter } from '/@/router';
import { initAppConfigStore } from '/@/logics/initAppConfig';
import { registerGlobComp } from '/@/components/registerGlobComp';
import { setupRouterGuard } from './router/guard';

// if (import.meta.env.DEV) {
//   import('ant-design-vue/dist/antd.less');
// }

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
