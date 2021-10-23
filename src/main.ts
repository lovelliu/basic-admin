import { createApp } from 'vue';
import App from './App.vue';
import 'virtual:windi.css';

if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less');
}

const app = createApp(App);
app.mount('#app');
