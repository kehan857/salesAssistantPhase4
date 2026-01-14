import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bell, CheckCircle2, AlertTriangle, Info, MessageSquare, X } from 'lucide-react'
import { formatRelativeTime } from '@/lib/utils'

interface NotificationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const mockNotifications = [
  {
    id: '1',
    type: 'success',
    title: '新线索已分配',
    message: '李总（XX科技公司）已分配给您，评分85分，请及时跟进',
    time: new Date(Date.now() - 1000 * 60 * 5), // 5分钟前
    read: false,
    action: '查看详情'
  },
  {
    id: '2',
    type: 'warning',
    title: '客户情绪下降预警',
    message: '王总对话情绪从85%降至65%，建议主动联系了解情况',
    time: new Date(Date.now() - 1000 * 60 * 30), // 30分钟前
    read: false,
    action: '查看对话'
  },
  {
    id: '3',
    type: 'info',
    title: 'AI建议已更新',
    message: '知识库已更新3条新内容，包含最新异议处理话术',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2小时前
    read: true,
    action: '查看知识库'
  }
]

export default function NotificationDialog({ open, onOpenChange }: NotificationDialogProps) {
  const [notifications, setNotifications] = useState(mockNotifications)

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="h-4 w-4 text-success" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-warning" />
      case 'info': return <Info className="h-4 w-4 text-primary" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  const getIconBg = (type: string) => {
    switch (type) {
      case 'success': return 'bg-success/10'
      case 'warning': return 'bg-warning/10'
      case 'info': return 'bg-primary/10'
      default: return 'bg-muted'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <DialogTitle>通知中心</DialogTitle>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">{unreadCount}</Badge>
              )}
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="text-xs h-7"
              onClick={handleMarkAllAsRead}
            >
              全部已读
            </Button>
          </div>
          <DialogDescription className="mt-2">
            查看系统通知和AI提醒
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p>暂无通知</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`relative p-4 rounded-lg border transition-all ${
                  notification.read
                    ? 'bg-transparent border-border opacity-60'
                    : 'bg-accent/50 border-primary/30'
                }`}
              >
                {!notification.read && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}

                <div className="flex gap-3">
                  <div className={`p-2 rounded-lg ${getIconBg(notification.type)} flex-shrink-0`}>
                    {getIcon(notification.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className={`text-sm font-semibold ${notification.read ? '' : 'text-foreground'}`}>
                        {notification.title}
                      </h4>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatRelativeTime(notification.time.toISOString())}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {notification.message}
                    </p>
                    <Button size="sm" variant="outline" className="text-xs h-7">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      {notification.action}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-6 py-3 border-t border-border bg-accent/30">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>共 {notifications.length} 条通知</span>
            <span>{unreadCount} 条未读</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
