# 销售AI助手四期 - 智能销售闭环系统

基于Agentic AI的智能销售闭环生态系统，集成天九系统与销售智能体，实现全流程自动化销售管理。

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 构建和预览

```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 访问 http://localhost:4173
```

## 📦 GitHub Pages 部署

### ⚡ 快速部署（5分钟）

#### 1️⃣ 确认配置

运行自动检查脚本：
```bash
./scripts/check-deploy.sh
```

#### 2️⃣ 推送代码

```bash
git add .
git commit -m "feat: your changes"
git push origin main
```

#### 3️⃣ 访问网站

等待2-3分钟，访问：https://kehan857.github.io/salesAssistantPhase4/

---

### 🔧 关键配置（⚠️ 必须正确）

#### vite.config.ts
```typescript
export default defineConfig({
  base: '/salesAssistantPhase4/',  // ⭐ 必须添加
  // ...
})
```

#### src/main.tsx
```tsx
import { HashRouter } from 'react-router-dom'  // ⭐ 必须使用HashRouter

<HashRouter>
  <App />
</HashRouter>
```

---

### 📚 完整部署指南

查看详细文档：[docs/GITHUB_PAGES_DEPLOYMENT.md](./docs/GITHUB_PAGES_DEPLOYMENT.md)

包含内容：
- ✅ 配置检查清单
- 🐛 常见问题排查
- 📝 最佳实践
- 🔧 故障排除流程

---

## 🏗️ 项目结构

```
frontend/
├── src/
│   ├── app/              # 页面组件
│   │   ├── dashboard/    # 主控台
│   │   ├── customers/    # 客户管理
│   │   ├── conversations/# 对话管理
│   │   ├── leads/        # 线索管理
│   │   ├── nurture/      # 培育计划
│   │   ├── knowledge/    # 知识库
│   │   ├── agents/       # 智能体管理
│   │   ├── analytics/    # 数据分析
│   │   ├── settings/     # 系统设置
│   │   └── help/         # 帮助中心
│   ├── components/       # 通用组件
│   │   ├── ui/          # 基础UI组件
│   │   ├── layouts/     # 布局组件
│   │   ├── copilot/     # AI助手组件
│   │   └── dialogs/     # 弹窗组件
│   ├── lib/             # 工具库
│   │   ├── api/        # API客户端
│   │   ├── mock-data.ts # Mock数据
│   │   ├── types.ts    # 类型定义
│   │   └── utils.ts    # 工具函数
│   └── styles/          # 样式文件
├── docs/                # 文档
├── scripts/             # 脚本工具
├── templates/           # 配置模板
└── public/             # 静态资源
```

---

## 🎯 核心功能

### 1. 客户管理
- 客户池/我的客户双视图
- 客户分配与退回
- 客户评分与标签管理
- 来源追踪与转化分析

### 2. 对话管理
- 多渠道对话整合（微信、邮件、电话）
- 实时AI辅助建议
- BANT信息自动提取
- 情感分析与风险评估

### 3. 线索管理
- 7天智能培育计划
- 自动跟进提醒
- 线索评分与优先级
- 转化漏斗分析

### 4. 培育计划
- 标准SOP流程
- 行为触发机制
- A/B测试能力
- 效果追踪报告

### 5. 智能体管理
- 模型配置（OpenAI/Claude/自定义）
- 工作模式切换（辅助/自动/手动）
- 性能监控与优化
- 提示词模板管理

### 6. 知识库
- 产品资料管理
- 成功案例库
- 常见问题FAQ
- 实时搜索与推荐

### 7. 数据分析
- 销售漏斗分析
- 转化率趋势
- AI效果评估
- 团队绩效对比

---

## 🔌 系统集成

### 天九系统集成
- 客户数据同步
- 对话记录同步
- 知识库对接
- SSO单点登录

### 销售智能体对接
- 三种工作模式：
  - **AI辅助模式**: AI提供回复建议，人工确认发送
  - **自动回复模式**: AI自动回复，人工审核
  - **手动主导模式**: 人工主导，AI仅在后台分析
- 实时流式响应
- 上下文记忆管理

---

## 🛠️ 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite 5
- **路由**: React Router v6 (HashRouter)
- **状态管理**: Zustand + React Query
- **UI组件**: Radix UI + Tailwind CSS
- **图表**: Recharts
- **图标**: Lucide React
- **HTTP客户端**: Axios
- **代码规范**: ESLint + Prettier

---

## 📊 项目评估

| 模块 | 功能点 | 工作量(人日) |
|------|--------|-------------|
| 天九系统集成 | 客户、对话、知识库、SSO | 32 |
| 智能体管理 | 配置、对接、监控、优化 | 28 |
| BANT分析 | 提取、校验、可视化、历史 | 18 |
| 情感分析 | 实时、预警、报告、归因 | 15 |
| 培育计划 | SOP、触发、A/B、追踪 | 32 |
| 冠军克隆 | 模板、A/B、集成、分析 | 20 |
| 知识进化 | 回流、标注、评估、更新 | 18 |
| 数据看板 | 实时、漏斗、对比、AI | 25 |
| 系统架构 | 模块化、监控、部署、文档 | 35 |
| **总计** | **23个模块** | **223人日** |

---

## 🐛 常见问题

### Q: GitHub Pages资源404？
**A:** 检查 `vite.config.ts` 中的 `base` 配置是否正确。

### Q: 刷新页面404？
**A:** 确保使用 `HashRouter` 而不是 `BrowserRouter`。

### Q: 本地正常但部署后空白？
**A:** 打开浏览器控制台查看错误，通常是：
- 环境变量未配置
- API请求失败（CORS）
- 资源路径错误

更多问题排查：[常见问题文档](./docs/GITHUB_PAGES_DEPLOYMENT.md#🐛-常见问题排查)

---

## 📝 更新日志

### v2.4.0 (2025-01-14)
- ✅ 添加天九系统集成支持
- ✅ 新增智能体管理页面
- ✅ 实现客户管理功能
- ✅ 完善培育计划系统
- ✅ 配置GitHub Pages自动部署
- ✅ 添加HashRouter支持
- ✅ 创建部署检查脚本

---

## 🤝 贡献指南

1. Fork本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

---

## 📄 许可证

本项目采用企业许可证 - 详见 LICENSE 文件

---

## 📞 联系方式

- 项目地址: [https://github.com/kehan857/salesAssistantPhase4](https://github.com/kehan857/salesAssistantPhase4)
- 在线预览: [https://kehan857.github.io/salesAssistantPhase4](https://kehan857.github.io/salesAssistantPhase4)

---

## ⭐ Star History

如果这个项目对你有帮助，请给个Star⭐️

---

**记住：配置一次，长期受益！** 🎉
