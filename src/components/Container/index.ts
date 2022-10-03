import { withInstall } from '/@/utils'
import scrollContainer from './src/ScrollContainer.vue'
import collapseContainer from './src/collapse/CollapseContainer.vue'

export const CollapseContainer = withInstall(collapseContainer)
export const ScrollContainer = withInstall(scrollContainer)

export * from './src/typing'
