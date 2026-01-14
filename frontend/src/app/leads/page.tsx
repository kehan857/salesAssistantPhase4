import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { mockLeads } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'
import {
  Search,
  Plus,
  Filter,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  CheckCircle2,
  Download,
} from 'lucide-react'
import AddLeadDialog from '@/components/dialogs/AddLeadDialog'
import NurturePlanDialog from '@/components/dialogs/NurturePlanDialog'
import ExportDialog from '@/components/dialogs/ExportDialog'

export default function Leads() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLead, setSelectedLead] = useState(mockLeads[0])
  const [leads, setLeads] = useState(mockLeads)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [nurturePlanDialogOpen, setNurturePlanDialogOpen] = useState(false)
  const [exportDialogOpen, setExportDialogOpen] = useState(false)

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleApplyNurturePlan = () => {
    if (!selectedLead) return

    // 更新选中线索的培育状态
    setLeads(prev => prev.map(lead => {
      if (lead.id === selectedLead.id) {
        return {
          ...lead,
          nurtureDay: 1, // 从第1天开始
          status: 'contacted' // 更新状态为已联系
        }
      }
      return lead
    }))

    // 同时更新selectedLead
    setSelectedLead(prev => prev ? {
      ...prev,
      nurtureDay: 1,
      status: 'contacted'
    } : null)
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: any }> = {
      new: { label: '新线索', variant: 'default' },
      contacted: { label: '已联系', variant: 'secondary' },
      qualified: { label: '已确认', variant: 'success' },
      proposal: { label: '方案中', variant: 'warning' },
      negotiation: { label: '谈判中', variant: 'default' },
      converted: { label: '已转化', variant: 'success' },
      lost: { label: '已流失', variant: 'destructive' },
    }
    const { label, variant } = statusMap[status] || { label: status, variant: 'outline' }
    return <Badge variant={variant} className="text-xs">{label}</Badge>
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success'
    if (score >= 60) return 'text-warning'
    return 'text-destructive'
  }

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">线索管理</h2>
          <p className="text-muted-foreground">
            管理销售线索，7天智能培育计划自动跟进
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setExportDialogOpen(true)}>
            <Download className="h-4 w-4 mr-2" />
            导出
          </Button>
          <Button onClick={() => setAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            新建线索
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">总线索</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockLeads.length}</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">培育中</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockLeads.filter(l => l.nurtureDay && l.nurtureDay < 7).length}</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">高意向</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{mockLeads.filter(l => l.score >= 80).length}</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">本周转化</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        {/* 线索列表 */}
        <div className="flex-1">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索线索..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  筛选
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`flex items-center gap-4 p-4 rounded-lg border border-border cursor-pointer transition-all hover:bg-accent ${
                      selectedLead?.id === lead.id ? 'bg-accent border-primary' : ''
                    }`}
                  >
                    {/* 头像 */}
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-base font-semibold text-white">
                      {lead.avatar}
                    </div>

                    {/* 基本信息 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{lead.name}</span>
                        {getStatusBadge(lead.status)}
                        <div className="ml-auto flex items-center gap-1">
                          <TrendingUp className={`h-4 w-4 ${getScoreColor(lead.score)}`} />
                          <span className={`text-sm font-semibold ${getScoreColor(lead.score)}`}>
                            {lead.score}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{lead.company}</div>
                      <div className="text-xs text-muted-foreground">
                        {lead.title} • {lead.source}
                      </div>
                    </div>

                    {/* 培育进度 */}
                    {lead.nurtureDay && (
                      <div className="flex-shrink-0 text-center">
                        <div className="text-xs text-muted-foreground mb-1">培育进度</div>
                        <Badge variant="outline" className="text-sm">
                          Day {lead.nurtureDay}/7
                        </Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 线索详情 */}
        <div className="w-96">
          {selectedLead && (
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-lg font-semibold text-white">
                    {selectedLead.avatar}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{selectedLead.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {selectedLead.title} @ {selectedLead.company}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 联系方式 */}
                <div>
                  <div className="text-sm font-medium mb-3">联系方式</div>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      {selectedLead.email}
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      {selectedLead.phone}
                    </Button>
                  </div>
                </div>

                {/* 标签 */}
                <div>
                  <div className="text-sm font-medium mb-2">标签</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedLead.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* 7天培育计划 */}
                {selectedLead.nurtureDay || 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm font-medium">7天培育计划</div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-7"
                        onClick={() => setNurturePlanDialogOpen(true)}
                      >
                        查看详情
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                        <div
                          key={day}
                          className={`flex items-center gap-3 p-2 rounded-lg border ${
                            day === selectedLead.nurtureDay || 0
                              ? 'bg-primary/10 border-primary'
                              : day < selectedLead.nurtureDay || 0
                              ? 'bg-success/10 border-success/30'
                              : 'bg-muted/30 border-border'
                          }`}
                        >
                          {day < selectedLead.nurtureDay || 0 ? (
                            <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <div className="text-xs font-medium">Day {day}</div>
                            <div className="text-xs text-muted-foreground">
                              {day === 1 && '建立信任，发送欢迎语'}
                              {day === 2 && '痛点挖掘，发送案例'}
                              {day === 3 && '价值呈现，产品介绍'}
                              {day === 4 && '方案匹配，Demo演示'}
                              {day === 5 && '解决疑虑，异议处理'}
                              {day === 6 && '制造紧迫，限时优惠'}
                              {day === 7 && '最后推动或归档'}
                            </div>
                          </div>
                          {day === selectedLead.nurtureDay || 0 && (
                            <Badge variant="default" className="text-xs">进行中</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 下一步行动 */}
                <div>
                  <div className="text-sm font-medium mb-3">下一步行动</div>
                  <div className="flex items-center gap-2 p-3 rounded-lg border border-border bg-accent/50">
                    <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                    <div className="flex-1 text-sm">{selectedLead.nextAction}</div>
                    <Button size="sm" variant="outline">
                      查看
                    </Button>
                  </div>
                </div>

                {/* 创建时间 */}
                <div className="text-xs text-muted-foreground pt-2 border-t border-border">
                  创建于 {formatDate(selectedLead.createdAt)}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* 弹窗 */}
      <AddLeadDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSave={(lead) => console.log('添加线索:', lead)}
      />
      <NurturePlanDialog
        open={nurturePlanDialogOpen}
        onOpenChange={setNurturePlanDialogOpen}
        leadName={selectedLead?.name}
        onApply={handleApplyNurturePlan}
      />
      <ExportDialog
        open={exportDialogOpen}
        onOpenChange={setExportDialogOpen}
        title="导出线索数据"
        type="leads"
      />
    </div>
  )
}
