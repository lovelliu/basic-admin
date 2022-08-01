import {
  defineConfig,
  toEscapedSelector as e,
  presetAttributify,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import { primaryColor } from './build/config/themeConfig';

/**
 * Used for animation when the element is displayed
 * @param maxOutput The larger the maxOutput output, the larger the generated css volume
 */
function createEnterRules(selector: string, direction = 'x', maxOutput = 6) {
  let outputValue = '';
  for (let i = 1; i < maxOutput; i++) {
    outputValue += `
      ${selector}:nth-child(${i}) {
        transform: translate${direction.toUpperCase()}(${selector.startsWith('-', 1) ? '-' : ''}50px);
        opacity: 0;
        animation: enter-${direction}-animation 0.4s ease-in-out 0.3s;
        animation-fill-mode: forwards;
        animation-delay: .${i}s;
      }`;
  }
  outputValue += `
      @keyframes enter-x-animation {
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      @keyframes enter-y-animation {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }`;
  return outputValue;
}
export default defineConfig({
  rules: [
    [/^enter-([x-y])$/, ([, d], { rawSelector }) => {
      const selector = e(rawSelector);
      return createEnterRules(selector, d);
    }],
  ],
  shortcuts: [
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    colors: {
      primary: primaryColor,
    },
    breakpoints: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1600px',
    },
  },
});
