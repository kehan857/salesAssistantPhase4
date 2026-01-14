// 天九系统API客户端
import apiClient from './client'
import type { TianjiuCustomer, TianjiuConversation, TianjiuKnowledge } from '../types'

export const tianjiuAPI = {
  // ==================== 客户管理 ====================

  /**
   * 获取客户列表
   */
  customers: {
    list: (params?: { page?: number; limit?: number; status?: string }) =>
      apiClient.get<{ data: TianjiuCustomer[]; total: number }>('/v1/customers', { params }),

    get: (id: string) =>
      apiClient.get<TianjiuCustomer>(`/v1/customers/${id}`),

    create: (data: Partial<TianjiuCustomer>) =>
      apiClient.post<TianjiuCustomer>('/v1/customers', data),

    update: (id: string, data: Partial<TianjiuCustomer>) =>
      apiClient.put<TianjiuCustomer>(`/v1/customers/${id}`, data),

    delete: (id: string) =>
      apiClient.delete(`/v1/customers/${id}`),

    // 领取客户
    assign: (id: string, salesId: string) =>
      apiClient.post<TianjiuCustomer>(`/v1/customers/${id}/assign`, { salesId }),

    // 退回公海池
    returnToPool: (id: string) =>
      apiClient.post<TianjiuCustomer>(`/v1/customers/${id}/return`),

    // 获取公海池客户
    pool: (params?: { page?: number; limit?: number }) =>
      apiClient.get<{ data: TianjiuCustomer[]; total: number }>('/v1/customers/pool', { params }),

    // 我的客户
    my: (params?: { page?: number; limit?: number }) =>
      apiClient.get<{ data: TianjiuCustomer[]; total: number }>('/v1/customers/my', { params }),
  },

  // ==================== 会话管理 ====================

  conversations: {
    // 获取对话列表
    list: (params?: { page?: number; limit?: number; customerId?: string }) =>
      apiClient.get<{ data: TianjiuConversation[]; total: number }>('/v1/conversations', { params }),

    // 获取对话详情
    get: (id: string) =>
      apiClient.get<TianjiuConversation>(`/v1/conversations/${id}`),

    // 获取对话消息
    messages: (id: string, params?: { page?: number; limit?: number }) =>
      apiClient.get<{ data: any[]; total: number }>(`/v1/conversations/${id}/messages`, { params }),

    // 发送消息
    sendMessage: (id: string, content: string, type: 'text' | 'image' | 'file' = 'text') =>
      apiClient.post(`/v1/conversations/${id}/messages`, { content, type }),
  },

  // ==================== 知识库管理 ====================

  knowledge: {
    // 获取知识列表
    list: (params?: { page?: number; limit?: number; category?: string }) =>
      apiClient.get<{ data: TianjiuKnowledge[]; total: number }>('/v1/knowledge', { params }),

    // 搜索知识
    search: (query: string) =>
      apiClient.get<{ data: TianjiuKnowledge[] }>('/v1/knowledge/search', { params: { query } }),

    // 获取知识详情
    get: (id: string) =>
      apiClient.get<TianjiuKnowledge>(`/v1/knowledge/${id}`),

    // 创建知识
    create: (data: Partial<TianjiuKnowledge>) =>
      apiClient.post<TianjiuKnowledge>('/v1/knowledge', data),

    // 更新知识
    update: (id: string, data: Partial<TianjiuKnowledge>) =>
      apiClient.put<TianjiuKnowledge>(`/v1/knowledge/${id}`, data),

    // 删除知识
    delete: (id: string) =>
      apiClient.delete(`/v1/knowledge/${id}`),
  },

  // ==================== 用户管理 ====================

  users: {
    // 获取当前用户信息
    me: () =>
      apiClient.get<any>('/v1/users/me'),

    // 获取用户列表
    list: (params?: { page?: number; limit?: number; role?: string }) =>
      apiClient.get<{ data: any[]; total: number }>('/v1/users', { params }),
  },

  // ==================== SSO认证 ====================

  auth: {
    // SSO登录 - 使用ticket换取token
    sso: (ticket: string) =>
      apiClient.post<{ user: any; token: string }>('/v1/auth/sso', { ticket }),

    // 刷新Token
    refresh: () =>
      apiClient.post<{ token: string }>('/v1/auth/refresh'),

    // 登出
    logout: () =>
      apiClient.post('/v1/auth/logout'),
  },
}
