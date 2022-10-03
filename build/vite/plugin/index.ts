import type { Plugin } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Unocss from 'unocss/vite'
import { configStyleImportPlugin } from './styleImport'
import { configHtmlPlugin } from './html'
import { configSvgIconsPlugin } from './svgSprite'
import { configThemePlugin } from './theme'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[])[] = [vue(), vueJsx(), vueSetupExtend()]

  vitePlugins.push(VueI18n({ runtimeOnly: true, compositionOnly: true, include: [path.resolve(process.cwd(), 'src/locales/lang/**')] }))
  vitePlugins.push(Unocss())
  vitePlugins.push(configStyleImportPlugin(isBuild))
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))
  vitePlugins.push(configSvgIconsPlugin(isBuild))
  vitePlugins.push(configThemePlugin(isBuild))

  return vitePlugins
}
