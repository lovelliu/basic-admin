import type { LoadingProps } from './types'
import type { Ref } from 'vue'

import { unref } from 'vue'
import { createLoading } from './createLoading'

export interface UseLoadingOptions {
  target?: any
  props?: Partial<LoadingProps>
}

interface Fn {
  (): void
}

export function useLoading(
  opt: Partial<LoadingProps> | Partial<UseLoadingOptions>,
): [Fn, Fn, (tip: string) => void] {
  let props: Partial<LoadingProps>
  let target: HTMLElement | Ref<ElRef> = document.body

  if ('target' in opt || 'props' in opt) {
    const options = opt as Partial<UseLoadingOptions>
    props = options.props || {}
    target = options.target || document.body
  }
  else {
    props = opt as Partial<LoadingProps>
  }

  const instance = createLoading(props, undefined, true)

  const open = () => {
    const t = unref(target as Ref<ElRef>)
    if (!t)
      return
    instance.open(t)
  }

  const close = () => {
    instance.close()
  }

  const setTip = (tip: string) => {
    instance.setTip(tip)
  }

  return [open, close, setTip]
}
