import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockLeads } from '@/lib/mock-data'
import {
  Calendar,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  Settings,
  TrendingUp,
  Mail,
  MessageSquare,
  Phone,
  FileText,
  Sparkles,
  Eye,
  MousePointerClick,
} from 'lucide-react'
import NurturePlanDialog from '@/components/dialogs/NurturePlanDialog'
import { cn } from '@/lib/utils'

export default function Nurture() {
  const [planDialogOpen, setPlanDialogOpen] = useState(false)

  // 模拟培育计划数据
  const nurturePlans = [
    {
      id: 'n1',
      customerId: 'l1',
      customerName: '李总',
      customerCompany: '科技公司',
      template: 'standard_7day',
      status: 'active',
      currentDay: 3,
      progress: 42,
      startAt: '2024-01-10',
      nextAction: '发送案例分享',
      nextActionAt: '今天 14:00',
      stats: {
        sent: 3,
        opened: 2,
        replied: 1,
        clicked: 2
      }
    },
    {
      id: 'n2',
      customerId: 'l2',
      customerName: '王总',
      customerCompany: '制造企业',
      template: 'standard_7day',
      status: 'active',
      currentDay: 5,
      progress: 71,
      startAt: '2024-01-08',
      nextAction: '促单跟进',
      nextActionAt: '明天 10:00',
      stats: {
        sent: 5,
        opened: 4,
        replied: 2,
        clicked: 3
      }
    },
    {
      id: 'n3',
      customerId: 'l3',
      customerName: '张总',
      customerCompany: '服务公司',
      template: 'standard_7day',
      status: 'paused',
      currentDay: 2,
      progress: 28,
      startAt: '2024-01-12',
      nextAction: '发送产品介绍',
      nextActionAt: '已暂停',
      stats: {
        sent: 2,
        opened: 1,
        replied: 0,
        clicked: 1
      }
    },
  ]

  // 7天标准SOP模板
  const standardSOP = [
    {
      day: 1,
      name: '连接期',
      icon: Send,
      color: 'text-blue-500',
      actions: [
        { type: 'message', title: '欢迎消息', desc: '感谢咨询，简要介绍' },
        { type: 'content', title: '产品介绍', desc: '发送产品手册' }
      ]
    },
    {
      day: 2,
      name: '价值期',
      icon: FileText,
      color: 'text-purple-500',
      actions: [
        { type: 'content', title: '案例分享', desc: '相关行业成功案例' },
        { type: 'message', title: '痛点沟通', desc: '了解核心需求' }
      ]
    },
    {
      day: 3,
      name: '互动期',
      icon: MessageSquare,
      color: 'text-green-500',
      actions: [
        { type: 'call', title: '电话跟进', desc: '深度沟通需求' },
        { type: 'content', title: '解决方案', desc: '针对性方案文档' }
      ]
    },
    {
      day: 4,
      name: '价值期',
      icon: TrendingUp,
      color: 'text-orange-500',
      actions: [
        { type: 'content', title: 'ROI分析', desc: '投资回报分析' },
        { type: 'email', title: '正式报价', desc: '发送详细报价单' }
      ]
    },
    {
      day: 5,
      name: '转化期',
      icon: Sparkles,
      color: 'text-pink-500',
      actions: [
        { type: 'message', title: '异议处理', desc: '解答疑虑' },
        { type: 'call', title: '决策人沟通', desc: '与决策人对接' }
      ]
    },
    {
      day: 6,
      name: '促单期',
      icon: AlertCircle,
      color: 'text-red-500',
      actions: [
        { type: 'message', title: '紧迫营造', desc: '限时优惠信息' },
        { type: 'call', title: '最后跟进', desc: '确认购买意向' }
      ]
    },
    {
      day: 7,
      name: '成交期',
      icon: CheckCircle2,
      color: 'text-success',
      actions: [
        { type: 'message', title: '促成成交', desc: '推动签约' },
        { type: 'email', title: '合同发送', desc: '正式合同文档' }
      ]
    }
  ]

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">培育计划</h2>
          <p className="text-muted-foreground mt-1">
            7天智能培育SOP，自动化线索培育流程
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Settings className="h-4 w-4" />
            培育设置
          </Button>
          <Button onClick={() => setPlanDialogOpen(true)} className="gap-2">
            <Play className="h-4 w-4" />
            创建计划
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              活跃计划
            </CardTitle>
            <Play className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {nurturePlans.filter(p => p.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              共 {nurturePlans.length} 个计划
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              总发送量
            </CardTitle>
            <Send className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {nurturePlans.reduce((sum, p) => sum + p.stats.sent, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              本周新增 45 条
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              打开率
            </CardTitle>
            <Eye className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-success mt-1">
              ↑ 5% 较上周
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              转化率
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32%</div>
            <p className="text-xs text-success mt-1">
              ↑ 8% 较上周
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* 培育计划列表 */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold">活跃培育计划</h3>

          {nurturePlans.map((plan) => (
            <Card key={plan.id} className="glass-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-semibold text-white">
                      {plan.customerName[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{plan.customerName}</span>
                        <Badge variant={plan.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                          {plan.status === 'active' ? '进行中' : '已暂停'}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{plan.customerCompany}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {plan.status === 'active' ? (
                      <Button variant="outline" size="sm">
                        <Pause className="h-3 w-3 mr-1" />
                        暂停
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        <Play className="h-3 w-3 mr-1" />
                        继续
                      </Button>
                    )}
                  </div>
                </div>

                {/* 进度条 */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>第 {plan.currentDay} 天</span>
                    <span>{plan.progress}%</span>
                  </div>
                  <div className="h-2 bg-accent rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
                      style={{ width: `${plan.progress}%` }}
                    />
                  </div>
                </div>

                {/* 统计数据 */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{plan.stats.sent}</div>
                    <div className="text-xs text-muted-foreground">已发送</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-500">{plan.stats.opened}</div>
                    <div className="text-xs text-muted-foreground">已打开</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-500">{plan.stats.replied}</div>
                    <div className="text-xs text-muted-foreground">已回复</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-500">{plan.stats.clicked}</div>
                    <div className="text-xs text-muted-foreground">点击链接</div>
                  </div>
                </div>

                {/* 下一步行动 */}
                <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <div>
                      <div className="text-sm font-medium">{plan.nextAction}</div>
                      <div className="text-xs text-muted-foreground">{plan.nextActionAt}</div>
                    </div>
                  </div>
                  <Button size="sm" className="gap-2">
                    <Sparkles className="h-3 w-3" />
                    AI生成
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 7天标准SOP */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">7天标准SOP</h3>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">标准培育流程</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {standardSOP.map((day) => {
                const Icon = day.icon
                return (
                  <div
                    key={day.day}
                    className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer group"
                  >
                    <div className={cn('h-8 w-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0', day.color)}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">Day {day.day}</span>
                        <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                          查看详情 →
                        </span>
                      </div>
                      <div className="text-xs font-medium mt-1">{day.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {day.actions[0].title} • {day.actions[1].title}
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* 行为触发说明 */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MousePointerClick className="h-4 w-4 text-primary" />
                行为触发培育
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                <span>查看价格 → 跳转到价格异议处理</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                <span>点击案例 → 增加案例推送频率</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                <span>下载文档 → 触发人工跟进</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 创建培育计划弹窗 */}
      <NurturePlanDialog
        open={planDialogOpen}
        onOpenChange={setPlanDialogOpen}
        onSave={(plan) => console.log('创建培育计划:', plan)}
      />
    </div>
  )
}
