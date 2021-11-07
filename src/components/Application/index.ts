import { withInstall } from '/@/utils';

import appProvider from './src/AppProvider.vue';
import appLogo from './src/AppLogo.vue';
import appSearch from './src/search/AppSearch.vue';
import appLocalePicker from './src/ApplocalePicker.vue';

export { useAppProviderContext } from './src/useAppContext';

export const AppProvider = withInstall(appProvider);
export const AppLogo = withInstall(appLogo);
export const AppSearch = withInstall(appSearch);
export const AppLocalePicker = withInstall(appLocalePicker);
