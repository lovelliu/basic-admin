import { createApp } from 'vue'
import { setupErrorHandle } from '@/logics/error-handle'
import { setupI18n } from '@/locales/setupI18n'
import { setupGlobDirectives } from '@/directives'
import { router, setupRouter } from '@/router'
import { initAppConfigStore } from '@/logics/initAppConfig'
import { registerGlobComp } from '@/components/registerGlobComp'
import { setupStore } from './store'
import App from './App.vue'
import { setupRouterGuard } from './router/guard'
import '@/design/index.less'
import 'uno.css'
import 'virtual:svg-icons-register'

async function bootstrap() {
  const app = createApp(App)

  setupStore(app)
  initAppConfigStore()
  registerGlobComp(app)
  await setupI18n(app)
  setupRouter(app)
  setupRouterGuard(router)
  setupGlobDirectives(app)
  setupErrorHandle(app)

  app.mount('#app')
}

bootstrap()
