import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

const srcPath = path.resolve(__dirname, 'src')

export default defineConfig({
  plugins: [
    vue(),
    Icons({ compiler: 'vue3' }),
    AutoImport({
      dts: path.resolve(srcPath, 'auto-imports.d.ts'),
      imports: ['vue', 'vue-router']
    }),
    Components({
      dts: path.resolve(srcPath, 'components.d.ts'),
      resolvers: [
        IconsResolver({
          prefix: 'icon'
        })
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [autoprefixer({})]
    }
  },
  server: {
    open: true
  }
})
