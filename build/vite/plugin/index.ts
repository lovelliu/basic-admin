import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';
import vueJsx from '@vitejs/plugin-vue-jsx';
import purgeIcons from 'vite-plugin-purge-icons';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import { configStyleImportPlugin } from './styleImport';
import { configHtmlPlugin } from './html';
import { configSvgIconsPlugin } from './svgSprite';
import { configThemePlugin } from './theme';
import { configHmrPlugin } from './hmr';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[])[] = [vue(), vueJsx(), vueSetupExtend()];

  vitePlugins.push(WindiCSS());
  vitePlugins.push(configStyleImportPlugin(isBuild));
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));
  vitePlugins.push(configSvgIconsPlugin(isBuild));
  vitePlugins.push(configThemePlugin(isBuild));
  vitePlugins.push(purgeIcons());
  !isBuild && vitePlugins.push(configHmrPlugin);

  return vitePlugins;
}
