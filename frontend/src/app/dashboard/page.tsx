import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockConversations, mockLeads } from '@/lib/mock-data'
import { formatRelativeTime } from '@/lib/utils'
import {
  TrendingUp,
  Users,
  MessageSquare,
  Target,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Bot,
  Sparkles,
  Brain,
  TrendingDown,
  Phone,
  Mail,
  Calendar,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import QuickActionDialog from '@/components/dialogs/QuickActionDialog'
import AddConversationDialog from '@/components/dialogs/AddConversationDialog'
import AddLeadDialog from '@/components/dialogs/AddLeadDialog'

export default function Dashboard() {
  const navigate = useNavigate()
  const [quickActionOpen, setQuickActionOpen] = useState(false)
  const [addConversationOpen, setAddConversationOpen] = useState(false)
  const [addLeadOpen, setAddLeadOpen] = useState(false)

  const stats = [
    {
      title: '线索总数',
      value: '1,234',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-500',
    },
    {
      title: '活跃对话',
      value: '56',
      change: '+8.2%',
      trend: 'up',
      icon: MessageSquare,
      color: 'text-green-500',
    },
    {
      title: '转化率',
      value: '28.5%',
      change: '+3.1%',
      trend: 'up',
      icon: Target,
      color: 'text-purple-500',
    },
    {
      title: '风险预警',
      value: '3',
      change: '需处理',
      trend: 'neutral',
      icon: AlertTriangle,
      color: 'text-orange-500',
    },
  ]

  const recentConversations = mockConversations.slice(0, 5)
  const highIntentLeads = mockLeads.filter(l => l.score >= 80).slice(0, 5)

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">主控台</h2>
        <p className="text-muted-foreground">
          欢迎回来！这里是您的智能销售工作台
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="glass-card hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.trend === 'up' && (
                  <span className="text-success flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    {stat.change}
                  </span>
                )}
                {stat.trend === 'down' && (
                  <span className="text-destructive flex items-center">
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    {stat.change}
                  </span>
                )}
                {stat.trend === 'neutral' && (
                  <span className="text-warning">{stat.change}</span>
                )}
                {' '}较上月
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Copilot 快速启动 */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI Copilot 助手
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div
              onClick={() => navigate('/conversations')}
              className="flex flex-col gap-2 rounded-lg border border-border p-4 hover:bg-accent hover:border-primary transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2 text-lg font-semibold">
                📊 BANT提取
                <TrendingUp className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
              </div>
              <p className="text-sm text-muted-foreground">
                自动从对话中提取预算、权限、需求、时间等关键信息，准确率92%+
              </p>
              <Badge variant="secondary" className="w-fit text-xs">已处理 1,234条</Badge>
            </div>

            <div
              onClick={() => navigate('/conversations')}
              className="flex flex-col gap-2 rounded-lg border border-border p-4 hover:bg-accent hover:border-primary transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2 text-lg font-semibold">
                ✍️ 文案润色
                <Sparkles className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
              </div>
              <p className="text-sm text-muted-foreground">
                一键生成销冠级专业回复，支持商务/亲和/紧迫三种语气风格
              </p>
              <Badge variant="secondary" className="w-fit text-xs">采用率 78%</Badge>
            </div>

            <div
              onClick={() => navigate('/conversations')}
              className="flex flex-col gap-2 rounded-lg border border-border p-4 hover:bg-accent hover:border-primary transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2 text-lg font-semibold">
                📈 情感分析
                <Brain className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
              </div>
              <p className="text-sm text-muted-foreground">
                实时分析客户情绪变化，提前识别流失风险，主动介入挽留
              </p>
              <Badge variant="secondary" className="w-fit text-xs">预警准确率 85%</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* 最新对话 */}
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>最新对话</CardTitle>
            <Button variant="outline" size="sm" onClick={() => navigate('/conversations')}>
              查看全部
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => navigate('/conversations')}
                  className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-accent transition-colors cursor-pointer"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-semibold text-white flex-shrink-0">
                    {conversation.leadName[0]}
                  </div>
                  <div className="flex flex-1 flex-col min-w-0">
                    <span className="font-medium text-sm">{conversation.leadName}</span>
                    <span className="text-xs text-muted-foreground truncate">
                      {conversation.leadCompany}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {conversation.status === 'active' && (
                      <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                    )}
                    {conversation.status === 'converted' && (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    )}
                    {conversation.riskLevel === 'high' && (
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatRelativeTime(conversation.lastMessageAt)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 高意向线索 */}
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>高意向线索</CardTitle>
            <Button variant="outline" size="sm" onClick={() => navigate('/leads')}>
              查看全部
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {highIntentLeads.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => navigate('/leads')}
                  className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-accent transition-colors cursor-pointer"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-semibold text-white flex-shrink-0">
                    {lead.avatar}
                  </div>
                  <div className="flex flex-1 flex-col min-w-0">
                    <span className="font-medium text-sm">{lead.name}</span>
                    <span className="text-xs text-muted-foreground truncate">
                      {lead.company} • {lead.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-sm font-semibold text-success">{lead.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 待处理任务 */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>待处理任务</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              { task: '跟进李总报价', priority: 'high', time: '今天 14:00', type: '跟进' },
              { task: '发送产品Demo', priority: 'medium', time: '明天 10:00', type: '发送' },
              { task: '回复异议处理', priority: 'high', time: '今天 16:00', type: '回复' },
              { task: '准备方案演示', priority: 'low', time: '周五 15:00', type: '准备' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-accent transition-colors cursor-pointer group"
              >
                <div
                  className={`h-2 w-2 rounded-full flex-shrink-0 ${
                    item.priority === 'high' ? 'bg-destructive' :
                    item.priority === 'medium' ? 'bg-warning' :
                    'bg-muted-foreground'
                  }`}
                />
                <div className="flex flex-1 flex-col min-w-0">
                  <span className="text-sm font-medium">{item.task}</span>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
                <Badge
                  variant={item.priority === 'high' ? 'destructive' : item.priority === 'medium' ? 'warning' : 'secondary'}
                  className="text-xs flex-shrink-0"
                >
                  {item.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI效能概览 */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🤖 AI助手本周效能
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 rounded-lg bg-accent/50">
              <div className="text-2xl font-bold text-primary mb-1">286</div>
              <div className="text-sm text-muted-foreground">BANT提取</div>
              <div className="text-xs text-success mt-1">↑ 12% 较上周</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-accent/50">
              <div className="text-2xl font-bold text-primary mb-1">156</div>
              <div className="text-sm text-muted-foreground">文案润色</div>
              <div className="text-xs text-success mt-1">↑ 8% 较上周</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-accent/50">
              <div className="text-2xl font-bold text-primary mb-1">423</div>
              <div className="text-sm text-muted-foreground">培育消息</div>
              <div className="text-xs text-success mt-1">打开率 65%</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-accent/50">
              <div className="text-2xl font-bold text-primary mb-1">92%</div>
              <div className="text-sm text-muted-foreground">AI建议准确率</div>
              <div className="text-xs text-success mt-1">↑ 3% 较上周</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 快速操作弹窗 */}
      <QuickActionDialog
        open={quickActionOpen}
        onOpenChange={setQuickActionOpen}
        title="快速操作"
        description="选择一个快速操作"
        icon={<Sparkles className="h-5 w-5 text-primary" />}
        actions={[
          {
            label: '新建对话',
            description: '创建新的客户对话',
            onClick: () => setAddConversationOpen(true)
          },
          {
            label: '添加线索',
            description: '添加新的销售线索',
            onClick: () => setAddLeadOpen(true)
          },
          {
            label: '查看待办',
            description: '查看待处理任务',
            onClick: () => navigate('/leads')
          },
          {
            label: '查看统计',
            description: '查看详细数据统计',
            onClick: () => navigate('/analytics')
          }
        ]}
      />

      <AddConversationDialog
        open={addConversationOpen}
        onOpenChange={setAddConversationOpen}
        onSave={(conversation) => console.log('添加对话:', conversation)}
      />

      <AddLeadDialog
        open={addLeadOpen}
        onOpenChange={setAddLeadOpen}
        onSave={(lead) => console.log('添加线索:', lead)}
      />
    </div>
  )
}
