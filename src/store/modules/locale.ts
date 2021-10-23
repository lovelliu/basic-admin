import type { LocaleSetting, LocaleType } from '/#/config';

import { defineStore } from 'pinia';
import { store } from '..';

import { LOCALE_KEY } from '/@/enums/cacheEnum';
import { createLocalStorage } from '/@/utils/cache';
