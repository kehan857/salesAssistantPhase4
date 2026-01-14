import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Sparkles, Tag, TrendingUp, FileText } from 'lucide-react'

interface AddKnowledgeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (knowledge: any) => void
}

const categories = [
  { value: 'product', label: '产品知识', icon: '📦', color: 'bg-blue-500' },
  { value: 'sales', label: '销售技巧', icon: '💼', color: 'bg-green-500' },
  { value: ' objection', label: '异议处理', icon: '🎯', color: 'bg-purple-500' },
  { value: 'case', label: '成功案例', icon: '🏆', color: 'bg-orange-500' },
  { value: 'policy', label: '政策流程', icon: '📋', color: 'bg-pink-500' },
  { value: 'competitor', label: '竞品分析', icon: '⚔️', color: 'bg-red-500' }
]

export default function AddKnowledgeDialog({ open, onOpenChange, onSave }: AddKnowledgeDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    tags: [] as string[],
    relatedProducts: '',
    effectiveness: 85
  })

  const [tagInput, setTagInput] = useState('')

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] })
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tagToRemove) })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave?.({
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      usageCount: 0,
      author: '张三',
      aiGenerated: false
    })
    setFormData({ title: '', category: '', content: '', tags: [], relatedProducts: '', effectiveness: 85 })
    setTagInput('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            添加知识库内容
          </DialogTitle>
          <DialogDescription>
            创建新的知识条目，AI将自动分析内容并优化标签和推荐度
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 py-4">
            {/* 标题 */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                知识标题 <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="请输入知识标题，如：如何处理价格异议"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            {/* 分类选择 */}
            <div className="space-y-2">
              <label className="text-sm font-medium">知识分类 <span className="text-destructive">*</span></label>
              <div className="grid grid-cols-3 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: category.value })}
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                      formData.category === category.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <span className="text-xs font-medium">{category.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 内容 */}
            <div className="space-y-2">
              <label className="text-sm font-medium">知识内容 <span className="text-destructive">*</span></label>
              <Textarea
                placeholder="请输入详细的知识内容，包括背景、方法、案例等..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
                className="resize-none"
                required
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>建议内容详细且结构化</span>
                <span>{formData.content.length} 字</span>
              </div>
            </div>

            {/* 标签 */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Tag className="h-4 w-4" />
                标签
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="输入标签后按回车或点击添加"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                />
                <Button type="button" size="sm" variant="outline" onClick={handleAddTag}>
                  添加
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* 相关产品 */}
            <div className="space-y-2">
              <label className="text-sm font-medium">相关产品</label>
              <Input
                placeholder="如有，请输入相关产品名称，多个产品用逗号分隔"
                value={formData.relatedProducts}
                onChange={(e) => setFormData({ ...formData, relatedProducts: e.target.value })}
              />
            </div>

            {/* 预期效果 */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-success" />
                预期有效性: {formData.effectiveness}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.effectiveness}
                onChange={(e) => setFormData({ ...formData, effectiveness: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>一般</span>
                <span>良好</span>
                <span>优秀</span>
              </div>
            </div>

            {/* AI优化提示 */}
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                <div className="flex-1">
                  <div className="text-xs font-medium mb-1">AI自动优化</div>
                  <div className="text-xs text-muted-foreground">
                    保存后，AI将分析您的内容，自动优化标签、提取关键词，并基于使用反馈持续改进知识质量
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button type="submit" disabled={!formData.title || !formData.category || !formData.content}>
              <BookOpen className="h-4 w-4 mr-2" />
              保存知识
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
