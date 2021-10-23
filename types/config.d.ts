export type LocaleType = 'zh_CN' | 'ja' | 'en' | 'ru' | 'ko';

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
