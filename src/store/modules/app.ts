import type { ProjectConfig } from '/#/config';

import { defineStore } from 'pinia';
import { store } from '..';
import { ThemeEnum } from '/@/enums/appEnum';
import { APP_DARK_MODE_KEY_, PROJ_CFG_KEY } from '/@/enums/cacheEnum';
import { Persistent } from '/@/utils/cache/persistent';
import { darkMode } from '/@/settings/designSetting';
import { deepMerge } from '/@/utils';
