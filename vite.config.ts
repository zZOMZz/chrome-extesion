import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.config.ts'
import type { Plugin } from 'vite'
import svgr from 'vite-plugin-svgr'

const viteManifestHackIssue846: Plugin & { renderCrxManifest: (manifest: any, bundle: any) => void } = {
  // Workaround from https://github.com/crxjs/chrome-extension-tools/issues/846#issuecomment-1861880919.
  name: 'manifestHackIssue846',
  renderCrxManifest(_manifest, bundle) {
    bundle['manifest.json'] = bundle['.vite/manifest.json']
    bundle['manifest.json'].fileName = 'manifest.json'
    delete bundle['.vite/manifest.json']
  },
}


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteManifestHackIssue846, svgr() , crx({ manifest })],
  build: {
    rollupOptions: {
      input: 'src/main.tsx', // 指定入口文件
      output: {
        // entryFileNames: "drawer-app.js", // 自定义输出文件名
        dir: "chrome-extension/dist", // 输出目录
        format: "cjs", // 输出格式
        // name: "DrawerApp", // 导出的全局变量名（如果需要）,
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name]",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
  define: {
    'process.env': {} // 模拟空的 process.env 对象
  },
  resolve: {
    alias: {
      '@': "src/" // 设置 `@` 指向 `src` 目录
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://dev06.se.tjcorp.qihoo.net:8000', // 目标后端服务器
        changeOrigin: true,            // 更改请求的源头为目标服务器
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径：将 `/api` 前缀移除
      },
    }
  }
})
