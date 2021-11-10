import '/@/design/index.less';
import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from './store';
import 'virtual:windi.css';
import 'virtual:svg-icons-register';
import { setupErrorHandle } from '/@/logics/error-handle';
import { setupI18n } from '/@/locales/setupI18n';
import { setupGlobDirectives } from '/@/directives';
import { setupRouter } from '/@/router';
import { initAppConfigStore } from '/@/logics/initAppConfig';
import { registerGlobComp } from '/@/components/registerGlobComp';

if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less');
}

async function bootstrap() {
  const app = createApp(App);

  setupStore(app);
  initAppConfigStore();
  registerGlobComp(app);
  await setupI18n(app);
  setupRouter(app);
  setupGlobDirectives(app);
  setupErrorHandle(app);

  app.mount('#app');
}

bootstrap();
