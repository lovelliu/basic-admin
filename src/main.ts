import '/@/design/index.less';
import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from './store';
import 'virtual:windi.css';
import 'virtual:svg-icons-register';
import { setupI18n } from '/@/locales/setupI18n';
import { setupRouter } from '/@/router';

if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less');
}

async function bootstrap() {
  const app = createApp(App);

  setupStore(app);
  setupRouter(app);
  await setupI18n(app);

  app.mount('#app');
}

bootstrap();
