import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Mail, Phone, MessageSquare, Bot, Sparkles } from 'lucide-react'

interface NurturePlanDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  leadName?: string
  onApply?: () => void
}

const mockPlan = [
  {
    day: 1,
    channel: 'wechat',
    content: '感谢您的咨询，我已收到您对产品的需求。稍后会将详细资料发送给您。',
    time: '09:00',
    status: 'pending',
    aiSuggestion: '初次接触，保持专业和友好，建立初步信任'
  },
  {
    day: 2,
    channel: 'email',
    content: '产品详细资料、成功案例、客户见证',
    time: '10:30',
    status: 'pending',
    aiSuggestion: '发送详细资料，重点突出与客户痛点的匹配度'
  },
  {
    day: 3,
    channel: 'phone',
    content: '跟进资料查看情况，了解反馈和疑问',
    time: '14:00',
    status: 'pending',
    aiSuggestion: '主动沟通，判断客户意向度和关注点'
  },
  {
    day: 5,
    channel: 'wechat',
    content: '分享行业相关资讯、产品更新信息',
    time: '09:00',
    status: 'pending',
    aiSuggestion: '提供价值，保持存在感，但避免过度打扰'
  },
  {
    day: 6,
    channel: 'email',
    content: '产品Demo演示、试用申请、优惠活动',
    time: '11:00',
    status: 'pending',
    aiSuggestion: '创造体验机会，降低决策门槛'
  },
  {
    day: 7,
    channel: 'phone',
    content: '总结一周沟通，确认下一步行动计划',
    time: '15:00',
    status: 'pending',
    aiSuggestion: '推动决策，明确时间表和关键决策人'
  }
]

export default function NurturePlanDialog({ open, onOpenChange, leadName = '李总', onApply }: NurturePlanDialogProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'wechat': return <MessageSquare className="h-3.5 w-3.5" />
      case 'email': return <Mail className="h-3.5 w-3.5" />
      case 'phone': return <Phone className="h-3.5 w-3.5" />
      default: return <MessageSquare className="h-3.5 w-3.5" />
    }
  }

  const getChannelLabel = (channel: string) => {
    const labels = { wechat: '微信', email: '邮件', phone: '电话' }
    return labels[channel as keyof typeof labels] || channel
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            7天智能培育计划
          </DialogTitle>
          <DialogDescription>
            AI为 <span className="font-semibold text-foreground">{leadName}</span> 生成的个性化培育计划
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* 计划概览 */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-border bg-accent/50 p-3 text-center">
              <div className="text-2xl font-bold text-primary">7天</div>
              <div className="text-xs text-muted-foreground">培育周期</div>
            </div>
            <div className="rounded-lg border border-border bg-accent/50 p-3 text-center">
              <div className="text-2xl font-bold text-primary">6次</div>
              <div className="text-xs text-muted-foreground">触达频次</div>
            </div>
            <div className="rounded-lg border border-border bg-accent/50 p-3 text-center">
              <div className="text-2xl font-bold text-primary">92%</div>
              <div className="text-xs text-muted-foreground">AI推荐度</div>
            </div>
          </div>

          {/* AI提示 */}
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
            <div className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-primary mt-0.5" />
              <div className="flex-1">
                <div className="text-xs font-medium mb-1">AI培育策略</div>
                <div className="text-xs text-muted-foreground">
                  基于客户画像和历史数据，采用"建立信任→提供价值→创造体验→推动决策"的四步法，循序渐进提升转化率
                </div>
              </div>
            </div>
          </div>

          {/* 7天计划 */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4" />
              培育计划详情
            </h4>

            <div className="space-y-2">
              {mockPlan.map((item) => (
                <div
                  key={item.day}
                  className={`rounded-lg border-2 transition-all cursor-pointer ${
                    selectedDay === item.day
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedDay(selectedDay === item.day ? null : item.day)}
                >
                  {/* 展开内容 */}
                  <div className="p-3">
                    <div className="flex items-start gap-3">
                      {/* 天数标记 */}
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold flex-shrink-0">
                        D{item.day}
                      </div>

                      {/* 内容 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <Badge variant="outline" className="text-xs flex items-center gap-1">
                            {getChannelIcon(item.channel)}
                            {getChannelLabel(item.channel)}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{item.time}</span>
                          <Badge variant="secondary" className="text-xs">
                            {item.status === 'pending' ? '待执行' : '已完成'}
                          </Badge>
                        </div>
                        <p className="text-sm line-clamp-1">{item.content}</p>
                      </div>

                      {/* AI建议图标 */}
                      <Bot className="h-4 w-4 text-primary flex-shrink-0" />
                    </div>
                  </div>

                  {/* 展开的AI建议 */}
                  {selectedDay === item.day && (
                    <div className="border-t border-border p-3 bg-accent/30">
                      <div className="flex items-start gap-2">
                        <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-xs font-medium mb-1">AI执行建议</div>
                          <div className="text-xs text-muted-foreground">{item.aiSuggestion}</div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="default" className="text-xs h-7">
                          立即执行
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs h-7">
                          调整内容
                        </Button>
                        <Button size="sm" variant="ghost" className="text-xs h-7">
                          标记完成
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            关闭
          </Button>
          <Button
            onClick={() => {
              if (onApply) onApply()
              onOpenChange(false)
            }}
          >
            <Calendar className="h-4 w-4 mr-2" />
            应用此计划
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
