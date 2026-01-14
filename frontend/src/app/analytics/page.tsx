import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import ExportDialog from '@/components/dialogs/ExportDialog'

export default function Analytics() {
  const [exportDialogOpen, setExportDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">数据分析</h2>
          <p className="text-muted-foreground">
            销售漏斗、转化率、团队效能等深度分析
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            时间范围
          </Button>
          <Button variant="outline" onClick={() => setExportDialogOpen(true)}>
            <Download className="h-4 w-4 mr-2" />
            导出报告
          </Button>
        </div>
      </div>

      {/* 核心指标 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">总销售额</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥128万</div>
            <div className="flex items-center text-xs text-success mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +12.5% 较上月
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">线索数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <div className="flex items-center text-xs text-success mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +8.2% 较上月
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">转化率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28.5%</div>
            <div className="flex items-center text-xs text-success mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +3.1% 较上月
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">平均客单价</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥10.4万</div>
            <div className="flex items-center text-xs text-destructive mt-1">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              -2.3% 较上月
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 销售漏斗 */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>销售漏斗</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { stage: '新线索', count: 1234, conversion: 100, color: 'bg-blue-500' },
              { stage: '已联系', count: 456, conversion: 37, color: 'bg-indigo-500' },
              { stage: '已确认', count: 234, conversion: 19, color: 'bg-purple-500' },
              { stage: '方案中', count: 123, conversion: 10, color: 'bg-pink-500' },
              { stage: '谈判中', count: 67, conversion: 5.4, color: 'bg-orange-500' },
              { stage: '已成交', count: 35, conversion: 2.8, color: 'bg-green-500' },
            ].map((stage) => (
              <div key={stage.stage} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{stage.stage}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">{stage.count}个</span>
                    <Badge variant="outline" className="text-xs">{stage.conversion}%</Badge>
                  </div>
                </div>
                <div className="h-8 bg-muted rounded-lg overflow-hidden">
                  <div
                    className={`h-full ${stage.color} rounded-lg flex items-center justify-end pr-3 text-white text-sm font-medium`}
                    style={{ width: `${stage.conversion * 5}%` }}
                  >
                    {stage.conversion > 15 && stage.count}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* 团队效能 */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>团队效能排行</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: '张三', deals: 12, amount: 128 },
                { name: '李四', deals: 10, amount: 98 },
                { name: '王五', deals: 8, amount: 85 },
                { name: '赵六', deals: 7, amount: 72 },
                { name: '刘七', deals: 5, amount: 52 },
              ].map((person, i) => (
                <div key={person.name} className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                    i === 0 ? 'bg-yellow-500 text-white' :
                    i === 1 ? 'bg-gray-400 text-white' :
                    i === 2 ? 'bg-orange-400 text-white' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{person.name}</div>
                    <div className="text-xs text-muted-foreground">{person.deals}单 • ¥{person.amount}万</div>
                  </div>
                  <div className="text-sm font-semibold text-success">#{i + 1}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 转化趋势 */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>月度转化趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { month: '8月', leads: 856, converted: 198, rate: 23.1 },
                { month: '9月', leads: 945, converted: 234, rate: 24.8 },
                { month: '10月', leads: 1024, converted: 268, rate: 26.2 },
                { month: '11月', leads: 1156, converted: 312, rate: 27.0 },
                { month: '12月', leads: 1234, converted: 352, rate: 28.5 },
              ].map((data) => (
                <div key={data.month} className="flex items-center gap-3">
                  <div className="w-12 text-sm text-muted-foreground">{data.month}</div>
                  <div className="flex-1">
                    <div className="h-6 bg-muted rounded overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded"
                        style={{ width: `${data.rate * 2}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-sm text-right">
                    <div className="font-medium">{data.converted}单</div>
                    <div className="text-xs text-muted-foreground">{data.rate}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI助手效能 */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🤖 AI助手效能
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 rounded-lg bg-accent/50">
              <div className="text-3xl font-bold text-primary mb-1">1,234</div>
              <div className="text-sm text-muted-foreground">BANT提取次数</div>
              <div className="text-xs text-success mt-1">准确率 92%</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-accent/50">
              <div className="text-3xl font-bold text-primary mb-1">856</div>
              <div className="text-sm text-muted-foreground">文案润色次数</div>
              <div className="text-xs text-success mt-1">采用率 78%</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-accent/50">
              <div className="text-3xl font-bold text-primary mb-1">2,345</div>
              <div className="text-sm text-muted-foreground">培育消息发送</div>
              <div className="text-xs text-success mt-1">打开率 65%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ExportDialog
        open={exportDialogOpen}
        onOpenChange={setExportDialogOpen}
        title="导出分析报告"
        type="analytics"
      />
    </div>
  )
}
