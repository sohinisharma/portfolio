import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const customConfig = defineConfig({
  globalCss: {
    'html, body': {
      bg: '#080d1a',
      color: 'white',
      fontFamily: "'Inter', sans-serif",
    },
  },
  theme: {
    tokens: {
      colors: {
        brand: {
          purple:  { value: '#6c63ff' },
          cyan:    { value: '#00d4ff' },
          pink:    { value: '#ff6b9d' },
          bgPrimary:   { value: '#080d1a' },
          bgSecondary: { value: '#0d1530' },
          bgCard:      { value: 'rgba(255,255,255,0.04)' },
          border:      { value: 'rgba(108,99,255,0.22)' },
          textSub:     { value: '#a0aec0' },
          textMuted:   { value: '#718096' },
        },
      },
      fonts: {
        heading: { value: "'Outfit', sans-serif" },
        body:    { value: "'Inter', sans-serif" },
      },
      radii: {
        card: { value: '16px' },
      },
    },
    semanticTokens: {
      colors: {
        'bg.primary':   { value: '{colors.brand.bgPrimary}' },
        'bg.secondary': { value: '{colors.brand.bgSecondary}' },
        'bg.card':      { value: '{colors.brand.bgCard}' },
        'border.brand': { value: '{colors.brand.border}' },
        'text.sub':     { value: '{colors.brand.textSub}' },
        'text.muted':   { value: '{colors.brand.textMuted}' },
      },
    },
  },
})

export const system = createSystem(defaultConfig, customConfig)
