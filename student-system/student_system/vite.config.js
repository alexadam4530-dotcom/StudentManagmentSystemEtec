import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // បង្កើតសញ្ញា @ ឱ្យតំណាងឱ្យថត src ក្នុងកុំព្យូទ័ររបស់អ្នក
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})