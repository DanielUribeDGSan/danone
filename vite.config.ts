import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh';
import sass from 'sass';


export default defineConfig({
    css: {
      preprocessorOptions: {
        scss: {
          implementation: sass,
        },
      },
    },
    resolve: {
      alias: [
        { find: './runtimeConfig', replacement: './runtimeConfig.browser' },
        { find: '@', replacement: '/src' },
      ],
    },
    plugins: [react()]
  })