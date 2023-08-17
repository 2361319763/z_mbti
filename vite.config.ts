import { resolve } from 'node:path';
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [
    AutoImport({
      dts: 'src/types/auto-imports.d.ts',
      imports: [
        'vue',
        'uni-app',
        'pinia'
      ],
      exclude: ['createApp'],
      eslintrc: {
        enabled: true
      }
    }),
    uni(),
    UnoCSS()
  ],
  server: {
    open: true, // 自动打开
    base: './ ', // 生产环境路径
  }
});
