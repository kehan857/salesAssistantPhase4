import { Conversation, Lead, KnowledgeItem, BANTData } from './types'

// 模拟BANT数据
export const mockBANTData: BANTData = {
  budget: {
    amount: 500000,
    source: 'Q3预算申请',
    approvalRequired: true,
    confidence: 0.92
  },
  authority: {
    decisionMaker: 'CTO - 王总',
    influencers: ['技术总监', '采购经理'],
    currentContactRole: '技术总监',
    confidence: 0.85
  },
  need: {
    painPoints: ['系统稳定性差', '维护成本高', '响应速度慢'],
    goals: ['提升系统稳定性', '降低运维成本', '提高用户体验'],
    solutionFit: '高度匹配，我们的云原生架构可完美解决',
    confidence: 0.95
  },
  timeline: {
    purchaseDate: '2026-03-15',
    urgency: 'high',
    milestones: ['技术验证（1月）', '商务谈判（2月）', '合同签署（3月）'],
    confidence: 0.88
  },
  overallConfidence: 0.90
}

// 模拟对话数据
export const mockConversations: Conversation[] = [
  {
    id: '1',
    leadId: 'lead-1',
    leadName: '李总',
    leadCompany: '科技创新有限公司',
    channel: 'wechat',
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: '你好，我对你们的AI销售助手很感兴趣',
        timestamp: '2026-01-12T09:00:00',
        sender: '李总'
      },
      {
        id: 'm2',
        role: 'assistant',
        content: '李总您好！感谢您的关注。我们的销售AI助手四期是基于Agentic AI的智能销售闭环系统，可以帮助您实现：\n\n1. 自动提取BANT情报\n2. 销冠级文案润色\n3. 7天智能培育\n4. 知识库自进化\n\n请问您目前使用的是什么CRM系统呢？',
        timestamp: '2026-01-12T09:02:00'
      },
      {
        id: 'm3',
        role: 'user',
        content: '我们现在用的是Salesforce，主要是B2B销售，团队有20多人',
        timestamp: '2026-01-12T09:05:00',
        sender: '李总'
      },
      {
        id: 'm4',
        role: 'assistant',
        content: '太好了！我们的系统可以无缝集成Salesforce。针对20人的B2B销售团队，我们的AI助手可以：\n\n✅ 自动分析聊天记录，提取客户需求\n✅ 实时提供销冠级回复建议\n✅ 自动跟进培育新客户\n\n我们可以安排一次产品演示吗？大约30分钟。',
        timestamp: '2026-01-12T09:08:00'
      },
      {
        id: 'm5',
        role: 'user',
        content: '可以，但预算比较紧张，你们的价格怎么样？',
        timestamp: '2026-01-12T09:15:00',
        sender: '李总'
      }
    ],
    bantData: mockBANTData,
    sentimentScore: 0.75,
    riskLevel: 'low',
    lastMessageAt: '2026-01-12T09:15:00',
    status: 'active'
  },
  {
    id: '2',
    leadId: 'lead-2',
    leadName: '王经理',
    leadCompany: 'XYZ集团',
    channel: 'wechat',
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: '我们公司想了解一下AI销售系统',
        timestamp: '2026-01-11T14:00:00',
        sender: '王经理'
      },
      {
        id: 'm2',
        role: 'assistant',
        content: '王经理您好！我来为您介绍一下...',
        timestamp: '2026-01-11T14:05:00'
      },
      {
        id: 'm3',
        role: 'user',
        content: '好的，我先和内部讨论一下',
        timestamp: '2026-01-11T14:30:00',
        sender: '王经理'
      }
    ],
    sentimentScore: 0.55,
    riskLevel: 'medium',
    lastMessageAt: '2026-01-11T14:30:00',
    status: 'active'
  },
  {
    id: '3',
    leadId: 'lead-3',
    leadName: '张总',
    leadCompany: '未来科技',
    channel: 'email',
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: '产品演示很好，我们准备采购',
        timestamp: '2026-01-10T16:00:00',
        sender: '张总'
      },
      {
        id: 'm2',
        role: 'assistant',
        content: '太好了！我来为您准备合同...',
        timestamp: '2026-01-10T16:10:00'
      }
    ],
    sentimentScore: 0.95,
    riskLevel: 'low',
    lastMessageAt: '2026-01-10T16:10:00',
    status: 'converted'
  }
]

// 模拟线索数据
export const mockLeads: Lead[] = [
  {
    id: 'lead-1',
    name: '李总',
    company: '科技创新有限公司',
    title: 'CTO',
    email: 'li@tech-innov.com',
    phone: '138****1234',
    avatar: '李',
    source: '企业微信',
    status: 'qualified',
    score: 85,
    tags: ['高意向', '技术型', '预算充足'],
    nurtureDay: 3,
    nextAction: '发送产品Demo',
    createdAt: '2026-01-10T10:00:00'
  },
  {
    id: 'lead-2',
    name: '王经理',
    company: 'XYZ集团',
    title: '采购经理',
    email: 'wang@xyz-group.com',
    phone: '139****5678',
    avatar: '王',
    source: '官网咨询',
    status: 'contacted',
    score: 65,
    tags: ['中意向', '价格敏感'],
    nurtureDay: 5,
    nextAction: '发送案例资料',
    createdAt: '2026-01-09T14:00:00'
  },
  {
    id: 'lead-3',
    name: '张总',
    company: '未来科技',
    title: 'CEO',
    email: 'zhang@future-tech.com',
    phone: '136****9012',
    avatar: '张',
    source: '展会',
    status: 'proposal',
    score: 95,
    tags: ['高意向', '决策者', '急需'],
    nurtureDay: 7,
    nextAction: '合同跟进',
    createdAt: '2026-01-08T09:00:00'
  },
  {
    id: 'lead-4',
    name: '赵总',
    company: '智能系统公司',
    title: '技术总监',
    email: 'zhao@intelligent-sys.com',
    phone: '137****3456',
    avatar: '赵',
    source: '老客户推荐',
    status: 'new',
    score: 45,
    tags: ['新客户', '技术背景'],
    nurtureDay: 1,
    nextAction: '初步沟通',
    createdAt: '2026-01-12T08:00:00'
  },
  {
    id: 'lead-5',
    name: '刘总',
    company: '数字化公司',
    title: 'COO',
    email: 'liu@digital-corp.com',
    phone: '135****7890',
    avatar: '刘',
    source: '线上广告',
    status: 'negotiation',
    score: 88,
    tags: ['高意向', '预算审批中'],
    nurtureDay: 6,
    nextAction: '催促预算审批',
    createdAt: '2026-01-07T11:00:00'
  }
]

