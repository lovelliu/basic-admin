import '/@/design/index.less';
import { createApp } from 'vue';
import App from './App.vue';
import 'virtual:windi.css';
import 'virtual:svg-icons-register';

if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less');
}

const app = createApp(App);
app.mount('#app');
