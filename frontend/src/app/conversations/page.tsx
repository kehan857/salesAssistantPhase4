import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { formatRelativeTime } from '@/lib/utils'
import { mockConversations } from '@/lib/mock-data'
import { MessageSquare, Search, MoreVertical, Phone, Mail, Video, Plus, Download } from 'lucide-react'
import CopilotSidebar from '@/components/copilot/CopilotSidebar'
import ChatInput from '@/components/copilot/ChatInput'
import AddConversationDialog from '@/components/dialogs/AddConversationDialog'
import ExportDialog from '@/components/dialogs/ExportDialog'

export default function Conversations() {
  const [selectedConversationId, setSelectedConversationId] = useState('1')
  const [searchQuery, setSearchQuery] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [exportDialogOpen, setExportDialogOpen] = useState(false)
  const [conversations, setConversations] = useState(mockConversations)

  const selectedConversation = conversations.find(c => c.id === selectedConversationId)

  const filteredConversations = conversations.filter(c =>
    c.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.leadCompany.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = (message: string) => {
    console.log('发送消息:', message)

    // 创建新消息
    const newMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: message,
      timestamp: new Date().toISOString(),
      sender: '我'
    }

    // 更新对话列表
    setConversations(prev => prev.map(conv => {
      if (conv.id === selectedConversationId) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessageAt: new Date().toISOString()
        }
      }
      return conv
    }))

    setInputValue('') // 发送后清空输入框
  }

  const handleAdoptSuggestion = (content: string) => {
    setInputValue(content) // 将建议内容填充到输入框
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success" className="text-xs">进行中</Badge>
      case 'converted':
        return <Badge variant="default" className="text-xs">已转化</Badge>
      case 'archived':
        return <Badge variant="secondary" className="text-xs">已归档</Badge>
      case 'lost':
        return <Badge variant="destructive" className="text-xs">已流失</Badge>
      default:
        return <Badge variant="outline" className="text-xs">{status}</Badge>
    }
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'wechat':
        return '💬'
      case 'email':
        return '📧'
      case 'phone':
        return '📞'
      default:
        return '💬'
    }
  }

  const handleAddConversation = (conversation: any) => {
    console.log('添加对话:', conversation)
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      {/* 左侧对话列表 */}
      <div className="w-64 flex flex-col glass-card rounded-lg">
        {/* 头部 + 搜索栏 */}
        <div className="p-3 border-b border-border space-y-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="搜索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-sm"
            />
          </div>
        </div>

        {/* 对话列表 */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversationId(conversation.id)}
              className={`p-3 border-b border-border cursor-pointer transition-colors hover:bg-accent ${
                selectedConversationId === conversation.id ? 'bg-accent' : ''
              }`}
            >
              <div className="flex items-start gap-2">
                {/* 头像 */}
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-semibold text-white">
                  {conversation.leadName[0]}
                </div>

                {/* 内容 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="font-medium text-xs truncate">
                      {conversation.leadName}
                    </span>
                    {getStatusBadge(conversation.status)}
                  </div>
                  <div className="text-xs text-muted-foreground mb-1 truncate">
                    {conversation.leadCompany}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {getChannelIcon(conversation.channel)} {
                      conversation.messages[conversation.messages.length - 1]?.content.substring(0, 25)
                    }...
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {formatRelativeTime(conversation.lastMessageAt)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 中间聊天区域 */}
      <div className="flex-1 flex flex-col glass-card rounded-lg">
        {selectedConversation ? (
          <>
            {/* 聊天头部 */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-semibold text-white">
                  {selectedConversation.leadName[0]}
                </div>
                <div>
                  <div className="font-semibold">{selectedConversation.leadName}</div>
                  <div className="text-xs text-muted-foreground">
                    {selectedConversation.leadCompany}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" title="电话">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" title="邮件">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" title="视频">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* 消息列表 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {selectedConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                    {message.role === 'user' && message.sender && (
                      <div className="text-xs text-muted-foreground mb-1">
                        {message.sender}
                      </div>
                    )}
                    <div
                      className={`rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {formatRelativeTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 输入框 */}
            <ChatInput
              onSend={handleSendMessage}
              value={inputValue}
              onChange={setInputValue}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>选择一个对话开始聊天</p>
            </div>
          </div>
        )}
      </div>

      {/* 右侧AI助手 */}
      <div className="w-96 overflow-y-auto custom-scrollbar">
        {selectedConversation && (
          <CopilotSidebar
            conversationId={selectedConversationId}
            onAdoptSuggestion={handleAdoptSuggestion}
          />
        )}
      </div>

      {/* 弹窗 */}
      <AddConversationDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSave={handleAddConversation}
      />
      <ExportDialog
        open={exportDialogOpen}
        onOpenChange={setExportDialogOpen}
        title="导出对话数据"
        type="conversations"
      />
    </div>
  )
}
