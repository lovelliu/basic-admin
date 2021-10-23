import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';
import vueJsx from '@vitejs/plugin-vue-jsx';
// import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import { configStyleImportPlugin } from './styleImport';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[])[] = [vue(), vueJsx()];

  vitePlugins.push(WindiCSS());
  vitePlugins.push(configStyleImportPlugin(isBuild));

  return vitePlugins;
}
