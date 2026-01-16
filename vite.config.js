import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Digital Pantry',
        short_name: 'Pantry',
        description: 'Keep track of your pantry items easily',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pantry-icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pantry-icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
