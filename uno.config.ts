import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'container': 'max-w-screen-xl mx-auto',
    'flex-center': 'flex justify-center items-center',
    'flex-between': 'flex justify-between items-center',
  },
  theme: {
    colors: {
      primary: '#1E88E5',
      second: '#00FFF4',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose'.split(' '),
})
