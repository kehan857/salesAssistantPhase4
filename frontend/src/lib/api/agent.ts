// 智能体API客户端
import apiClient from './client'
import type { SalesAgentConfig, AISuggestion, ConversationContext } from '../types'

export const agentAPI = {
  // ==================== 智能体配置管理 ====================

  config: {
    // 获取智能体列表
    list: () =>
      apiClient.get<{ data: SalesAgentConfig[] }>('/agent/config'),

    // 获取智能体详情
    get: (id: string) =>
      apiClient.get<SalesAgentConfig>(`/agent/config/${id}`),

    // 创建智能体
    create: (config: Partial<SalesAgentConfig>) =>
      apiClient.post<SalesAgentConfig>('/agent/config', config),

    // 更新智能体配置
    update: (id: string, config: Partial<SalesAgentConfig>) =>
      apiClient.put<SalesAgentConfig>(`/agent/config/${id}`, config),

    // 删除智能体
    delete: (id: string) =>
      apiClient.delete(`/agent/config/${id}`),

    // 测试智能体
    test: (id: string, message: string) =>
      apiClient.post<{ response: string; latency: number }>(`/agent/config/${id}/test`, { message }),
  },

  // ==================== 对话与建议 ====================

  chat: {
    // 获取AI建议（不自动发送）
    getSuggestion: (context: ConversationContext) =>
      apiClient.post<AISuggestion>('/agent/suggest', context),

    // 自动回复（AI直接发送）
    autoReply: (conversationId: string, message: string, options?: any) =>
      apiClient.post<{ messageId: string; response: string }>(`/agent/reply`, {
        conversationId,
        message,
        ...options,
      }),

    // 批量获取建议（多个场景）
    getSuggestions: (conversationId: string, scenarios: string[]) =>
      apiClient.post<{ data: AISuggestion[] }>(`/agent/suggest/batch`, {
        conversationId,
        scenarios,
      }),
  },

  // ==================== 实时通信 ====================

  websocket: {
    // 连接到智能体WebSocket服务
    connect: (conversationId: string) => {
      const wsUrl = import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:3000'
      return new WebSocket(`${wsUrl}/agent/ws?conversation=${conversationId}`)
    },

    // 订阅实时建议
    subscribeSuggestions: (conversationId: string, callback: (suggestion: AISuggestion) => void) => {
      const ws = agentAPI.websocket.connect(conversationId)

      ws.onopen = () => {
        console.log('WebSocket连接已建立')
        // 发送订阅消息
        ws.send(JSON.stringify({
          type: 'subscribe',
          channel: 'suggestions',
        }))
      }

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.type === 'suggestion') {
          callback(data)
        }
      }

      ws.onerror = (error) => {
        console.error('WebSocket错误:', error)
      }

      ws.onclose = () => {
        console.log('WebSocket连接已关闭')
      }

      return ws
    },
  },

  // ==================== 智能体模式切换 ====================

  mode: {
    // 获取当前工作模式
    get: (conversationId: string) =>
      apiClient.get<{ mode: 'assist' | 'auto' | 'manual' }>(`/agent/mode/${conversationId}`),

    // 设置工作模式
    set: (conversationId: string, mode: 'assist' | 'auto' | 'manual') =>
      apiClient.put<{ mode: string }>(`/agent/mode/${conversationId}`, { mode }),

    // 获取场景化模式规则
    getRules: () =>
      apiClient.get<{ data: any[] }>('/agent/mode/rules'),

    // 更新模式规则
    updateRules: (rules: any[]) =>
      apiClient.put('/agent/mode/rules', { rules }),
  },

  // ==================== 性能监控 ====================

  performance: {
    // 获取智能体性能数据
    getStats: (agentId: string, params?: { startDate?: string; endDate?: string }) =>
      apiClient.get<{
        totalConversations: number
        totalSuggestions: number
        acceptanceRate: number
        avgResponseTime: number
        avgConfidence: number
      }>(`/agent/performance/${agentId}`, { params }),

    // 获取使用趋势
    getTrends: (agentId: string, period: 'day' | 'week' | 'month') =>
      apiClient.get<{ data: any[] }>(`/agent/performance/${agentId}/trends`, { params: { period } }),

    // 获取反馈统计
    getFeedback: (agentId: string) =>
      apiClient.get<{
        positive: number
        negative: number
        neutral: number
        categories: any[]
      }>(`/agent/performance/${agentId}/feedback`),
  },

  // ==================== 上下文管理 ====================

  context: {
    // 获取对话上下文
    get: (conversationId: string) =>
      apiClient.get<{
        messages: any[]
        bantData?: any
        customerProfile?: any
        recentActions: any[]
      }>(`/agent/context/${conversationId}`),

    // 更新上下文
    update: (conversationId: string, context: any) =>
      apiClient.put(`/agent/context/${conversationId}`, context),

    // 清除上下文
    clear: (conversationId: string) =>
      apiClient.delete(`/agent/context/${conversationId}`),
  },

  // ==================== 人机协同 ====================

  collaboration: {
    // 采纳建议
    acceptSuggestion: (suggestionId: string, content?: string) =>
      apiClient.post(`/agent/collaboration/accept`, { suggestionId, content }),

    // 修改建议
    modifySuggestion: (suggestionId: string, originalContent: string, modifiedContent: string) =>
      apiClient.post(`/agent/collaboration/modify`, {
        suggestionId,
        originalContent,
        modifiedContent,
      }),

    // 拒绝建议
    rejectSuggestion: (suggestionId: string, reason?: string) =>
      apiClient.post(`/agent/collaboration/reject`, { suggestionId, reason }),

    // 获取协作历史
    getHistory: (conversationId: string) =>
      apiClient.get<{ data: any[] }>(`/agent/collaboration/history/${conversationId}`),
  },

  // ==================== 知识库关联 ====================

  knowledge: {
    // 获取智能体关联的知识库
    get: (agentId: string) =>
      apiClient.get<{ data: string[] }>(`/agent/knowledge/${agentId}`),

    // 关联知识库
    link: (agentId: string, knowledgeBaseIds: string[]) =>
      apiClient.post(`/agent/knowledge/${agentId}`, { knowledgeBaseIds }),

    // 取消关联
    unlink: (agentId: string, knowledgeBaseIds: string[]) =>
      apiClient.delete(`/agent/knowledge/${agentId}`, { data: { knowledgeBaseIds } }),
  },
}

export default agentAPI
