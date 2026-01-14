import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { mockLeads } from '@/lib/mock-data'
import {
  Users,
  UserPlus,
  Search,
  Filter,
  ArrowUpDown,
  Phone,
  Mail,
  Building,
  Tag,
  TrendingUp,
  AlertTriangle,
  Calendar,
  CheckCircle2,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AddLeadDialog from '@/components/dialogs/AddLeadDialog'
import { cn } from '@/lib/utils'

export default function Customers() {
  const navigate = useNavigate()
  const [addLeadOpen, setAddLeadOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'my' | 'pool'>('my')
  const [searchQuery, setSearchQuery] = useState('')

  // 模拟数据：我的客户
  const myCustomers = mockLeads.filter(l => l.status === '跟进中')

  // 模拟数据：公海池客户
  const poolCustomers = [
    {
      id: 'c1',
      name: '王总',
      company: '科技发展有限公司',
      title: 'CTO',
      email: 'wang@example.com',
      phone: '138****1234',
      source: '官网咨询',
      status: 'potential',
      tags: ['高意向', 'SaaS'],
      score: 85,
      createdAt: '2024-01-10',
    },
    {
      id: 'c2',
      name: '李经理',
      company: '制造集团',
      title: '采购经理',
      email: 'li@example.com',
      phone: '139****5678',
      source: '展会',
      status: 'potential',
      tags: ['制造业', '数字化转型'],
      score: 72,
      createdAt: '2024-01-08',
    },
    {
      id: 'c3',
      name: '赵总监',
      company: '互联网公司',
      title: '运营总监',
      email: 'zhao@example.com',
      phone: '136****9012',
      source: '转介绍',
      status: 'potential',
      tags: ['互联网', '增长'],
      score: 90,
      createdAt: '2024-01-12',
    },
  ]

  const customers = activeTab === 'my' ? myCustomers : poolCustomers

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">客户管理</h2>
          <p className="text-muted-foreground mt-1">
            管理您的客户资源，从公海池领取或分配客户
          </p>
        </div>
        <Button onClick={() => setAddLeadOpen(true)} className="gap-2">
          <UserPlus className="h-4 w-4" />
          添加客户
        </Button>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              我的客户
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myCustomers.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              活跃客户 {myCustomers.filter(c => c.score > 70).length} 个
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              公海池
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{poolCustomers.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              高意向 {poolCustomers.filter(c => c.score > 80).length} 个
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              本月新增
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-success mt-1">
              ↑ 20% 较上月
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              需跟进
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-warning mt-1">
              3天内未跟进
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tab切换 */}
      <div className="flex items-center gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab('my')}
          className={cn(
            'px-4 py-2 text-sm font-medium transition-colors relative',
            activeTab === 'my'
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          我的客户
          {activeTab === 'my' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('pool')}
          className={cn(
            'px-4 py-2 text-sm font-medium transition-colors relative',
            activeTab === 'pool'
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          公海池
          {activeTab === 'pool' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索客户名称、公司、标签..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          筛选
        </Button>
        <Button variant="outline" className="gap-2">
          <ArrowUpDown className="h-4 w-4" />
          排序
        </Button>
      </div>

      {/* 客户列表 */}
      <Card className="glass-card">
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="flex items-center gap-4 p-4 hover:bg-accent transition-colors cursor-pointer group"
                onClick={() => {
                  // 导航到客户详情页
                  console.log('查看客户详情:', customer.id)
                }}
              >
                {/* 头像 */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-base font-semibold text-white flex-shrink-0">
                  {customer.name[0]}
                </div>

                {/* 客户信息 */}
                <div className="flex flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{customer.name}</span>
                    {customer.score >= 80 && (
                      <Badge variant="secondary" className="text-xs">高意向</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Building className="h-3 w-3" />
                      {customer.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {customer.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {customer.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {customer.tags?.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* 评分和状态 */}
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">意向度</span>
                    <span className="text-lg font-bold text-primary">{customer.score}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {customer.createdAt}
                  </div>
                  {activeTab === 'my' ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      {customer.source}
                    </Badge>
                  )}
                </div>

                {/* 操作按钮 */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {activeTab === 'pool' ? (
                    <Button size="sm" onClick={(e) => {
                      e.stopPropagation()
                      console.log('领取客户:', customer.id)
                    }}>
                      领取
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" size="sm" onClick={(e) => {
                        e.stopPropagation()
                        navigate('/conversations')
                      }}>
                        发消息
                      </Button>
                      <Button variant="outline" size="sm" onClick={(e) => {
                        e.stopPropagation()
                        console.log('更多操作')
                      }}>
                        •••
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 添加客户弹窗 */}
      <AddLeadDialog
        open={addLeadOpen}
        onOpenChange={setAddLeadOpen}
        onSave={(lead) => console.log('添加客户:', lead)}
      />
    </div>
  )
}
