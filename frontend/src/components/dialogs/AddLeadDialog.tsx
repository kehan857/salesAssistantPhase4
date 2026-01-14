import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { UserPlus, Building, Mail, Phone, Star, Target } from 'lucide-react'

interface AddLeadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (lead: any) => void
}

export default function AddLeadDialog({ open, onOpenChange, onSave }: AddLeadDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    title: '',
    email: '',
    phone: '',
    score: 50,
    source: '',
    notes: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const avatar = formData.name[0] || '客'
    onSave?.({
      id: Date.now().toString(),
      avatar,
      ...formData,
      status: 'new',
      createdAt: new Date().toISOString(),
      lastContactAt: new Date().toISOString()
    })
    setFormData({ name: '', company: '', title: '', email: '', phone: '', score: 50, source: '', notes: '' })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            添加新线索
          </DialogTitle>
          <DialogDescription>
            添加新的销售线索，系统将自动生成7天智能培育计划
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* 基本信息 */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <UserPlus className="h-4 w-4 text-primary" />
                基本信息
              </h4>

              <div className="grid grid-cols-2 gap-3">
                {/* 姓名 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium">客户姓名 <span className="text-destructive">*</span></label>
                  <Input
                    placeholder="请输入姓名"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                {/* 职位 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium">职位</label>
                  <Input
                    placeholder="如：采购经理"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium flex items-center gap-2">
                  <Building className="h-3.5 w-3.5" />
                  公司名称 <span className="text-destructive">*</span>
                </label>
                <Input
                  placeholder="请输入公司名称"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* 邮箱 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    邮箱
                  </label>
                  <Input
                    type="email"
                    placeholder="example@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                {/* 电话 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5" />
                    电话
                  </label>
                  <Input
                    placeholder="请输入电话号码"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* 线索评分 */}
            <div className="space-y-2">
              <label className="text-xs font-medium flex items-center gap-2">
                <Star className="h-4 w-4 text-warning" />
                初始评分: {formData.score}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.score}
                onChange={(e) => setFormData({ ...formData, score: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>低意向</span>
                <span>中意向</span>
                <span>高意向</span>
              </div>
            </div>

            {/* 来源 */}
            <div className="space-y-2">
              <label className="text-xs font-medium">线索来源</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'website', label: '官网咨询' },
                  { value: 'exhibition', label: '展会' },
                  { value: 'referral', label: '客户推荐' },
                  { value: 'coldcall', label: '电话开发' },
                  { value: 'social', label: '社交媒体' },
                  { value: 'other', label: '其他' }
                ].map((source) => (
                  <button
                    key={source.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, source: source.value })}
                    className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                      formData.source === source.value
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {source.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 备注 */}
            <div className="space-y-2">
              <label className="text-xs font-medium">备注</label>
              <Textarea
                placeholder="请输入线索的背景信息、需求描述等..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="resize-none"
              />
            </div>

            {/* AI培育计划提示 */}
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
              <div className="flex items-start gap-2">
                <Target className="h-4 w-4 text-primary mt-0.5" />
                <div className="flex-1">
                  <div className="text-xs font-medium mb-1">AI自动生成7天培育计划</div>
                  <div className="text-xs text-muted-foreground">
                    保存后，系统将根据线索评分和来源，自动生成个性化的7天培育计划，包括触达时间、内容和渠道建议
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button type="submit" disabled={!formData.name || !formData.company}>
              <UserPlus className="h-4 w-4 mr-2" />
              添加线索
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
