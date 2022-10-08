import type { ExtractPropTypes } from 'vue'
import { withInstall } from '@/utils'
import button from './src/BasicButton.vue'
import popConfirmButton from './src/PopConfirmButton.vue'

export const Button = withInstall(button)
export const PopConfirmButton = withInstall(popConfirmButton)
interface buttonProps {
  color?: 'error' | 'warning' | 'success' | ''
  loading?: boolean
  disabled?: boolean
  /**
   * Text before icon.
   */
  preIcon?: string
  /**
   * Text after icon.
   */
  postIcon?: string
  /**
   * preIcon and postIcon icon size.
   * @default: 14
   */
  iconSize?: number
  onClick?: (e: MouseEvent) => void
}

export declare type ButtonProps = Partial<ExtractPropTypes<buttonProps>>
