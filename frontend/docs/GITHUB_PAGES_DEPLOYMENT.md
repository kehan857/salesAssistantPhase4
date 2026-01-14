# GitHub Pages 部署指南 - Vite + React + TypeScript

本文档总结了在GitHub Pages上部署Vite + React项目的完整流程和常见陷阱。

## 📋 前置检查清单

在开始部署前，请确保以下配置已完成：

- [ ] **Vite配置** - 添加base路径
- [ ] **路由配置** - 使用HashRouter
- [ ] **GitHub Actions** - 配置自动部署workflow
- [ ] **TypeScript配置** - 确保编译通过
- [ ] **环境变量** - 配置正确的API地址

---

## 🔧 关键配置步骤

### 1️⃣ Vite配置 (vite.config.ts)

**⚠️ 必须添加base路径，否则资源文件404**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  // ⭐ 关键配置：base路径必须与仓库名一致
  base: '/your-repo-name/',  // 替换为你的仓库名

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
})
```

**如何确定base路径：**
- GitHub Pages地址：`https://username.github.io/repo-name/`
- base配置：`'/repo-name/'`
- 本地开发不需要修改，只在生产环境生效

---

### 2️⃣ 路由配置 (src/main.tsx)

**⚠️ 必须使用HashRouter，BrowserRouter会在刷新时404**

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
// ❌ 错误：GitHub Pages不支持BrowserRouter
// import { BrowserRouter } from 'react-router-dom'
// ✅ 正确：使用HashRouter
import { HashRouter } from 'react-router-dom'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
```

**为什么使用HashRouter？**
- GitHub Pages是静态托管，不支持服务端路由
- BrowserRouter访问子路径（如 `/dashboard`）会返回404
- HashRouter使用URL hash（如 `#/dashboard`），完全在客户端处理
- 用户访问URL示例：`https://username.github.io/repo-name/#/dashboard`

---

### 3️⃣ GitHub Actions工作流 (.github/workflows/deploy.yml)

**完整的自动部署配置：**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

### 4️⃣ TypeScript配置 (tsconfig.json)

**如果遇到类型错误，可以临时放宽限制：**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting - 项目稳定后建议开启严格模式 */
    "strict": false,  // ⚠️ 临时关闭，修复问题后建议改为true
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,

    /* Path mapping */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

### 5️⃣ 环境变量配置

**创建.env文件（可选）：**

```env
VITE_API_BASE_URL=https://your-api.com/api
VITE_WS_BASE_URL=wss://your-api.com/ws
```

**类型定义 (src/env.d.ts)：**

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_WS_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

---

## 🚀 本地验证流程

在推送到GitHub前，务必在本地验证：

```bash
# 1. 安装依赖
npm install

# 2. 本地构建测试
npm run build

# 3. 预览生产构建（模拟GitHub Pages）
npm run preview

# 4. 在浏览器中打开 http://localhost:4173
#    检查所有页面是否正常加载
```

**注意：**
- `npm run preview` 使用的是生产构建，与GitHub Pages完全一致
- 如果预览时资源加载失败，检查vite.config.ts中的base配置
- 如果路由跳转404，检查是否使用了HashRouter

---

## 📤 首次部署步骤

### 1️⃣ 初始化Git仓库

```bash
git init
git add .
git commit -m "Initial commit"
```

### 2️⃣ 创建GitHub仓库并推送

```bash
# 添加远程仓库
git remote add origin https://github.com/username/repo-name.git

# 推送到GitHub
git branch -M main
git push -u origin main
```

### 3️⃣ 启用GitHub Pages

1. 访问仓库的 **Settings** → **Pages**
2. **Source** 选择 **GitHub Actions**
3. 保存后，Actions会自动触发部署

### 4️⃣ 验证部署

```bash
# 查看Actions运行状态
gh run list --repo username/repo-name

# 或在浏览器访问
# https://github.com/username/repo-name/actions
```

等待2-3分钟，访问你的GitHub Pages地址：
- https://username.github.io/repo-name/

---

## 🐛 常见问题排查

### 问题1：资源文件404

**症状：**
```
GET https://username.github.io/assets/index-xxx.js net::ERR_ABORTED 404
```

**原因：** vite.config.ts缺少base配置

**解决：**
```typescript
// vite.config.ts
export default defineConfig({
  base: '/repo-name/',  // ⭐ 添加这行
})
```

---

### 问题2：刷新页面404

**症状：**
- 首页可以访问
- 点击链接跳转正常
- 但刷新任何子页面都404

**原因：** 使用了BrowserRouter，GitHub Pages不支持服务端路由

**解决：**
```tsx
// src/main.tsx
import { HashRouter } from 'react-router-dom'  // ⭐ 改用HashRouter
```

---

### 问题3：页面空白

**症状：** 页面完全空白，控制台有错误

**排查步骤：**
1. 打开浏览器开发者工具（F12）
2. 查看Console标签的错误信息
3. 查看Network标签，确认所有资源是否正常加载

**常见原因：**
- JavaScript错误：检查代码逻辑
- 资源路径错误：检查vite.config.ts的base配置
- API请求失败：检查CORS配置和环境变量

---

### 问题4：GitHub Actions构建失败

**症状：** Actions显示红色❌

**解决：**
1. 点击失败的Workflow查看详细日志
2. 常见错误：
   - **TypeScript编译错误**：修复类型错误或临时关闭strict模式
   - **依赖安装失败**：检查package.json中的依赖版本
   - **构建超时**：检查是否有死循环或性能问题

---

### 问题5：样式丢失

**症状：** 页面内容显示但样式异常

**原因：** CSS文件路径错误

**解决：**
1. 确认vite.config.ts中有正确的base配置
2. 检查index.html中的CSS引用路径是否包含base前缀
3. 清除浏览器缓存后重试

---

## ✅ 部署成功检查清单

部署完成后，请验证以下项目：

- [ ] 首页可以正常访问
- [ ] 所有子页面可以正常跳转
- [ ] 刷新任何页面都不会404
- [ ] 所有静态资源（JS、CSS、图片）正常加载
- [ ] 浏览器控制台无错误信息
- [ ] 移动端和桌面端都显示正常
- [ ] API请求正常（如果有后端对接）

---

## 📚 最佳实践

### 1. 开发流程

```bash
# 1. 创建功能分支
git checkout -b feature/new-feature

# 2. 开发并测试
npm run dev

# 3. 本地构建验证
npm run build && npm run preview

# 4. 提交并推送
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# 5. 合并到main分支（触发自动部署）
gh pr create --base main
```

### 2. 版本管理

在package.json中管理版本号：

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

### 3. 性能优化

- 使用动态导入减少初始包大小
- 启用代码分割（Vite默认启用）
- 优化图片资源（使用WebP格式）
- 配置合理的缓存策略

### 4. 安全性

- 不要在代码中硬编码敏感信息
- 使用环境变量管理API密钥
- 定期更新依赖包
- 配置CORS策略

---

## 🔗 相关资源

- [Vite官方文档](https://vitejs.dev/)
- [React Router文档](https://reactrouter.com/)
- [GitHub Pages文档](https://docs.github.com/en/pages)
- [GitHub Actions文档](https://docs.github.com/en/actions)
- [TypeScript文档](https://www.typescriptlang.org/)

---

## 📝 更新日志

- **2025-01-14**: 创建文档，总结GitHub Pages部署完整流程
- 涵盖Vite + React + TypeScript + GitHub Actions的最佳实践

---

## 💡 贡献

如果发现文档有遗漏或错误，欢迎提交PR改进！

**记住：配置一次，长期受益！** 🎉
