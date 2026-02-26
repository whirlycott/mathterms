import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        museum: {
          teal:    { value: '#2C7A7B' },
          cream:   { value: '#FAF3E0' },
          ochre:   { value: '#C9A84C' },
          burgundy:{ value: '#7B2D3E' },
          slate:   { value: '#4A5568' },
          paper:   { value: '#F5ECD7' },
        },
      },
      fonts: {
        heading: { value: 'Georgia, "Times New Roman", serif' },
        body:    { value: '"Helvetica Neue", Helvetica, Arial, sans-serif' },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: { value: '{colors.museum.cream}' },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
