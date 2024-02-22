import { defineConfig, loadEnv } from 'vite'
import path from 'node:path'

import viteRequireTransform from 'vite-plugin-require-transform'

import rollupCommonjs from '@rollup/plugin-commonjs'
import { visualizer as rollupVisualizer } from 'rollup-plugin-visualizer'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const resolve = (_path) => {
  return path.resolve(__dirname, _path)
  // return fileURLToPath(new URL(path, import.meta.url))
}

const name = 'BrowserInfo'

export default defineConfig(({ mode, ssrBuild, command }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const devPlugin = []
  if (command === 'serve') {
    devPlugin.push(vue(), vueJsx())
  }
  return {
    publicDir: command === 'serve' ? './demo/public' : '',
    server: {
      host: '0.0.0.0',
      port: 11230
    },
    resolve: {
      alias: [
        {
          find: '@', // 别名
          replacement: resolve('src') // 别名对应地址
        }
      ]
    },
    plugins: [
      ...devPlugin,
      rollupCommonjs(),
      // viteRequireTransform({
      //   fileRegex: /.js$|.jsx$|.ts$|.tsx$/
      // }),

      // 打包分析插件建议放到最后
      rollupVisualizer({
        emitFile: false,
        filename: 'report.html' //分析图生成的文件名
        // open: true //如果存在本地服务端口，将在打包后自动展示
      })
    ],
    build: {
      sourcemap: command === 'serve',
      lib: {
        entry: './src/main.js',
        name,
        fileName: 'index'
      }
    }
  }
})
