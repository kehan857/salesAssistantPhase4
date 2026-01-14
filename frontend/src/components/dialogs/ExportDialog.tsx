import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, FileText, Calendar, Filter } from 'lucide-react'

interface ExportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  type?: 'conversations' | 'leads' | 'knowledge' | 'analytics'
}

export default function ExportDialog({ open, onOpenChange, title = '导出数据', type = 'analytics' }: ExportDialogProps) {
  const [exportFormat, setExportFormat] = useState<'excel' | 'pdf' | 'csv'>('excel')
  const [dateRange, setDateRange] = useState<'7days' | '30days' | '90days' | 'all'>('30days')
  const [selectedFields, setSelectedFields] = useState<string[]>([])

  const fieldOptions = {
    conversations: ['对话内容', '客户信息', 'BANT分析', '情感分析', 'AI建议', '时间戳'],
    leads: ['基本信息', '评分', '状态', '培育计划', '跟进记录', '来源'],
    knowledge: ['标题', '分类', '内容', '标签', '使用统计', '有效性'],
    analytics: ['统计数据', '图表', '趋势分析', '团队排名', '转化率']
  }

  const handleToggleField = (field: string) => {
    setSelectedFields(prev =>
      prev.includes(field)
        ? prev.filter(f => f !== field)
        : [...prev, field]
    )
  }

  const handleSelectAll = () => {
    setSelectedFields(fieldOptions[type])
  }

  const handleExport = () => {
    console.log('导出:', { type, format: exportFormat, dateRange, fields: selectedFields })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            {title}
          </DialogTitle>
          <DialogDescription>
            选择导出格式和内容范围，生成可离线查看的数据报告
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* 导出格式 */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              导出格式
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'excel', label: 'Excel', icon: '📊', desc: '可编辑' },
                { value: 'pdf', label: 'PDF', icon: '📄', desc: '只读' },
                { value: 'csv', label: 'CSV', icon: '📋', desc: '数据' }
              ].map((format) => (
                <button
                  key={format.value}
                  type="button"
                  onClick={() => setExportFormat(format.value as any)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all ${
                    exportFormat === format.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <span className="text-2xl">{format.icon}</span>
                  <span className="text-xs font-medium">{format.label}</span>
                  <span className="text-xs text-muted-foreground">{format.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 时间范围 */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              时间范围
            </label>
            <div className="flex gap-2">
              {[
                { value: '7days', label: '近7天' },
                { value: '30days', label: '近30天' },
                { value: '90days', label: '近90天' },
                { value: 'all', label: '全部' }
              ].map((range) => (
                <button
                  key={range.value}
                  type="button"
                  onClick={() => setDateRange(range.value as any)}
                  className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-all ${
                    dateRange === range.value
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* 选择字段 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-2">
                <Filter className="h-4 w-4" />
                包含字段
              </label>
              <Button type="button" size="sm" variant="ghost" onClick={handleSelectAll} className="text-xs h-7">
                全选
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {fieldOptions[type].map((field) => (
                <button
                  key={field}
                  type="button"
                  onClick={() => handleToggleField(field)}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                    selectedFields.includes(field)
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {field}
                </button>
              ))}
            </div>
            {selectedFields.length > 0 && (
              <p className="text-xs text-muted-foreground">
                已选择 {selectedFields.length} 个字段
              </p>
            )}
          </div>

          {/* 预览提示 */}
          <div className="rounded-lg border border-border bg-accent/50 p-3">
            <div className="text-xs text-muted-foreground">
              预计导出 <span className="font-semibold text-foreground">150+</span> 条数据，
              格式为 <span className="font-semibold text-foreground">{exportFormat.toUpperCase()}</span>，
              时间范围 <span className="font-semibold text-foreground">{dateRange === 'all' ? '全部时间' : dateRange}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleExport} disabled={selectedFields.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            导出
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
