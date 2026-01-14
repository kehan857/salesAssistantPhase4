import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  User,
  Bell,
  Palette,
  Brain,
  Database,
  Shield,
  Info,
  Save,
  Mail,
  Phone,
  Building,
  Moon,
  Sun,
  Globe,
  CheckCircle2,
} from 'lucide-react'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [saveMessage, setSaveMessage] = useState('')

  const tabs = [
    { id: 'profile', name: '个人资料', icon: User },
    { id: 'notifications', name: '通知设置', icon: Bell },
    { id: 'appearance', name: '外观设置', icon: Palette },
    { id: 'ai', name: 'AI配置', icon: Brain },
    { id: 'data', name: '数据管理', icon: Database },
    { id: 'privacy', name: '隐私与安全', icon: Shield },
    { id: 'about', name: '关于', icon: Info },
  ]

  const handleSave = () => {
    setSaveMessage('保存成功！')
    setTimeout(() => setSaveMessage(''), 2000)
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">系统设置</h2>
        <p className="text-muted-foreground">
          管理您的账户、偏好设置和系统配置
        </p>
      </div>

      <div className="flex gap-6">
        {/* 左侧导航 */}
        <div className="w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="font-medium">{tab.name}</span>
            </button>
          ))}
        </div>

        {/* 右侧内容 */}
        <div className="flex-1">
          {/* 个人资料 */}
          {activeTab === 'profile' && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>个人资料</CardTitle>
                <CardDescription>更新您的个人信息和联系方式</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 头像 */}
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold text-white">
                    李
                  </div>
                  <div>
                    <Button variant="outline" size="sm">更换头像</Button>
                    <p className="text-xs text-muted-foreground mt-1">推荐尺寸：200x200px</p>
                  </div>
                </div>

                {/* 基本信息 */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">姓名</label>
                    <Input defaultValue="李明" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">职位</label>
                    <Input defaultValue="销售经理" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">邮箱</label>
                    <Input type="email" defaultValue="liming@company.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">手机号</label>
                    <Input type="tel" defaultValue="13800138000" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">公司</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-9" defaultValue="XX科技有限公司" />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">个人简介</label>
                    <Input
                      as="textarea"
                      className="min-h-[80px]"
                      defaultValue="专注于B2B销售，擅长客户关系维护"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">取消</Button>
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    保存更改
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 通知设置 */}
          {activeTab === 'notifications' && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>通知设置</CardTitle>
                <CardDescription>选择您希望接收的通知类型</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Bell className="h-4 w-4 text-primary" />
                        <span className="font-medium">新线索通知</span>
                      </div>
                      <p className="text-sm text-muted-foreground">当有新线索分配给您时接收通知</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Brain className="h-4 w-4 text-primary" />
                        <span className="font-medium">AI建议通知</span>
                      </div>
                      <p className="text-sm text-muted-foreground">当AI生成重要建议时接收通知</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Mail className="h-4 w-4 text-primary" />
                        <span className="font-medium">邮件通知</span>
                      </div>
                      <p className="text-sm text-muted-foreground">通过邮件接收重要更新摘要</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Phone className="h-4 w-4 text-primary" />
                        <span className="font-medium">短信通知</span>
                      </div>
                      <p className="text-sm text-muted-foreground">紧急事件通过短信通知</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    保存更改
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 外观设置 */}
          {activeTab === 'appearance' && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>外观设置</CardTitle>
                <CardDescription>自定义系统的外观和语言</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 主题选择 */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">主题模式</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-primary bg-primary/5">
                      <Sun className="h-6 w-6 text-primary" />
                      <span className="text-sm font-medium">浅色</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:border-primary/50">
                      <Moon className="h-6 w-6" />
                      <span className="text-sm">深色</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:border-primary/50">
                      <div className="flex gap-1">
                        <Sun className="h-6 w-6" />
                        <Moon className="h-6 w-6" />
                      </div>
                      <span className="text-sm">跟随系统</span>
                    </button>
                  </div>
                </div>

                {/* 语言选择 */}
                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    系统语言
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center gap-2 p-3 rounded-lg border-2 border-primary bg-primary/5">
                      <span>🇨🇳</span>
                      <span className="font-medium">简体中文</span>
                      <CheckCircle2 className="h-4 w-4 text-primary ml-auto" />
                    </button>
                    <button className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-primary/50">
                      <span>🇺🇸</span>
                      <span>English</span>
                    </button>
                  </div>
                </div>

                {/* 字体大小 */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">字体大小</label>
                  <div className="flex items-center gap-4">
                    <span className="text-sm">小</span>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      defaultValue="3"
                      className="flex-1"
                    />
                    <span className="text-lg">大</span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    保存更改
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* AI配置 */}
          {activeTab === 'ai' && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>AI配置</CardTitle>
                <CardDescription>自定义AI助手的行为和响应</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">回复风格</label>
                    <select className="w-full px-3 py-2 rounded-lg border border-border bg-background">
                      <option>专业商务</option>
                      <option>友好亲切</option>
                      <option>简洁高效</option>
                      <option>详细全面</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">AI建议频率</label>
                    <select className="w-full px-3 py-2 rounded-lg border border-border bg-background">
                      <option>仅在重要时刻</option>
                      <option>适中</option>
                      <option>频繁</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">启用BANT自动分析</label>
                      <Switch defaultChecked />
                    </div>
                    <p className="text-xs text-muted-foreground">AI将自动分析对话中的BANT信息</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">启用情感分析</label>
                      <Switch defaultChecked />
                    </div>
                    <p className="text-xs text-muted-foreground">实时分析客户情绪变化</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">自动生成培育计划</label>
                      <Switch />
                    </div>
                    <p className="text-xs text-muted-foreground">为新线索自动生成7天培育计划</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    保存更改
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 数据管理 */}
          {activeTab === 'data' && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>数据管理</CardTitle>
                <CardDescription>管理您的数据和存储</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-border bg-accent/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">存储空间使用</span>
                      <Badge variant="outline">2.3 GB / 10 GB</Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '23%' }} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">数据导出</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="justify-start">
                        <Database className="h-4 w-4 mr-2" />
                        导出对话记录
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Database className="h-4 w-4 mr-2" />
                        导出线索数据
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Database className="h-4 w-4 mr-2" />
                        导出知识库
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Database className="h-4 w-4 mr-2" />
                        导出分析报告
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">数据清理</h4>
                    <Button variant="destructive" className="w-full justify-start">
                      清理缓存数据
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      清理缓存不会删除您的数据，但会清除临时文件以释放空间
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 隐私与安全 */}
          {activeTab === 'privacy' && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>隐私与安全</CardTitle>
                <CardDescription>保护您的账户和数据安全</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">修改密码</h4>
                    <div className="space-y-2">
                      <Input type="password" placeholder="当前密码" />
                      <Input type="password" placeholder="新密码" />
                      <Input type="password" placeholder="确认新密码" />
                    </div>
                    <Button>更新密码</Button>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border">
                    <h4 className="text-sm font-medium">两步验证</h4>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div>
                        <div className="font-medium text-sm">启用两步验证</div>
                        <p className="text-xs text-muted-foreground">为您的账户添加额外的安全层</p>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border">
                    <h4 className="text-sm font-medium">数据隐私</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                        <div className="flex-1">
                          <div className="font-medium text-sm">与团队成员共享数据</div>
                          <p className="text-xs text-muted-foreground">允许团队查看您的对话和线索</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                        <div className="flex-1">
                          <div className="font-medium text-sm">匿名数据分析</div>
                          <p className="text-xs text-muted-foreground">帮助改进AI功能</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 关于 */}
          {activeTab === 'about' && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>关于</CardTitle>
                <CardDescription>系统信息和版本</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="h-20 w-20 mx-auto rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Brain className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">销售AI助手</h3>
                    <p className="text-muted-foreground">四期版本</p>
                  </div>
                  <Badge variant="outline">v2.4.0</Badge>
                </div>

                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">版本号</span>
                    <span className="font-medium">2.4.0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">最后更新</span>
                    <span className="font-medium">2025年1月</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">许可证</span>
                    <span className="font-medium">企业版</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-2">
                  <Button variant="outline" className="w-full">
                    查看更新日志
                  </Button>
                  <Button variant="outline" className="w-full">
                    使用条款
                  </Button>
                  <Button variant="outline" className="w-full">
                    隐私政策
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* 保存成功提示 */}
      {saveMessage && (
        <div className="fixed bottom-4 right-4 bg-success text-success-foreground px-4 py-2 rounded-lg shadow-lg animate-in slide-in">
          <CheckCircle2 className="h-4 w-4 inline mr-2" />
          {saveMessage}
        </div>
      )}
    </div>
  )
}
