// 四期系统API客户端
import apiClient from './client'
import type { BANTData, CustomerAnalysis, ConversationAnalysis, NurturePlan, BehaviorTrigger } from '../types'

export const phase4API = {
  // ==================== BANT提取 ====================

  bant: {
    // 从对话中提取BANT信息
    extract: (conversationId: string) =>
      apiClient.post<{ bantData: BANTData; confidence: number }>(`/v4/analysis/bant/${conversationId}`),

    // 更新BANT信息
    update: (conversationId: string, bantData: Partial<BANTData>) =>
      apiClient.put<BANTData>(`/v4/analysis/bant/${conversationId}`, { bantData }),

    // 获取BANT历史记录
    history: (conversationId: string) =>
      apiClient.get<{ data: BANTData[] }>(`/v4/analysis/bant/${conversationId}/history`),
  },

  // ==================== 情感分析 ====================

  sentiment: {
    // 分析对话情感
    analyze: (conversationId: string) =>
      apiClient.post<{ score: number; label: string; trajectory: any[] }>(`/v4/analysis/sentiment/${conversationId}`),

    // 获取情感轨迹
    timeline: (conversationId: string) =>
      apiClient.get<{ data: any[] }>(`/v4/analysis/sentiment/${conversationId}/timeline`),

    // 获取风险预警
    risks: () =>
      apiClient.get<{ data: { customerId: string; riskLevel: string; reason: string }[] }>('/v4/analysis/sentiment/risks'),
  },

  // ==================== 客户分析 ====================

  customers: {
    // 获取客户分析数据
    getAnalysis: (customerId: string) =>
      apiClient.get<CustomerAnalysis>(`/v4/customers/${customerId}/analysis`),

    // 获取AI推荐
    getRecommendations: (customerId: string) =>
      apiClient.get<{ data: any[] }>(`/v4/customers/${customerId}/recommendations`),

    // 更新客户画像
    updateProfile: (customerId: string, profile: Partial<any>) =>
      apiClient.put(`/v4/customers/${customerId}/profile`, { profile }),
  },

  // ==================== 对话分析 ====================

  conversations: {
    // 获取对话分析数据
    getAnalysis: (conversationId: string) =>
      apiClient.get<ConversationAnalysis>(`/v4/conversations/${conversationId}/analysis`),

    // 提取关键信息
    extractInfo: (conversationId: string) =>
      apiClient.post<{ painPoints: string[]; objections: string[]; competitors: string[]; interests: string[] }>(
        `/v4/conversations/${conversationId}/extract`
      ),

    // 获取关键时刻
    keyMoments: (conversationId: string) =>
      apiClient.get<{ data: any[] }>(`/v4/conversations/${conversationId}/moments`),
  },

  // ==================== 培育计划 ====================

  nurture: {
    // 创建培育计划
    create: (customerId: string, template: 'standard_7day' | 'custom', options?: any) =>
      apiClient.post<NurturePlan>('/v4/nurture', { customerId, template, ...options }),

    // 获取培育计划列表
    list: (params?: { status?: string; customerId?: string }) =>
      apiClient.get<{ data: NurturePlan[]; total: number }>('/v4/nurture', { params }),

    // 获取培育计划详情
    get: (id: string) =>
      apiClient.get<NurturePlan>(`/v4/nurture/${id}`),

    // 更新培育计划
    update: (id: string, data: Partial<NurturePlan>) =>
      apiClient.put<NurturePlan>(`/v4/nurture/${id}`, data),

    // 暂停/继续培育计划
    pause: (id: string) =>
      apiClient.post<NurturePlan>(`/v4/nurture/${id}/pause`),
    resume: (id: string) =>
      apiClient.post<NurturePlan>(`/v4/nurture/${id}/resume`),

    // 行为触发培育
    trigger: (customerId: string, behavior: BehaviorTrigger) =>
      apiClient.post<{ success: boolean; message: string }>('/v4/nurture/trigger', { customerId, behavior }),

    // 获取培育统计
    stats: () =>
      apiClient.get<{ sent: number; opened: number; replied: number; converted: number }>('/v4/nurture/stats'),
  },

  // ==================== 文案生成 ====================

  content: {
    // 文案润色
    polish: (text: string, tone: 'professional' | 'friendly' | 'urgent') =>
      apiClient.post<{ polished: string; original: string }>('/v4/content/polish', { text, tone }),

    // 生成回复建议
    suggestReply: (conversationId: string, context?: any) =>
      apiClient.post<{ suggestions: any[] }>(`/v4/conversations/${conversationId}/suggest`, { context }),

    // 生成培育内容
    generateNurture: (template: string, customerId: string, day: number) =>
      apiClient.post<{ content: string; channel: string }>(`/4/content/nurture`, { template, customerId, day }),
  },

  // ==================== 销冠克隆 ====================

  champion: {
    // 分析销冠对话
    analyze: (conversationIds: string[]) =>
      apiClient.post<{ patterns: any[]; insights: string[] }>('/v4/champion/analyze', { conversationIds }),

    // 应用销冠话术
    apply: (scenario: string, context?: any) =>
      apiClient.post<{ suggestion: string; confidence: number }>('/v4/champion/apply', { scenario, context }),
  },

  // ==================== 知识库增强 ====================

  knowledge: {
    // 从对话中自动提炼知识
    extract: (conversationId: string) =>
      apiClient.post<{ question: string; answer: string; category: string }>(`/v4/knowledge/extract/${conversationId}`),

    // 获取待审核知识
    pending: () =>
      apiClient.get<{ data: any[] }>('/v4/knowledge/pending'),

    // 审核知识
    review: (knowledgeId: string, approved: boolean, feedback?: string) =>
      apiClient.post(`/v4/knowledge/${knowledgeId}/review`, { approved, feedback }),

    // 智能搜索（语义搜索）
    smartSearch: (query: string, filters?: any) =>
      apiClient.post<{ data: any[] }>('/v4/knowledge/search', { query, filters }),
  },

  // ==================== 数据统计 ====================

  analytics: {
    // 获取仪表盘数据
    dashboard: () =>
      apiClient.get<{ stats: any[]; trends: any[] }>('/v4/analytics/dashboard'),

    // 获取转化漏斗
    funnel: () =>
      apiClient.get<{ stages: any[]; conversionRates: any[] }>('/v4/analytics/funnel'),

    // 获取效能报告
    performance: (params?: { startDate?: string; endDate?: string }) =>
      apiClient.get<{ metrics: any; comparisons: any[] }>('/v4/analytics/performance', { params }),

    // 获取AI使用统计
    aiUsage: () =>
      apiClient.get<{ bantExtracted: number; suggestions: number; acceptanceRate: number }>('/v4/analytics/ai'),
  },
}
