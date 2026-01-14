# 销售AI助手前端架构设计文档

**版本**: v2.0
**更新日期**: 2026-01-14
**基于**: 天九系统集成设计方案

---

## 📋 目录

1. [前端架构概览](#前端架构概览)
2. [页面结构设计](#页面结构设计)
3. [组件体系设计](#组件体系设计)
4. [状态管理设计](#状态管理设计)
5. [API集成方案](#api集成方案)
6. [天九系统对接](#天九系统对接)

---

## 🎨 前端架构概览

### 技术栈

```typescript
interface TechStack {
  // 框架层
  framework: {
    core: "React 18.3",
    language: "TypeScript 5.3",
    router: "React Router 6.21"
  };

  // 状态管理
  stateManagement: {
    client: "Zustand 4.4",        // 客户端状态
    server: "React Query 5.17",   // 服务端状态
    form: "React Hook Form"       // 表单状态
  };

  // UI层
  ui: {
    components: "Radix UI",       // 无样式组件库
    styling: "Tailwind CSS",      // 原子化CSS
    icons: "Lucide React",        // 图标库
    charts: "Recharts",           // 图表库
    animations: "Framer Motion"   // 动画库(可选)
  };

  // 通信层
  communication: {
    http: "Axios",                // HTTP客户端
    websocket: "Socket.io",       // 实时通信
    realtime: "Supabase/Ably"     // 实时数据(可选)
  };
}
```

### 项目结构

```
frontend/src/
├── app/                          # 页面模块
│   ├── dashboard/               # 主控台
│   ├── customers/               # 客户管理(新增)
│   ├── conversations/           # 对话管理
│   ├── leads/                   # 线索管理
│   ├── nurture/                 # 培育计划(新增)
│   ├── knowledge/               # 知识库管理
│   ├── agents/                  # 智能体管理(新增)
│   ├── analytics/               # 数据分析
│   └── settings/                # 系统设置
├── components/
│   ├── layouts/                 # 布局组件
│   │   ├── MainLayout.tsx       # 主布局
│   │   └── CopilotLayout.tsx    # Copilot布局
│   ├── copilot/                 # AI助手组件
│   │   ├── CopilotSidebar.tsx   # 侧边栏助手
│   │   ├── ChatInput.tsx        # 聊天输入
│   │   ├── BANTPanel.tsx        # BANT面板(新增)
│   │   ├── SuggestionCard.tsx   # 建议卡片(新增)
│   │   └── SentimentIndicator.tsx # 情感指示器(新增)
│   ├── agents/                  # 智能体组件(新增)
│   │   ├── AgentConfig.tsx      # 智能体配置
│   │   ├── AgentSwitch.tsx      # 智能体切换
│   │   └── AgentMode.tsx        # 工作模式
│   ├── customers/               # 客户组件(新增)
│   │   ├── CustomerCard.tsx     # 客户卡片
│   │   ├── CustomerTable.tsx    # 客户列表
│   │   └── CustomerPool.tsx     # 公海池
│   ├── nurture/                 # 培育组件(新增)
│   │   ├── NurtureTimeline.tsx  # 培育时间线
│   │   ├── NurtureDayCard.tsx   # 每日任务卡片
│   │   └── NurtureSettings.tsx  # 培育设置
│   ├── ui/                      # 基础UI组件
│   ├── dialogs/                 # 对话框组件
│   └── charts/                  # 图表组件
├── lib/
│   ├── api/                     # API客户端(新增)
│   │   ├── tianjiu.ts           # 天九系统API
│   │   ├── phase4.ts            # 四期系统API
│   │   └── agent.ts             # 智能体API
│   ├── stores/                  # 状态管理(新增)
│   │   ├── authStore.ts         # 认证状态
│   │   ├── customerStore.ts     # 客户状态
│   │   ├── conversationStore.ts # 对话状态
│   │   ├── agentStore.ts        # 智能体状态
│   │   └── nurtureStore.ts      # 培育状态
│   ├── hooks/                   # 自定义Hooks
│   ├── types.ts                 # 类型定义
│   └── utils.ts                 # 工具函数
├── styles/                      # 样式文件
│   └── globals.css              # 全局样式
├── App.tsx                      # 应用入口
└── main.tsx                     # React入口
```

---

## 📄 页面结构设计

### 页面路由表

| 路径 | 页面名称 | 说明 | 优先级 |
|------|----------|------|--------|
| `/` | 重定向 | → /dashboard | - |
| `/dashboard` | 主控台 | 数据概览、快速操作 | P0 |
| `/customers` | 客户管理 | 公海池、我的客户、客户分配 | P0 |
| `/customers/pool` | 公海池 | 未分配客户 | P0 |
| `/customers/my` | 我的客户 | 销售名下客户 | P0 |
| `/customers/:id` | 客户详情 | 客户完整信息 | P1 |
| `/conversations` | 对话管理 | 对话列表、实时对话 | P0 |
| `/conversations/:id` | 对话详情 | 完整对话历史、AI建议 | P0 |
| `/leads` | 线索管理 | 线索列表、跟进状态 | P0 |
| `/nurture` | 培育计划 | 7天标准SOP、培育任务 | P0 |
| `/nurture/:id` | 培育详情 | 单个客户培育进度 | P1 |
| `/knowledge` | 知识库 | Q&A管理、智能搜索 | P0 |
| `/agents` | 智能体管理 | 智能体配置、参数设置 | P0 |
| `/analytics` | 数据分析 | 详细数据统计、报表 | P1 |
| `/settings` | 系统设置 | 个人设置、系统配置 | P1 |

### 页面功能矩阵

```typescript
interface PageFeatures {
  dashboard: {
    core: [
      '数据统计卡片',
      '最新对话列表',
      '高意向线索',
      '待处理任务',
      'AI效能概览'
    ],
    enhanced: [
      '销售漏斗图',
      '实时情感热力图',
      '培育进度追踪',
      '风险预警面板'
    ]
  };

  customers: {
    core: [
      '公海池（未分配客户）',
      '我的客户列表',
      '客户详情查看',
      '客户领取/退回',
      '客户转移',
      '客户标签管理'
    ],
    enhanced: [
      '客户360画像',
      'BANT情报展示',
      '交互历史时间线',
      'AI推荐下一步行动'
    ]
  };

  conversations: {
    core: [
      '对话列表（多渠道）',
      '实时对话界面',
      '消息历史查看',
      '客户信息卡片'
    ],
    enhanced: [
      'AI实时建议卡片',
      'BANT信息实时提取',
      '情感分析实时展示',
      '智能体自动回复',
      '竞品识别提醒'
    ]
  };

  nurture: {
    core: [
      '培育计划列表',
      '7天标准SOP展示',
      '每日任务列表',
      '培育进度跟踪'
    ],
    enhanced: [
      '行为触发培育',
      '个性化培育路径',
      'A/B测试功能',
      '效果分析报表'
    ]
  };

  agents: {
    core: [
      '智能体列表',
      '创建/编辑智能体',
      '模型参数配置',
      '提示词模板管理',
      '知识库关联'
    ],
    enhanced: [
      '多模型切换',
      '工作模式切换',
      '性能监控',
      '使用统计分析'
    ]
  };
}
```

---

## 🧩 组件体系设计

### 组件层级结构

```
App
└── MainLayout
    ├── Sidebar (导航菜单)
    ├── Header (顶部栏)
    │   ├── NotificationBell
    │   ├── AgentModeSwitch
    │   └── UserProfile
    └── Content (页面内容)
        ├── Dashboard
        │   ├── StatCards
        │   ├── CopilotQuickStart
        │   ├── RecentConversations
        │   └──AIThisWeek
        ├── Customers
        │   ├── CustomerPool
        │   ├── MyCustomers
        │   └── CustomerDetail
        │       ├── CustomerInfo
        │       ├── BANTDisplay
        │       └── AIRecommendations
        ├── Conversations
        │   ├── ConversationList
        │   └── ConversationDetail
        │       ├── MessageList
        │       ├── MessageInput
        │       ├── CopilotSidebar (AI助手)
        │       │   ├── BANTPanel
        │       │   ├── SuggestionCard
        │       │   ├── SentimentIndicator
        │       │   └── CompetitorAlert
        │       └── CustomerCard
        ├── Nurture
        │   ├── NurtureList
        │   ├── NurtureDetail
        │   │   ├── NurtureTimeline
        │   │   ├── DayCards
        │   │   └── BehaviorTriggers
        │   └── NurtureSettings
        ├── Agents
        │   ├── AgentList
        │   ├── AgentConfig
        │   └── AgentPerformance
        └── Knowledge
            ├── KnowledgeList
            ├── KnowledgeSearch
            └── KnowledgeEditor
```

### 核心组件接口

#### CopilotSidebar (AI助手侧边栏)

```typescript
interface CopilotSidebarProps {
  conversationId: string;
  customerInfo: CustomerInfo;
  mode: 'assist' | 'auto' | 'manual';
  onSuggestionAccept: (suggestion: Suggestion) => void;
  onSuggestionModify: (suggestion: Suggestion) => void;
  onModeChange: (mode: string) => void;
}

interface Suggestion {
  id: string;
  content: string;
  confidence: number;
  reasoning: string;
  category: 'objection' | 'follow_up' | 'closing' | 'general';
}
```

#### BANTPanel (BANT信息面板)

```typescript
interface BANTPanelProps {
  bantData: BANTData;
  onFieldUpdate: (field: string, value: any) => void;
  editable?: boolean;
}

interface BANTData {
  budget: {
    amount?: number;
    source?: string;
    confidence: number;
    status: 'identified' | 'unknown' | 'confirmed';
  };
  authority: {
    decisionMaker: string;
    influencers: string[];
    confidence: number;
  };
  need: {
    painPoints: string[];
    goals: string[];
    solutionFit: string;
    confidence: number;
  };
  timeline: {
    purchaseDate?: string;
    urgency: 'low' | 'medium' | 'high';
    milestones: string[];
    confidence: number;
  };
}
```

#### AgentConfig (智能体配置)

```typescript
interface AgentConfigProps {
  agent: SalesAgentConfig;
  onSave: (config: SalesAgentConfig) => void;
  onTest: (config: SalesAgentConfig) => Promise<void>;
}

interface SalesAgentConfig {
  id: string;
  name: string;
  model: {
    provider: 'openai' | 'claude' | 'custom';
    modelName: string;
    temperature: number;
    maxTokens: number;
  };
  prompt: {
    systemPrompt: string;
    customInstructions: string;
  };
  behavior: {
    mode: 'assist' | 'auto' | 'manual';
    autoReply: boolean;
    confidenceThreshold: number;
  };
  knowledgeBase: string[];
}
```

---

## 🗄️ 状态管理设计

### Zustand Store结构

```typescript
// stores/authStore.ts - 认证状态
interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

// stores/customerStore.ts - 客户状态
interface CustomerStore {
  customers: Customer[];
  selectedCustomer: Customer | null;
  filters: CustomerFilters;
  fetchCustomers: () => Promise<void>;
  selectCustomer: (id: string) => void;
  updateCustomer: (id: string, data: Partial<Customer>) => Promise<void>;
  assignCustomer: (id: string, salesId: string) => Promise<void>;
}

// stores/conversationStore.ts - 对话状态
interface ConversationStore {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  messages: Message[];
  fetchConversations: () => Promise<void>;
  setActiveConversation: (id: string) => void;
  sendMessage: (content: string) => Promise<void>;
  receiveMessage: (message: Message) => void;
}

// stores/agentStore.ts - 智能体状态
interface AgentStore {
  activeAgent: AgentConfig | null;
  agentMode: 'assist' | 'auto' | 'manual';
  suggestions: Suggestion[];
  setActiveAgent: (agent: AgentConfig) => void;
  setAgentMode: (mode: string) => void;
  generateSuggestion: (context: ConversationContext) => Promise<Suggestion>;
  acceptSuggestion: (suggestion: Suggestion) => void;
}

// stores/nurtureStore.ts - 培育状态
interface NurtureStore {
  plans: NurturePlan[];
  activePlan: NurturePlan | null;
  fetchPlans: () => Promise<void>;
  createPlan: (customerId: string, template: string) => Promise<void>;
  updatePlan: (id: string, data: Partial<NurturePlan>) => Promise<void>;
  triggerBehavior: (customerId: string, behavior: Behavior) => Promise<void>;
}
```

### React Query集成

```typescript
// lib/api/queries.ts
export const customerQueries = {
  all: () => ({
    queryKey: ['customers'],
    queryFn: () => apiClient.get('/api/v4/customers')
  }),
  detail: (id: string) => ({
    queryKey: ['customers', id],
    queryFn: () => apiClient.get(`/api/v4/customers/${id}`)
  }),
  pool: () => ({
    queryKey: ['customers', 'pool'],
    queryFn: () => apiClient.get('/api/v4/customers/pool')
  })
};

export const conversationQueries = {
  all: () => ({
    queryKey: ['conversations'],
    queryFn: () => apiClient.get('/api/v4/conversations')
  }),
  detail: (id: string) => ({
    queryKey: ['conversations', id],
    queryFn: () => apiClient.get(`/api/v4/conversations/${id}`)
  }),
  messages: (id: string) => ({
    queryKey: ['conversations', id, 'messages'],
    queryFn: () => apiClient.get(`/api/v4/conversations/${id}/messages`)
  })
};

// 使用示例
function CustomerDetail({ id }: { id: string }) {
  const { data: customer, isLoading } = useQuery(customerQueries.detail(id));
  const updateCustomer = useMutation({
    mutationFn: (data: Partial<Customer>) =>
      apiClient.put(`/api/v4/customers/${id}`, data)
  });

  if (isLoading) return <Loading />;
  return <CustomerCard customer={customer} />;
}
```

---

## 🔌 API集成方案

### API客户端架构

```typescript
// lib/api/client.ts - Axios实例配置
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器 - 添加Token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器 - 统一错误处理
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Token过期，刷新或重新登录
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### 多API源集成

```typescript
// lib/api/tianjiu.ts - 天九系统API
export const tianjiuAPI = {
  // 客户管理
  customers: {
    list: (params) => apiClient.get('/api/v1/customers', { params }),
    get: (id) => apiClient.get(`/api/v1/customers/${id}`),
    create: (data) => apiClient.post('/api/v1/customers', data),
    update: (id, data) => apiClient.put(`/api/v1/customers/${id}`, data),
    assign: (id, salesId) => apiClient.post(`/api/v1/customers/${id}/assign`, { salesId }),
    pool: () => apiClient.get('/api/v1/customers/pool')
  },

  // 会话管理
  conversations: {
    list: () => apiClient.get('/api/v1/conversations'),
    get: (id) => apiClient.get(`/api/v1/conversations/${id}`),
    messages: (id) => apiClient.get(`/api/v1/conversations/${id}/messages`)
  },

  // 知识库
  knowledge: {
    list: () => apiClient.get('/api/v1/knowledge'),
    search: (query) => apiClient.get('/api/v1/knowledge/search', { params: { query } }),
    create: (data) => apiClient.post('/api/v1/knowledge', data)
  }
};

// lib/api/phase4.ts - 四期系统API
export const phase4API = {
  // BANT提取
  bant: {
    extract: (conversationId) =>
      apiClient.post(`/api/v4/analysis/bant/${conversationId}`),
    update: (id, data) =>
      apiClient.put(`/api/v4/analysis/bant/${id}`, data)
  },

  // 情感分析
  sentiment: {
    analyze: (conversationId) =>
      apiClient.post(`/api/v4/analysis/sentiment/${conversationId}`),
    timeline: (conversationId) =>
      apiClient.get(`/api/v4/analysis/sentiment/${conversationId}/timeline`)
  },

  // 培育计划
  nurture: {
    create: (customerId, template) =>
      apiClient.post('/api/v4/nurture', { customerId, template }),
    update: (id, data) =>
      apiClient.put(`/api/v4/nurture/${id}`, data),
    trigger: (customerId, behavior) =>
      apiClient.post(`/api/v4/nurture/trigger`, { customerId, behavior })
  }
};

// lib/api/agent.ts - 智能体API
export const agentAPI = {
  // 获取建议
  getSuggestion: (context) =>
    apiClient.post('/api/agent/suggest', context),

  // 自动回复
  autoReply: (conversationId, message) =>
    apiClient.post('/api/agent/reply', { conversationId, message }),

  // 配置管理
  config: {
    list: () => apiClient.get('/api/agent/config'),
    get: (id) => apiClient.get(`/api/agent/config/${id}`),
    update: (id, data) => apiClient.put(`/api/agent/config/${id}`, data)
  },

  // WebSocket连接
  connect: (conversationId) => {
    return new WebSocket(`wss://api.tianjiu.com/agent/ws?conversation=${conversationId}`);
  }
};
```

---

## 🔗 天九系统对接

### SSO单点登录

```typescript
// lib/auth/sso.ts
export class SSOManager {
  // 初始化SSO
  async init() {
    // 检查URL中的ticket参数
    const urlParams = new URLSearchParams(window.location.search);
    const ticket = urlParams.get('ticket');

    if (ticket) {
      // 使用ticket换取token
      const { user, token } = await this.exchangeTicket(ticket);
      this.storeAuth(user, token);

      // 清除URL中的ticket
      window.history.replaceState({}, '', window.location.pathname);
    }
  }

  // ticket换token
  async exchangeTicket(ticket: string) {
    return apiClient.post('/api/v4/auth/sso', { ticket });
  }

  // 存储认证信息
  storeAuth(user: User, token: string) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  }

  // 登出
  async logout() {
    await apiClient.post('/api/v4/auth/logout');
    localStorage.clear();
    window.location.href = 'https://tianjiu-system.com/logout';
  }
}
```

### 数据同步监听

```typescript
// lib/sync/sync-listener.ts
export class DataSyncListener {
  private ws: WebSocket | null = null;

  // 连接同步服务
  connect() {
    this.ws = new WebSocket('wss://api.tianjiu.com/sync');

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleSyncEvent(data);
    };
  }

  // 处理同步事件
  handleSyncEvent(event: SyncEvent) {
    switch (event.type) {
      case 'customer.created':
      case 'customer.updated':
        // 刷新客户列表
        queryClient.invalidateQueries(['customers']);
        break;

      case 'conversation.message_added':
        // 更新对话
        queryClient.invalidateQueries(['conversations', event.conversation_id]);

        // 触发AI建议
        if (event.sender_type === 'customer') {
          agentStore.generateSuggestion(event.conversation_id);
        }
        break;

      case 'knowledge.created':
      case 'knowledge.updated':
        // 刷新知识库
        queryClient.invalidateQueries(['knowledge']);
        break;
    }
  }

  // 断开连接
  disconnect() {
    this.ws?.close();
  }
}
```

### UI集成方案

```typescript
// components/integration/TianjiuFrame.tsx
// 方案A: iframe集成（用于独立页面）
export function TianjiuFrame({ src, title }: { src: string; title: string }) {
  return (
    <div className="w-full h-full">
      <iframe
        src={src}
        title={title}
        className="w-full h-full border-0"
        // SSO通过postMessage传递token
        onLoad={() => {
          const token = localStorage.getItem('token');
          const iframe = document.querySelector('iframe');
          iframe?.contentWindow?.postMessage({ token }, '*');
        }}
      />
    </div>
  );
}

// 方案B: API数据集成（推荐）
// 直接调用天九API，在React组件中渲染
export function useTianjiuCustomers() {
  return useQuery({
    queryKey: ['tianjiu', 'customers'],
    queryFn: () => tianjiuAPI.customers.list()
  });
}
```

---

## 🎯 实施计划

### 阶段一：基础架构搭建（1周）

- [x] 创建新页面组件
- [x] 设置路由
- [x] 配置状态管理
- [x] 搭建API客户端

### 阶段二：核心功能开发（2周）

- [ ] 客户管理页面
- [ ] 智能体管理页面
- [ ] 培育计划页面
- [ ] Copilot增强组件

### 阶段三：天九系统对接（1周）

- [ ] SSO集成
- [ ] API调用封装
- [ ] 数据同步监听
- [ ] 权限映射

### 阶段四：测试与优化（1周）

- [ ] 功能测试
- [ ] 性能优化
- [ ] UI/UX优化
- [ ] 文档完善

---

## 📚 相关文档

- [天九系统集成设计方案](./03-天九系统集成设计方案.md)
- [整体设计方案](./01-整体设计方案.md)
- [技术架构设计](./02-技术架构设计.md)

---

**📄 文档版本**: v2.0
**👤 作者**: Claude Code
**📅 最后更新**: 2026-01-14
