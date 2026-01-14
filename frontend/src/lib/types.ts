// 类型定义 - 扩展版（支持天九系统集成）

// ============ 天九系统相关类型 ============

export interface TianjiuCustomer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  company?: string;
  industry?: string;
  source?: string;
  tags?: string[];
  status: 'potential' | 'active' | 'closed';
  ownerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TianjiuConversation {
  id: string;
  customerId: string;
  channel: 'wechat' | 'email' | 'phone';
  messages: TianjiuMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TianjiuMessage {
  id: string;
  senderId: string;
  senderType: 'customer' | 'sales' | 'system';
  content: string;
  messageType: 'text' | 'image' | 'file';
  timestamp: Date;
}

export interface TianjiuKnowledge {
  id: string;
  question: string;
  answer: string;
  category?: string;
  tags?: string[];
  status: 'published' | 'draft';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============ 四期增强类型 ============

export interface CustomerAnalysis {
  customerId: string; // 关联天九客户ID
  bantData?: BANTData;
  sentimentScore?: number;
  riskLevel?: 'low' | 'medium' | 'high';
  engagementLevel?: number;
  lastInteractionAt?: Date;
  nextFollowUpAt?: Date;
  aiSuggestions?: AISuggestion[];
}

export interface ConversationAnalysis {
  conversationId: string;
  extractedInfo?: {
    painPoints: string[];
    objections: string[];
    competitors: string[];
    interests: string[];
  };
  sentimentTrajectory?: SentimentPoint[];
  keyMoments?: KeyMoment[];
}

export interface SentimentPoint {
  timestamp: Date;
  score: number;
  label: 'positive' | 'neutral' | 'negative';
}

export interface KeyMoment {
  type: 'price_discussion' | 'competitor_mention' | 'buying_signal' | 'risk_alert';
  timestamp: Date;
  description: string;
}

// ============ 智能体相关类型 ============

export interface SalesAgentConfig {
  id: string;
  name: string;
  agentType: 'sales' | 'support' | 'general';
  description: string;

  // 模型配置
  model: {
    provider: 'openai' | 'claude' | 'custom';
    modelName: string;
    temperature: number;
    maxTokens: number;
    topP?: number;
    frequencyPenalty?: number;
    presencePenalty?: number;
  };

  // 提示词配置
  prompt: {
    systemPrompt: string;
    fewShots?: FewShotExample[];
    customInstructions?: string;
  };

  // 上下文配置
  context: {
    maxHistoryTurns: number;
    enableRAG: boolean;
    knowledgeBaseIds: string[];
    enableCustomerProfile: boolean;
  };

  // 行为配置
  behavior: {
    mode: 'assist' | 'auto' | 'manual';
    autoReply: boolean;
    autoReplyDelay?: number;
    humanIntervention: boolean;
    confidenceThreshold: number;
  };

  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface FewShotExample {
  input: string;
  output: string;
  category?: string;
}

export interface AISuggestion {
  id: string;
  conversationId: string;
  content: string;
  confidence: number;
  reasoning: string;
  category: 'objection' | 'follow_up' | 'closing' | 'general' | 'price' | 'competitor';
  alternativeOptions?: string[];
  createdAt: Date;
}

export interface ConversationContext {
  conversationId: string;
  message: string;
  customerProfile?: CustomerProfile;
  conversationHistory?: Message[];
  bantData?: BANTData;
}

export interface CustomerProfile {
  id: string;
  name: string;
  company?: string;
  industry?: string;
  tags?: string[];
  status?: string;
  level?: 'A' | 'B' | 'C' | 'D';
}

// ============ 培育计划相关类型 ============

export interface NurturePlan {
  id: string;
  customerId: string;
  name: string;
  template: 'standard_7day' | 'custom';
  status: 'active' | 'paused' | 'completed';
  currentDay: number;
  startAt: Date;
  endAt?: Date;
  tasks: NurtureTask[];
  metadata?: Record<string, any>;
}

export interface NurtureTask {
  id: string;
  day: number;
  name: string;
  description?: string;
  actions: NurtureAction[];
  condition?: string;
  status: 'pending' | 'sent' | 'opened' | 'replied' | 'skipped';
  scheduledAt?: Date;
  completedAt?: Date;
}

export interface NurtureAction {
  id: string;
  type: 'message' | 'content' | 'call' | 'email';
  trigger: 'immediate' | 'scheduled' | 'conditional';
  template?: string;
  content?: string;
  channel?: 'wechat' | 'email' | 'phone';
  aiGenerated?: boolean;
}

export interface BehaviorTrigger {
  customerId: string;
  type: 'view_pricing' | 'click_case_study' | 'download_doc' | 'visit_website';
  timestamp: Date;
  metadata?: Record<string, any>;
}

// ============ 原有类型（保持兼容） ============

export interface BANTData {
  budget: {
    amount?: number
    source?: string
    approvalRequired: boolean
    confidence: number
  }
  authority: {
    decisionMaker: string
    influencers: string[]
    currentContactRole: string
    confidence: number
  }
  need: {
    painPoints: string[]
    goals: string[]
    solutionFit: string
    confidence: number
  }
  timeline: {
    purchaseDate?: string
    urgency: 'low' | 'medium' | 'high'
    milestones: string[]
    confidence: number
  }
  overallConfidence: number
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  sender?: string
}

export interface Conversation {
  id: string
  leadId: string
  leadName: string
  leadCompany: string
  channel: 'wechat' | 'email' | 'phone'
  messages: Message[]
  bantData?: BANTData
  sentimentScore: number
  riskLevel: 'low' | 'medium' | 'high'
  lastMessageAt: string
  status: 'active' | 'archived' | 'converted' | 'lost'
}

export interface Lead {
  id: string
  name: string
  company: string
  title: string
  email: string
  phone: string
  avatar: string
  source: string
  status: string
  score: number
  tags: string[]
  nurtureDay?: number
  nextAction?: string
  createdAt: string
}

export interface KnowledgeItem {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
  usageCount: number
  helpfulCount: number
  freshnessScore: number
  status: 'draft' | 'published' | 'archived'
  createdAt: string
  updatedAt: string
}
