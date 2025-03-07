import { defineConfig } from 'tailwindcss'

export default defineConfig({
  theme: {
    extend: {
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #ffd700, #f0c14b, #d4af37, #b8860b)',
        'gold-gradient2': 'linear-gradient(135deg, #ffd700, #e6b800, #b8860b, #8b6914)'
      },
      borderColor: {
        'light': '#6b7280',
      },
      backgroundColor: {
        'light': '#1e1e1e'
      },
      textColor: {
        'my-gold': '#f0c14b'
      },
    },
  },
})
