import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // Relative asset paths so the build works on GitHub Pages at the root
  // (username.github.io) or under a sub-path.
  base: './',
})
