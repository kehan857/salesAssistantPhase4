# GitHub Pages 部署 - 快速参考卡片

## ⚡ 5分钟快速部署

```bash
# 1. 运行检查
./scripts/check-deploy.sh

# 2. 推送代码
git add .
git commit -m "feat: updates"
git push origin main

# 3. 等待2-3分钟，访问网站
# https://kehan857.github.io/salesAssistantPhase4/
```

---

## 🔑 关键配置（3个必选项）

### 1. vite.config.ts
```typescript
export default defineConfig({
  base: '/your-repo-name/',  // ⭐ 必须添加
})
```

### 2. src/main.tsx
```tsx
import { HashRouter } from 'react-router-dom'  // ⭐ 必须使用
```

### 3. .github/workflows/deploy.yml
```yaml
# ⭐ 必须创建此文件
# 内容见 docs/GITHUB_PAGES_DEPLOYMENT.md
```

---

## 🐛 常见问题速查

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 资源404 | 缺少base配置 | vite.config.ts添加base |
| 刷新404 | 使用BrowserRouter | 改用HashRouter |
| 页面空白 | JS错误 | 查看控制台错误信息 |
| 样式丢失 | CSS路径错误 | 检查base配置 |

---

## 📋 部署检查清单

```
□ vite.config.ts 有 base: '/repo-name/'
□ src/main.tsx 使用 HashRouter
□ .github/workflows/deploy.yml 已配置
□ npm run build 成功
□ npm run preview 正常
□ GitHub Pages Source = GitHub Actions
```

---

## 🔗 完整文档

[查看完整部署指南](./GITHUB_PAGES_DEPLOYMENT.md)

---

## 💡 记住

> **配置一次，长期受益！** 🎉

每次部署前运行 `./scripts/check-deploy.sh` 即可。
