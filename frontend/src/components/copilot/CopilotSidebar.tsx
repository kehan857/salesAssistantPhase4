import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Bot, Brain, TrendingUp, AlertTriangle, Send, Sparkles, Copy } from 'lucide-react'
import { mockAISuggestions, mockBANTData } from '@/lib/mock-data'

interface CopilotSidebarProps {
  conversationId: string
  onAdoptSuggestion?: (content: string) => void
}

export default function CopilotSidebar({ conversationId, onAdoptSuggestion }: CopilotSidebarProps) {
  const [inputText, setInputText] = useState('')
  const [polishedText, setPolishedText] = useState('')
  const [selectedTone, setSelectedTone] = useState<'professional' | 'friendly' | 'urgent'>('professional')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handlePolish = () => {
    // 模拟AI润色
    const polished = mockAISuggestions[0].content
    setPolishedText(polished)
  }

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleAdoptSuggestion = (content: string) => {
    if (onAdoptSuggestion) {
      onAdoptSuggestion(content)
    }
  }

  const handleAdoptPolished = () => {
    if (onAdoptSuggestion && polishedText) {
      onAdoptSuggestion(polishedText)
      setPolishedText('') // 清空润色后的文本
    }
  }

  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = Math.floor((now.getTime() - date.getTime()) / 60000)
    if (diff < 1) return '刚刚'
    if (diff < 60) return `${diff}分钟前`
    return '1小时前'
  }

  return (
    <div className="space-y-4">
      {/* AI实时建议 */}
      <Card className="glass-card">
        <CardHeader className="pb-2 pt-3 px-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Bot className="h-4 w-4" />
            AI实时建议
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 px-3 pb-3">
          {mockAISuggestions.map((suggestion) => (
            <div key={suggestion.id} className="rounded-lg border border-border bg-accent/50 p-2.5 animate-in slide-in">
              <div className="flex items-start gap-2 mb-2">
                {suggestion.type === 'reply' && <Sparkles className="h-3.5 w-3.5 text-primary mt-0.5" />}
                {suggestion.type === 'bant' && <Brain className="h-3.5 w-3.5 text-blue-500 mt-0.5" />}
                {suggestion.type === 'risk' && <AlertTriangle className="h-3.5 w-3.5 text-destructive mt-0.5" />}
                <Badge variant={suggestion.type === 'risk' ? 'destructive' : 'secondary'} className="text-xs">
                  {suggestion.type === 'reply' && '回复建议'}
                  {suggestion.type === 'bant' && 'BANT情报'}
                  {suggestion.type === 'risk' && '风险提示'}
                </Badge>
                <span className="text-xs text-muted-foreground ml-auto">
                  {formatRelativeTime(suggestion.timestamp)}
                </span>
              </div>
              <p className="text-xs leading-relaxed">{suggestion.content}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-muted-foreground">
                  {Math.round(suggestion.confidence * 100)}%
                </span>
                <div className="flex-1" />
                {suggestion.type === 'reply' && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs"
                      onClick={() => handleAdoptSuggestion(suggestion.content)}
                    >
                      采用
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 text-xs"
                      onClick={() => handleCopy(suggestion.content, suggestion.id)}
                    >
                      {copiedId === suggestion.id ? '已复制' : '复制'}
                    </Button>
                  </>
                )}
                {suggestion.type !== 'reply' && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 text-xs"
                    onClick={() => handleCopy(suggestion.content, suggestion.id)}
                  >
                    {copiedId === suggestion.id ? '已复制' : '复制'}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* BANT情报卡片 */}
      <Card className="glass-card">
        <CardHeader className="pb-2 pt-3 px-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Brain className="h-4 w-4 text-blue-500" />
            BANT情报
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 px-3 pb-3">
          {/* 预算 */}
          <div className="space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">💰 预算</span>
              <Badge variant="success" className="text-xs h-5">
                {Math.round(mockBANTData.budget.confidence * 100)}%
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground pl-4">
              <div>金额: {mockBANTData.budget.amount?.toLocaleString()}元</div>
              <div>来源: {mockBANTData.budget.source}</div>
            </div>
          </div>

          {/* 权限 */}
          <div className="space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">👤 权限</span>
              <Badge variant="warning" className="text-xs h-5">
                {Math.round(mockBANTData.authority.confidence * 100)}%
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground pl-4">
              <div>决策者: {mockBANTData.authority.decisionMaker}</div>
              <div>当前角色: {mockBANTData.authority.currentContactRole}</div>
            </div>
          </div>

          {/* 需求 */}
          <div className="space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">🎯 需求</span>
              <Badge variant="success" className="text-xs h-5">
                {Math.round(mockBANTData.need.confidence * 100)}%
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground pl-4">
              <div>痛点: {mockBANTData.need.painPoints.join('、')}</div>
            </div>
          </div>

          {/* 时间 */}
          <div className="space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">📅 时间</span>
              <Badge variant="secondary" className="text-xs h-5">
                {Math.round(mockBANTData.timeline.confidence * 100)}%
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground pl-4">
              <div>采购时间: {mockBANTData.timeline.purchaseDate}</div>
              <div>紧迫度: {mockBANTData.timeline.urgency === 'high' ? '高' : mockBANTData.timeline.urgency === 'medium' ? '中' : '低'}</div>
            </div>
          </div>

          {/* 整体置信度 */}
          <div className="pt-2 mt-1 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">整体置信度</span>
              <span className="text-base font-bold text-primary">
                {Math.round(mockBANTData.overallConfidence * 100)}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 情感分析 */}
      <Card className="glass-card">
        <CardHeader className="pb-2 pt-3 px-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500" />
            情感分析
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs">当前情绪</span>
              <Badge variant="success" className="text-xs">积极 75%</Badge>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div className="bg-success h-1.5 rounded-full" style={{ width: '75%' }} />
            </div>
            <div className="text-xs text-muted-foreground">
              客户情绪整体向好，建议避免过多讨论价格
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 文案润色工具 */}
      <Card className="glass-card">
        <CardHeader className="pb-2 pt-3 px-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Sparkles className="h-4 w-4 text-purple-500" />
            文案润色
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5 px-3 pb-3">
          <Textarea
            placeholder="输入您的回复..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={2}
            className="text-sm resize-none"
          />

          {/* 语气选择 */}
          <div className="flex gap-1.5">
            <Button
              size="sm"
              variant={selectedTone === 'professional' ? 'default' : 'outline'}
              onClick={() => setSelectedTone('professional')}
              className="flex-1 text-xs h-7"
            >
              商务
            </Button>
            <Button
              size="sm"
              variant={selectedTone === 'friendly' ? 'default' : 'outline'}
              onClick={() => setSelectedTone('friendly')}
              className="flex-1 text-xs h-7"
            >
              亲和
            </Button>
            <Button
              size="sm"
              variant={selectedTone === 'urgent' ? 'default' : 'outline'}
              onClick={() => setSelectedTone('urgent')}
              className="flex-1 text-xs h-7"
            >
              紧迫
            </Button>
          </div>

          <Button
            onClick={handlePolish}
            disabled={!inputText}
            className="w-full"
            size="sm"
          >
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            AI润色
          </Button>

          {polishedText && (
            <div className="rounded-lg border border-primary/50 bg-primary/5 p-2.5 animate-in slide-in">
              <div className="text-xs font-medium text-primary mb-1.5">✨ 润色后：</div>
              <p className="text-xs leading-relaxed">{polishedText}</p>
              <div className="flex gap-1.5 mt-2">
                <Button
                  size="sm"
                  variant="default"
                  className="flex-1 text-xs h-7"
                  onClick={handleAdoptPolished}
                >
                  <Send className="h-3 w-3 mr-1" />
                  采用
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 text-xs h-7"
                  onClick={() => handleCopy(polishedText, 'polished')}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  {copiedId === 'polished' ? '已复制' : '复制'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
