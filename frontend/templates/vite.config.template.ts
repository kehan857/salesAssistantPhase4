/**
 * Vite配置模板 - GitHub Pages部署
 *
 * 使用说明：
 * 1. 复制此文件到项目根目录：vite.config.ts
 * 2. 修改 BASE_PATH 为你的仓库名
 * 3. 根据需要调整其他配置
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// ⭐ 配置说明 ⭐
// GitHub Pages地址：https://username.github.io/repo-name/
// BASE_PATH必须设置为：'/repo-name/'
// 本地开发时不需要修改此配置
const BASE_PATH = '/salesAssistantPhase4/'

export default defineConfig({
  plugins: [react()],

  // ⭐ 关键配置：GitHub Pages必须设置base路径
  base: BASE_PATH,

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    port: 3000,
    host: true,
    // 开发服务器代理配置（可选）
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },

  // 构建优化配置
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // 生产环境不生成sourcemap
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          // 分包配置：将大型依赖单独打包
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react', '@radix-ui/react-icons'],
        }
      }
    },
    // chunk大小警告阈值（KB）
    chunkSizeWarningLimit: 1000
  },

  // 预览服务器配置（生产构建预览）
  preview: {
    port: 4173,
    host: true,
  },
})

/**
 * 📋 部署检查清单：
 *
 * 开发环境：
 * □ 运行 npm run dev 确保本地开发正常
 * □ 运行 npm run build 确保构建成功
 * □ 运行 npm run preview 预览生产构建
 *
 * 路由配置：
 * □ src/main.tsx 使用 HashRouter（不要用BrowserRouter）
 * □ 所有导航链接使用相对路径
 *
 * GitHub配置：
 * □ vite.config.ts 中 base 路径正确
 * □ .github/workflows/deploy.yml 配置正确
 * □ GitHub Pages Source 设置为 GitHub Actions
 *
 * 部署后验证：
 * □ 首页可以访问
 * □ 所有子页面可以正常跳转
 * □ 刷新页面不会404
 * □ 静态资源正常加载
 * □ 浏览器控制台无错误
 */
