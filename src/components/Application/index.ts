import { withInstall } from '/@/utils';

import appProvider from './src/AppProvider.vue';
import appLogo from './src/AppLogo.vue';

export { useAppProviderContext } from './src/useAppContext';

export const AppProvider = withInstall(appProvider);
export const AppLogo = withInstall(appLogo);
