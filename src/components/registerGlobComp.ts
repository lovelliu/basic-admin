import type { App } from 'vue';
import { Input, Layout } from 'ant-design-vue';
import { Button } from './Button';

export function registerGlobComp(app: App) {
  app.use(Input).use(Button).use(Layout);
}
