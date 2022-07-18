import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import Unocss from 'unocss/vite';
import { configStyleImportPlugin } from './styleImport';
import { configHtmlPlugin } from './html';
import { configSvgIconsPlugin } from './svgSprite';
import { configThemePlugin } from './theme';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[])[] = [vue(), vueJsx(), vueSetupExtend()];

  vitePlugins.push(Unocss());
  vitePlugins.push(configStyleImportPlugin(isBuild));
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));
  vitePlugins.push(configSvgIconsPlugin(isBuild));
  vitePlugins.push(configThemePlugin(isBuild));

  return vitePlugins;
}
