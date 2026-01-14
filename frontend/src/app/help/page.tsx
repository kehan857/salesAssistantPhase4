import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Search,
  BookOpen,
  Video,
  MessageCircle,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Users,
  Zap,
  Target,
} from 'lucide-react'

export default function Help() {
   = useState('all')
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', name: '全部', icon: BookOpen },
    { id: 'getting-started', name: '快速入门', icon: Zap },
    { id: 'features', name: '功能说明', icon: Lightbulb },
    { id: 'tutorials', name: '视频教程', icon: Video },
    { id: 'faq', name: '常见问题', icon: MessageCircle },
  ]

  const quickStartItems = [
    {
      id: '1',
      title: '第一次使用？从这开始',
      description: '了解系统的基本功能和操作流程',
      duration: '5分钟',
      icon: Zap,
      color: 'text-primary',
    },
    {
      id: '2',
      title: '创建您的第一个对话',
      description: '学习如何与客户进行对话管理',
      duration: '3分钟',
      icon: MessageCircle,
      color: 'text-green-500',
    },
    {
      id: '3',
      title: '添加和管理线索',
      description: '掌握线索的创建、评分和培育',
      duration: '4分钟',
      icon: Users,
      color: 'text-blue-500',
    },
    {
      id: '4',
      title: '使用知识库',
      description: '利用AI知识库提升销售效率',
      duration: '6分钟',
      icon: BookOpen,
      color: 'text-purple-500',
    },
  ]

  const featureGuides = [
    {
      id: '1',
      category: '对话管理',
      title: 'AI实时建议',
      description: '了解如何使用AI实时建议优化您的对话策略',
      items: ['查看AI建议', '采用建议内容', '自定义AI配置'],
    },
    {
      id: '2',
      category: '线索管理',
      title: 'BANT分析',
      description: '深入学习BANT分析模型，精准评估客户价值',
      items: ['预算分析', '权限识别', '需求挖掘', '时间判断'],
    },
    {
      id: '3',
      category: '线索管理',
      title: '7天智能培育',
      description: '使用AI生成的7天培育计划自动跟进线索',
      items: ['计划生成', '任务执行', '进度跟踪'],
    },
    {
      id: '4',
      category: '知识库',
      title: '知识自进化',
      description: '知识库如何自动学习和更新',
      items: ['自动提取', '人工添加', '有效性评估'],
    },
    {
      id: '5',
      category: '数据分析',
      title: '销售洞察',
      description: '通过数据分析提升销售业绩',
      items: ['转化漏斗', '团队排名', '趋势分析'],
    },
    {
      id: '6',
      category: 'AI功能',
      title: '情感分析',
      description: '实时分析客户情绪，优化沟通策略',
      items: ['情绪识别', '趋势变化', '应对建议'],
    },
  ]

  const faqs = [
    {
      id: '1',
      question: '如何添加新的对话？',
      answer: '点击对话管理页面的"新建对话"按钮，填写客户信息和初始对话内容即可创建新对话。您也可以在主控台的快速操作中直接创建。',
      category: '对话管理',
    },
    {
      id: '2',
      question: 'AI建议的准确率如何？',
      answer: 'AI建议基于数百万条真实对话数据训练而成，准确率在85%以上。系统会持续学习优化，建议会越来越精准。您也可以通过点赞/点踩来帮助AI学习。',
      category: 'AI功能',
    },
    {
      id: '3',
      question: '如何培育新线索？',
      answer: '选择一个线索后，点击"查看培育计划"即可查看AI生成的7天培育计划。点击"应用此计划"后，系统会自动创建培育任务，您只需要按照计划执行即可。',
      category: '线索管理',
    },
    {
      id: '4',
      question: '知识库的内容从哪里来？',
      answer: '知识库有两个来源：1）系统预置的经过验证的最佳实践；2）从您的实际对话中AI自动提取的成功案例。您也可以手动添加知识条目。',
      category: '知识库',
    },
    {
      id: '5',
      question: '如何导出我的数据？',
      answer: '在各个模块页面点击"导出"按钮，选择导出格式（Excel/PDF/CSV）、时间范围和需要包含的字段，点击"导出"即可生成报告。',
      category: '数据管理',
    },
    {
      id: '6',
      question: 'BANT分析是如何工作的？',
      answer: 'AI会自动分析您的对话内容，识别出Budget（预算）、Authority（权限）、Need（需求）、Timeline（时间）四个维度的关键信息，并给出置信度评分。',
      category: 'AI功能',
    },
    {
      id: '7',
      question: '我可以自定义AI的回复风格吗？',
      answer: '可以的。在"系统设置 > AI配置"中，您可以选择不同的回复风格（专业商务、友好亲切、简洁高效、详细全面），AI将按照您选择的风格生成建议。',
      category: '系统设置',
    },
    {
      id: '8',
      question: '如何联系技术支持？',
      answer: '您可以通过以下方式联系我们：1）点击页面右下角的帮助按钮；2）发送邮件至support@example.com；3）拨打客服电话400-123-4567（工作日9:00-18:00）。',
      category: '其他',
    },
  ]

  const videoTutorials = [
    {
      id: '1',
      title: '产品完整功能介绍',
      duration: '12:35',
      views: 1234,
      thumbnail: '📊',
    },
    {
      id: '2',
      title: 'AI功能深度解析',
      duration: '15:20',
      views: 892,
      thumbnail: '🤖',
    },
    {
      id: '3',
      title: '提高转化率的5个技巧',
      duration: '8:45',
      views: 2341,
      thumbnail: '📈',
    },
    {
      id: '4',
      title: '知识库最佳实践',
      duration: '10:15',
      views: 678,
      thumbnail: '📚',
    },
  ]

  const contactOptions = [
    {
      id: '1',
      icon: MessageCircle,
      title: '在线客服',
      description: '工作日 9:00-18:00',
      action: '开始对话',
      available: true,
    },
    {
      id: '2',
      icon: Mail,
      title: '邮件支持',
      description: 'support@example.com',
      action: '发送邮件',
      available: true,
    },
    {
      id: '3',
      icon: Phone,
      title: '电话支持',
      description: '400-123-4567',
      action: '拨打电话',
      available: true,
    },
    {
      id: '4',
      icon: Clock,
      title: '工单系统',
      description: '响应时间：24小时内',
      action: '提交工单',
      available: true,
    },
  ]

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id)
  }

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">帮助中心</h2>
        <p className="text-muted-foreground">
          快速找到您需要的答案和资源
        </p>
      </div>

      {/* 搜索框 */}
      <Card className="glass-card">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="搜索问题、功能或关键词..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base"
            />
          </div>
        </CardContent>
      </Card>

      {/* 快速入门 */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          快速入门
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickStartItems.map((item) => (
            <Card key={item.id} className="glass-card hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className={`h-10 w-10 rounded-lg bg-accent flex items-center justify-center mb-2`}>
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <CardTitle className="text-base">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {item.duration}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 功能说明 */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          功能说明
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {featureGuides.map((guide) => (
            <Card key={guide.id} className="glass-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Badge variant="outline" className="mb-2">{guide.category}</Badge>
                    <CardTitle className="text-base mb-2">{guide.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{guide.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {guide.items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 视频教程 */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Video className="h-5 w-5 text-red-500" />
          视频教程
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {videoTutorials.map((video) => (
            <Card key={video.id} className="glass-card hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-6xl">
                {video.thumbnail}
              </div>
              <CardContent className="p-4">
                <h4 className="font-medium text-sm mb-2 line-clamp-2">{video.title}</h4>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{video.duration}</span>
                  <span>{video.views} 次观看</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 常见问题 */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-blue-500" />
          常见问题
        </h3>
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="space-y-2">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-accent transition-colors"
                  >
                    <div className="flex-1">
                      <Badge variant="secondary" className="mb-2 text-xs">{faq.category}</Badge>
                      <div className="font-medium">{faq.question}</div>
                    </div>
                    {expandedFaq === faq.id ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0 ml-2" />
                    )}
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="px-4 pb-4 pt-0">
                      <p className="text-sm text-muted-foreground pl-4 border-l-2 border-primary">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 联系支持 */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-green-500" />
          联系支持
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {contactOptions.map((option) => (
            <Card key={option.id} className="glass-card hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <div className="h-12 w-12 mx-auto rounded-full bg-accent flex items-center justify-center mb-2">
                  <option.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-base">{option.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">{option.description}</p>
                {option.available && (
                  <Badge variant="success" className="text-xs">在线</Badge>
                )}
                <Button variant="outline" className="w-full">
                  {option.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 反馈建议 */}
      <Card className="glass-card bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardHeader>
          <CardTitle>帮助我们改进</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4">
            <div className="flex-1 space-y-2">
              <p className="text-sm text-muted-foreground">
                您的意见对我们非常重要。如果您有任何建议、功能需求或发现问题，欢迎随时反馈。
              </p>
              <div className="flex gap-2">
                <Button>提交反馈</Button>
                <Button variant="outline">参与调研</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
