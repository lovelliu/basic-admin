import type { AxiosRequestConfig, Canceler } from 'axios'
import axios from 'axios'
import { isFunction } from '../is'

let pendingMap = new Map<string, Canceler>()

export const getPendingUrl = (config: AxiosRequestConfig) =>
  [config.method, config.url].join('&')

export class AxiosCanceler {
  /**
   * Add request
   * @param {Object} config
   */
  addPending(config: AxiosRequestConfig) {
    this.removePending(config)
    const url = getPendingUrl(config)
    config.cancelToken
      = config.cancelToken
      || new axios.CancelToken(cancel => {
        if (!pendingMap.has(url))
          pendingMap.set(url, cancel)
      })
  }

  /**
   * Removal request
   * @param {Object} config
   */
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config)

    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url)
      cancel && cancel(url)
      pendingMap.delete(url)
    }
  }

  /**
   * @description: Clear all pending
   */
  removeAllPending() {
    pendingMap.forEach(cancel => {
      cancel && isFunction(cancel) && cancel()
    })
    pendingMap.clear()
  }

  /**
   * @description: reset
   */
  reset() {
    pendingMap = new Map<string, Canceler>()
  }
}
