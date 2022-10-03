import type { CreateStorageParams } from './storageCache'

import { getStorageShortName } from '../env'
import { createStorage } from './storageCache'
import { DEFAULT_CACHE_TIME, enableStorageEncryption } from '/@/settings/encryptionSetting'

export type Options = Partial<CreateStorageParams>

const createOptions = (storage: Storage, options: Options = {}): Options => {
  return {
    hasEncrypt: enableStorageEncryption,
    storage,
    prefixKey: getStorageShortName(),
    ...options,
  }
}

export const WebStorage = createStorage(createOptions(sessionStorage))

export const createSessionStorage = (options: Options = {}) => {
  return createStorage(createOptions(sessionStorage, { ...options, timeout: DEFAULT_CACHE_TIME }))
}

export const createLocalStorage = (options: Options = {}) => {
  return createStorage(createOptions(localStorage, { ...options, timeout: DEFAULT_CACHE_TIME }))
}

export default WebStorage
