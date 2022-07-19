import type { ConfigEnv, UserConfig } from 'vite';
import { resolve } from 'path';
import { loadEnv } from 'vite';
import { createVitePlugins } from './build/vite/plugin';
import { wrapperEnv } from './build/utils';
import { createProxy } from './build/vite/proxy';
import { OUTPUT_DIR } from './build/constants';
import { generateModifyVars } from './build/generate/generateModifyVars';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv;

  const isBuild = command === 'build';
  return {
    root,
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
        {
          find: /\/@\//,
          replacement: `${pathResolve('src')}/`,
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: `${pathResolve('types')}/`,
        },
      ],
    },
    server: {
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true,
        },
      },
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    build: {
      target: 'es2015',
      cssTarget: 'chrome86',
      outDir: OUTPUT_DIR,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2000,
    },
    optimizeDeps: {
      include: [
        '@vue/runtime-core',
        '@vue/shared',
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
      ],
    },
  };
};
