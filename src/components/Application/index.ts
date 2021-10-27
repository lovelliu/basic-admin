import { withInstall } from '/@/utils';
import appProvider from './src/AppProvider.vue';
export { useAppProviderContext } from './src/useAppContext';

export const AppProvider = withInstall(appProvider);
