import { Outlet, Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  BookOpen,
  BarChart3,
  Bot,
  Settings,
  HelpCircle,
  Bell,
  Target,
  Calendar,
} from 'lucide-react'
import NotificationDialog from '@/components/dialogs/NotificationDialog'

const navigation = [
  { name: '主控台', href: '/dashboard', icon: LayoutDashboard },
  { name: '客户管理', href: '/customers', icon: Users },
  { name: '对话管理', href: '/conversations', icon: MessageSquare },
  { name: '线索管理', href: '/leads', icon: Target },
  { name: '培育计划', href: '/nurture', icon: Calendar },
  { name: '知识库', href: '/knowledge', icon: BookOpen },
  { name: '智能体', href: '/agents', icon: Bot },
  { name: '数据分析', href: '/analytics', icon: BarChart3 },
]

const secondaryNavigation = [
  { name: '系统设置', href: '/settings', icon: Settings },
  { name: '帮助中心', href: '/help', icon: HelpCircle },
]

export default function MainLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [notificationOpen, setNotificationOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* 侧边栏 */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 glass border-r border-border">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">销售AI助手</span>
            <span className="text-xs text-muted-foreground">四期</span>
          </div>
        </div>

        {/* 导航菜单 */}
        <nav className="flex flex-col gap-1 p-4">
          <div className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
            主菜单
          </div>
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground',
                  isActive && 'bg-primary text-primary-foreground hover:bg-primary/90'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}

          <div className="mt-6 mb-2 px-2 text-xs font-semibold text-muted-foreground">
            系统
          </div>
          {secondaryNavigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground"
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* 用户信息 */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-semibold text-white">
              张
            </div>
            <div className="flex flex-1 flex-col">
              <span className="text-sm font-medium">张三</span>
              <span className="text-xs text-muted-foreground">销售经理</span>
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="pl-64">
        {/* 顶部栏 */}
        <header className="sticky top-0 z-40 glass border-b border-border">
          <div className="flex h-16 items-center gap-4 px-6">
            <div className="flex-1">
              <h1 className="text-lg font-semibold">智能销售闭环系统</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="rounded-lg p-2 hover:bg-accent transition-colors relative"
                title="AI助手"
                onClick={() => navigate('/conversations')}
              >
                <Bot className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-success animate-pulse" />
              </button>
              <button
                className="rounded-lg p-2 hover:bg-accent transition-colors relative"
                title="通知"
                onClick={() => setNotificationOpen(true)}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-[10px] text-white flex items-center justify-center">3</span>
              </button>
              <button
                className="rounded-lg p-2 hover:bg-accent transition-colors"
                title="设置"
                onClick={() => navigate('/settings')}
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* 页面内容 */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* 通知弹窗 */}
      <NotificationDialog
        open={notificationOpen}
        onOpenChange={setNotificationOpen}
      />
    </div>
  )
}
