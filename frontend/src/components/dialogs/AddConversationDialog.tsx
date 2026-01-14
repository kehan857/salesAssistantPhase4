import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, User, Building } from 'lucide-react'

interface AddConversationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (conversation: any) => void
}

export default function AddConversationDialog({ open, onOpenChange, onSave }: AddConversationDialogProps) {
  const [formData, setFormData] = useState({
    leadName: '',
    leadCompany: '',
    channel: 'wechat'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave?.({
      id: Date.now().toString(),
      ...formData,
      status: 'active',
      messages: [],
      lastMessageAt: new Date().toISOString(),
      riskLevel: 'low'
    })
    setFormData({ leadName: '', leadCompany: '', channel: 'wechat' })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            创建新对话
          </DialogTitle>
          <DialogDescription>
            创建新的客户对话，AI助手将自动分析对话内容并提供实时建议
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* 客户姓名 */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                客户姓名 <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="请输入客户姓名"
                value={formData.leadName}
                onChange={(e) => setFormData({ ...formData, leadName: e.target.value })}
                required
              />
            </div>

            {/* 公司名称 */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Building className="h-4 w-4" />
                公司名称
              </label>
              <Input
                placeholder="请输入公司名称"
                value={formData.leadCompany}
                onChange={(e) => setFormData({ ...formData, leadCompany: e.target.value })}
              />
            </div>

            {/* 对话渠道 */}
            <div className="space-y-2">
              <label className="text-sm font-medium">对话渠道</label>
              <div className="flex gap-2">
                {[
                  { value: 'wechat', label: '微信', icon: '💬' },
                  { value: 'email', label: '邮件', icon: '📧' },
                  { value: 'phone', label: '电话', icon: '📞' }
                ].map((channel) => (
                  <button
                    key={channel.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, channel: channel.value })}
                    className={`flex-1 rounded-lg border-2 p-3 text-center transition-all ${
                      formData.channel === channel.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{channel.icon}</div>
                    <div className="text-xs font-medium">{channel.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* AI能力提示 */}
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
              <div className="flex items-start gap-2">
                <Badge variant="default" className="text-xs">AI</Badge>
                <div className="text-xs text-muted-foreground">
                  创建后，AI将自动为您分析对话内容，提取BANT信息，提供回复建议和情感分析
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button type="submit" disabled={!formData.leadName}>
              创建对话
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
