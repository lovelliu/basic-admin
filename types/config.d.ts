import {
  ContentEnum,
  PermissionModeEnum,
  RouterTransitionEnum,
  SessionTimeoutProcessingEnum,
  SettingButtonPositionEnum,
  ThemeEnum,
} from '@/enums/appEnum';
import { CacheTypeEnum } from '@/enums/cacheEnum';
import {
  MenuModeEnum,
  MenuTypeEnum,
  MixSidebarTriggerEnum,
  TriggerEnum,
} from '@/enums/menuEnum';

export type LocaleType = 'zh_CN' | 'ja' | 'en' | 'ru' | 'ko';

export interface MenuSetting {
  bgColor: string;
  fixed: boolean;
  collapsed: boolean;
  canDrag: boolean;
  show: boolean;
  hidden: boolean;
  split: boolean;
  menuWidth: number;
  mode: MenuModeEnum;
  type: MenuTypeEnum;
  theme: ThemeEnum;
  topMenuAlign: 'start' | 'center' | 'end';
  trigger: TriggerEnum;
  accordion: boolean;
  closeMixSidebarOnChange: boolean;
  collapsedShowTitle: boolean;
  mixSideTrigger: MixSidebarTriggerEnum;
  mixSideFixed: boolean;
}

export interface MultiTabsSetting {
  cache: boolean;
  show: boolean;
  showQuick: boolean;
  canDrag: boolean;
  showRedo: boolean;
  showFold: boolean;
}

export interface HeaderSetting {
  bgColor: string;
  fixed: boolean;
  show: boolean;
  theme: ThemeEnum;
  showFullScreen: boolean;
  useLockPage: boolean;
  showDoc: boolean;
  showNotice: boolean;
  showSearch: boolean;
}

export interface TransitionSetting {
  enable: boolean;
  basicTransition: RouterTransitionEnum;
  openPageLoading: boolean;
  openNProgress: boolean;
}

export interface ProjectConfig {
  permissionCacheType: CacheTypeEnum;
  showSettingButton: boolean;
  showDarkModeToggle: boolean;
  settingButtonPosition: SettingButtonPositionEnum;
  permissionMode: PermissionModeEnum;
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum;
  grayMode: boolean;
  colorWeak: boolean;
  themeColor: string;
  fullContent: boolean;
  contentMode: ContentEnum;
  showLogo: boolean;
  showFooter: boolean;
  headerSetting: HeaderSetting;
  menuSetting: MenuSetting;
  multiTabsSetting: MultiTabsSetting;
  transitionSetting: TransitionSetting;
  openKeepAlive: boolean;
  lockTime: number;
  showBreadCrumb: boolean;
  showBreadCrumbIcon: boolean;
  useErrorHandle: boolean;
  useOpenBackTop: boolean;
  canEmbedIFramePage: boolean;
  closeMessageOnSwitch: boolean;
  removeAllHttpPending: boolean;
}

export interface GlobConfig {
  title: string;
  apiUrl: string;
  uploadUrl?: string;
  urlPrefix?: string;
  shortName: string;
}

export interface GlobEnvConfig {
  VITE_GLOB_APP_TITLE: string;
  VITE_GLOB_API_URL: string;
  VITE_GLOB_API_URL_PREFIX?: string;
  // Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string;
  // Upload url
  VITE_GLOB_UPLOAD_URL?: string;
}

export interface LocaleSetting {
  showPicker: boolean;
  locale: LocaleType;
  fallback: LocaleType;
  availableLocales: LocaleType[];
}
