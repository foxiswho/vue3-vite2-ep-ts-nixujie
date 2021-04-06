import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import envVite from './vite-env'

// import defaultSettings from '@/settings'
// https://vitejs.dev/config/
// @ts-ignore
export default ({ mode }) => defineConfig({
  publicDir: 'public',
  // base:'/', //默认顶级目录
  //base:'/vue3-vite2-ep-ts-nixujie', //二级目录
  resolve: {
    alias: [
      {find: '@', replacement: path.resolve(__dirname, 'src')}
    ]
  },
  server: {
    proxy: {
      '/api': {
        target: envVite(mode).appBaseUrl() || 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    port: envVite(mode).port()
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
  plugins: [vue(),],
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
