import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Eye, TrendingUp, ThumbsUp, Share, Edit, Star, Copy, MessageSquare } from 'lucide-react'

interface KnowledgeDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  knowledge?: any
}

const mockKnowledge = {
  id: '1',
  title: '如何应对"你们价格太贵了"的异议',
  category: '异议处理',
  content: `当客户提出价格异议时，不要立即降价或打折，而是采用以下策略：

1. **探询真实原因**
   - "能否了解一下，您觉得贵主要是体现在哪些方面？"
   - 了解是预算问题还是价值认知问题

2. **价值锚定**
   - "我们的价格确实比竞品高15%，但我们的产品可以帮您提升30%的效率，长期来看反而节省成本"
   - 用数据和案例量化价值

3. **分期方案**
   - "如果预算紧张，我们可以提供分期付款方案"
   - 降低决策门槛

4. **套餐对比**
   - 展示不同套餐的功能差异
   - 让客户自主选择最适合的方案

5. **限时优惠**
   - "本月下单可以享受95折优惠"
   - 制造紧迫感

**成功案例**：
某客户同样提出价格异议，通过以上沟通，最终签约金额反而比原计划高出20%`,
  tags: ['价格异议', '谈判技巧', '成交'],
  usageCount: 156,
  effectiveness: 92,
  author: '张三',
  createdAt: '2024-01-10',
  relatedProducts: ['CRM系统', '数据分析工具'],
  aiGenerated: false,
  feedback: { helpful: 142, notHelpful: 14 }
}

export default function KnowledgeDetailDialog({ open, onOpenChange, knowledge }: KnowledgeDetailDialogProps) {
  const [liked, setLiked] = useState(false)
  const [copied, setCopied] = useState(false)

  // 使用传入的 knowledge 或者默认的 mockKnowledge
  const data = knowledge || mockKnowledge

  const handleCopy = () => {
    navigator.clipboard.writeText(data.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleLike = () => {
    setLiked(!liked)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5 text-primary" />
                {data.title}
              </DialogTitle>
              <DialogDescription className="mt-2">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">{data.category}</Badge>
                  <span className="text-xs text-muted-foreground">
                    作者: {data.author}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {data.createdAt}
                  </span>
                </div>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* 使用统计 */}
          <div className="grid grid-cols-4 gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-accent/50 p-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-lg font-bold">{data.usageCount}</div>
                <div className="text-xs text-muted-foreground">查看次数</div>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-accent/50 p-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <div>
                <div className="text-lg font-bold">{data.effectiveness}%</div>
                <div className="text-xs text-muted-foreground">有效性</div>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-accent/50 p-2">
              <ThumbsUp className="h-4 w-4 text-primary" />
              <div>
                <div className="text-lg font-bold">{data.feedback.helpful}</div>
                <div className="text-xs text-muted-foreground">有用</div>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-accent/50 p-2">
              <MessageSquare className="h-4 w-4 text-warning" />
              <div>
                <div className="text-lg font-bold">{Math.round(data.usageCount * 0.3)}</div>
                <div className="text-xs text-muted-foreground">应用次数</div>
              </div>
            </div>
          </div>

          {/* 标签 */}
          {data.tags && data.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* 知识内容 */}
          <div className="rounded-lg border border-border bg-accent/30 p-4">
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {data.content}
              </div>
            </div>
          </div>

          {/* 相关产品 */}
          {data.relatedProducts && data.relatedProducts.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground">相关产品</div>
              <div className="flex flex-wrap gap-2">
                {data.relatedProducts.map((product: string) => (
                  <Badge key={product} variant="secondary" className="text-xs">
                    {product}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* 反馈提示 */}
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-warning" />
              <div className="flex-1">
                <div className="text-xs font-medium mb-1">您觉得这个知识有用吗？</div>
                <div className="text-xs text-muted-foreground">
                  您的反馈将帮助AI优化知识库推荐，为销售团队提供更好的支持
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-col gap-2">
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              className={`flex-1 ${liked ? 'bg-primary text-primary-foreground' : ''}`}
              onClick={handleLike}
            >
              <ThumbsUp className="h-4 w-4 mr-2" />
              有用 ({data.feedback.helpful})
            </Button>
            <Button variant="outline" className="flex-1">
              <ThumbsUp className="h-4 w-4 mr-2 rotate-180" />
              无用 ({data.feedback.notHelpful})
            </Button>
            <Button
              variant="outline"
              className={copied ? 'bg-success text-success-foreground' : ''}
              onClick={handleCopy}
            >
              <Copy className="h-4 w-4 mr-2" />
              {copied ? '已复制' : '复制'}
            </Button>
          </div>
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1">
              <Share className="h-4 w-4 mr-2" />
              分享
            </Button>
            <Button variant="outline" className="flex-1">
              <Edit className="h-4 w-4 mr-2" />
              编辑
            </Button>
            <Button onClick={() => onOpenChange(false)} className="flex-1">
              关闭
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
