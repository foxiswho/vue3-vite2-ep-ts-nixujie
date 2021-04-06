import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// import defaultSettings from '@/settings'

export default defineConfig({
  publicDir:'public',
  resolve: {
    alias: [
      {find: '@', replacement: path.resolve(__dirname, 'src')}
    ]
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    port: 3005
  },
  build: {
    sourcemap: true,
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'element-plus': ['element-plus'],
          echarts: ['echarts']
        }
      }
    },
    chunkSizeWarningLimit: 600
  },
  optimizeDeps: {
    // include: ['axios', 'nprogress', 'mockjs']
  },
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [
        require('autoprefixer'),
        require('tailwindcss'),
        require('postcss-nested'),
        require('postcss-simple-vars'),
        require('postcss-import')
      ]
    }
  }
})