// 模拟知识库数据
export const mockKnowledgeItems: KnowledgeItem[] = [
  {
    id: 'k1',
    question: '如何处理"价格太贵"的异议？',
    answer: '三步法处理价格异议：\n1. 认同情感："完全理解您对成本的关注"\n2. 价值锚定："我们的系统可以提升30%的转化率，按您当前的销售额计算，6个月就能收回成本"\n3. 提供方案："我们也可以提供分期付款方案，降低一次性投入"',
    category: '异议处理',
    tags: ['价格', '异议处理', '成交技巧'],
    usageCount: 156,
    helpfulCount: 142,
    freshnessScore: 95,
    status: 'published',
    createdAt: '2025-12-01T10:00:00',
    updatedAt: '2026-01-10T15:30:00'
  },
  {
    id: 'k2',
    question: '如何开场白更容易获得客户回应？',
    answer: '高效开场白公式：\n\n1. 个性化破冰："看到您公司最近获得A轮融资，恭喜！"\n2. 痛点切入："很多高速增长的团队都面临销售人效不一致的问题"\n3. 价值承诺："我们帮助类似的团队提升了50%的人均产出"\n4. 轻量请求："是否可以花2分钟和您分享一下具体做法？"',
    category: '销售技巧',
    tags: ['开场白', '破冰', '沟通技巧'],
    usageCount: 203,
    helpfulCount: 189,
    freshnessScore: 98,
    status: 'published',
    createdAt: '2025-11-15T09:00:00',
    updatedAt: '2026-01-08T10:20:00'
  },
  {
    id: 'k3',
    question: '客户说"我再考虑一下"如何应对？',
    answer: '"考虑一下"通常意味着还有顾虑，可以这样应对：\n\n1. 挖掘真实顾虑："完全理解，方便问一下您主要考虑哪些方面吗？是预算、时机还是其他？"\n\n2. 提供社会认同："理解您的谨慎。其实XX公司的李总一开始也是这样想的，但使用后发现..."',
    category: '异议处理',
    tags: ['拖延', '异议处理', '成交'],
    usageCount: 128,
    helpfulCount: 115,
    freshnessScore: 92,
    status: 'published',
    createdAt: '2025-12-10T14:00:00',
    updatedAt: '2026-01-05T11:00:00'
  },
  {
    id: 'k4',
    question: '如何识别客户是否有真实预算？',
    answer: '判断预算真实性的信号：\n\n✅ 有预算：\n- 提到具体预算金额或范围\n- 询问审批流程和时间\n- 关注ROI和投资回报\n\n❌ 无预算：\n- "看看再说"\n- 对价格极其敏感\n- 回避预算讨论\n\n试探话术："这个项目大概的预算范围是多少呢？我们需要提前规划资源配置"',
    category: 'BANT技巧',
    tags: ['预算', 'BANT', '客户筛选'],
    usageCount: 89,
    helpfulCount: 82,
    freshnessScore: 88,
    status: 'published',
    createdAt: '2025-12-20T10:00:00',
    updatedAt: '2026-01-01T09:30:00'
  }
]

// AI建议类型
export interface AISuggestion {
  id: string
  type: 'reply' | 'bant' | 'sentiment' | 'risk'
  content: string
  confidence: number
  timestamp: string
}

// 模拟AI建议
export const mockAISuggestions: AISuggestion[] = [
  {
    id: 's1',
    type: 'reply',
    content: '客户提及价格敏感，建议采用价值重塑策略。可以这样说："李总，我理解您的预算考量。不过从长期来看，我们的系统可以节省30%的人力成本，按您20人的团队计算，每年可节省约100万。您看我们是否可以详细算一笔账？"',
    confidence: 0.92,
    timestamp: '2026-01-12T09:16:00'
  },
  {
    id: 's2',
    type: 'bant',
    content: '检测到BANT信息更新：\n• 预算：约50万（置信度92%）\n• 决策者：CTO王总（置信度85%）\n• 需求：稳定性、降本增效（置信度95%）\n• 时间：Q1采购（置信度88%）',
    confidence: 0.90,
    timestamp: '2026-01-12T09:15:00'
  },
  {
    id: 's3',
    type: 'risk',
    content: '⚠️ 风险提示：客户情绪略有下降（0.85→0.75），可能对价格有顾虑。建议：1）避免进一步讨论价格 2）强调价值和ROI 3）提供案例支撑',
    confidence: 0.78,
    timestamp: '2026-01-12T09:14:00'
  }
]
