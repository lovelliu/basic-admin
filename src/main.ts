import '/@/design/index.less';
import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from './store';
import 'virtual:windi.css';
import 'virtual:svg-icons-register';

if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less');
}

async function bootstrap() {
  const app = createApp(App);

  setupStore(app);

  app.mount('#app');
}

bootstrap();
