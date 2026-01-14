import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  Bot,
  Settings,
  Plus,
  Search,
  TrendingUp,
  MessageSquare,
  Sparkles,
  Brain,
  Zap,
  Sliders,
  Edit,
  Trash2,
  BarChart3,
} from 'lucide-react'

export default function Agents() {
  const [searchQuery, setSearchQuery] = useState('')

  // 模拟智能体数据
  const agents = [
    {
      id: 'agent1',
      name: '销售智能体',
      agentType: 'sales',
      description: '专业销售对话AI助手，擅长异议处理和促单',
      model: {
        provider: 'openai',
        modelName: 'gpt-4o',
        temperature: 0.7,
      },
      behavior: {
        mode: 'assist',
        status: 'active',
      },
      stats: {
        totalConversations: 1234,
        suggestions: 856,
        acceptanceRate: 78,
        avgResponseTime: 1.2,
      },
      createdAt: '2024-01-10',
    },
    {
      id: 'agent2',
      name: '客服智能体',
      agentType: 'support',
      description: '售后问题解答和客户服务支持',
      model: {
        provider: 'claude',
        modelName: 'claude-3-5-sonnet',
        temperature: 0.5,
      },
      behavior: {
        mode: 'auto',
        status: 'active',
      },
      stats: {
        totalConversations: 567,
        suggestions: 423,
        acceptanceRate: 85,
        avgResponseTime: 0.8,
      },
      createdAt: '2024-01-08',
    },
    {
      id: 'agent3',
      name: '培育助手',
      agentType: 'sales',
      description: '自动化线索培育和跟进内容生成',
      model: {
        provider: 'openai',
        modelName: 'gpt-4o',
        temperature: 0.8,
      },
      behavior: {
        mode: 'auto',
        status: 'inactive',
      },
      stats: {
        totalConversations: 234,
        suggestions: 189,
        acceptanceRate: 72,
        avgResponseTime: 2.1,
      },
      createdAt: '2024-01-05',
    },
  ]

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">智能体管理</h2>
          <p className="text-muted-foreground mt-1">
            配置和管理AI销售智能体，自定义对话策略
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          创建智能体
        </Button>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              活跃智能体
            </CardTitle>
            <Bot className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {agents.filter(a => a.behavior.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              共 {agents.length} 个智能体
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              今日建议
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-success mt-1">
              ↑ 12% 较昨日
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              采用率
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-success mt-1">
              ↑ 5% 较上周
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              响应时间
            </CardTitle>
            <Zap className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2s</div>
            <p className="text-xs text-muted-foreground mt-1">
              平均响应时间
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索智能体名称、类型..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Sliders className="h-4 w-4" />
          筛选
        </Button>
      </div>

      {/* 智能体列表 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <Card key={agent.id} className="glass-card hover:shadow-lg transition-all cursor-pointer group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={agent.behavior.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                        {agent.behavior.status === 'active' ? '运行中' : '已停用'}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {agent.agentType === 'sales' ? '销售' : '客服'}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* 开关 */}
                <Switch
                  checked={agent.behavior.status === 'active'}
                  onCheckedChange={() => console.log('切换状态:', agent.id)}
                />
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {agent.description}
              </p>

              {/* 模型信息 */}
              <div className="flex items-center gap-2 p-2 bg-accent/50 rounded-lg text-xs">
                <Sparkles className="h-3 w-3 text-primary" />
                <span className="font-medium">{agent.model.modelName}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">温度 {agent.model.temperature}</span>
              </div>

              {/* 工作模式 */}
              <div className="flex items-center justify-between p-2 bg-accent/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Brain className="h-3 w-3 text-primary" />
                  <span className="text-xs font-medium">工作模式</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {agent.behavior.mode === 'assist' ? 'AI辅助' : agent.behavior.mode === 'auto' ? '自动回复' : '人工主导'}
                </Badge>
              </div>

              {/* 统计数据 */}
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center p-2 bg-accent/30 rounded">
                  <div className="text-lg font-bold text-primary">{agent.stats.totalConversations}</div>
                  <div className="text-xs text-muted-foreground">对话数</div>
                </div>
                <div className="text-center p-2 bg-accent/30 rounded">
                  <div className="text-lg font-bold text-success">{agent.stats.acceptanceRate}%</div>
                  <div className="text-xs text-muted-foreground">采用率</div>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <Edit className="h-3 w-3" />
                  编辑
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <BarChart3 className="h-3 w-3" />
                  统计
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 工作模式说明 */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            工作模式说明
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border border-border rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <div className="font-semibold">AI辅助</div>
                  <div className="text-xs text-muted-foreground">推荐模式</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                AI生成回复建议，销售确认后发送。保持人工控制，提升回复质量。
              </p>
            </div>

            <div className="p-4 border border-border rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-purple-500" />
                </div>
                <div>
                  <div className="font-semibold">自动回复</div>
                  <div className="text-xs text-muted-foreground">高效模式</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                AI直接回复客户，特定场景触发人工介入。提升响应速度，减轻人工负担。
              </p>
            </div>

            <div className="p-4 border border-border rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Brain className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <div className="font-semibold">人工主导</div>
                  <div className="text-xs text-muted-foreground">谨慎模式</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                人工撰写回复，AI提供背景信息和建议。完全人工控制，适用于重要客户。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
