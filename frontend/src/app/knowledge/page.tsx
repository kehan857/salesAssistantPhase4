import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { mockKnowledgeItems } from '@/lib/mock-data'
import { Search, Plus, TrendingUp, ThumbsUp, Clock, Download } from 'lucide-react'
import AddKnowledgeDialog from '@/components/dialogs/AddKnowledgeDialog'
import KnowledgeDetailDialog from '@/components/dialogs/KnowledgeDetailDialog'
import ExportDialog from '@/components/dialogs/ExportDialog'

export default function Knowledge() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [exportDialogOpen, setExportDialogOpen] = useState(false)
  const [selectedKnowledge, setSelectedKnowledge] = useState<any>(null)
  const [knowledgeItems, setKnowledgeItems] = useState(mockKnowledgeItems)
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set())

  const categories = ['all', '异议处理', '销售技巧', 'BANT技巧']

  const filteredItems = knowledgeItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddKnowledge = (newItem: any) => {
    const item = {
      ...newItem,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      usageCount: 0,
      helpfulCount: 0
    }
    setKnowledgeItems(prev => [item, ...prev])
  }

  const handleLike = (itemId: string) => {
    setLikedItems(prev => {
      const newLiked = new Set(prev)
      if (newLiked.has(itemId)) {
        newLiked.delete(itemId)
        // 减少点赞数
        setKnowledgeItems(prev => prev.map(item =>
          item.id === itemId
            ? { ...item, helpfulCount: Math.max(0, item.helpfulCount - 1) }
            : item
        ))
      } else {
        newLiked.add(itemId)
        // 增加点赞数
        setKnowledgeItems(prev => prev.map(item =>
          item.id === itemId
            ? { ...item, helpfulCount: item.helpfulCount + 1 }
            : item
        ))
      }
      return newLiked
    })
  }

  const handleViewDetail = (item: any) => {
    setSelectedKnowledge(item)
    setDetailDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">知识库</h2>
          <p className="text-muted-foreground">
            知识库自进化系统，AI自动学习并更新
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setExportDialogOpen(true)}>
            <Download className="h-4 w-4 mr-2" />
            导出
          </Button>
          <Button onClick={() => setAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            添加知识
          </Button>
        </div>
      </div>

      {/* 统计 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">总知识条目</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{knowledgeItems.length}</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">本月新增</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">使用次数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{knowledgeItems.reduce((sum, item) => sum + item.usageCount, 0)}</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">有帮助</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{knowledgeItems.reduce((sum, item) => sum + item.helpfulCount, 0)}</div>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和筛选 */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索知识..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat === 'all' ? '全部' : cat}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {filteredItems.map((item) => (
              <Card key={item.id} className="glass-card hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleViewDetail(item)}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base mb-2">{item.question}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{item.category}</Badge>
                        {item.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-3">{item.answer}</p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      使用 {item.usageCount}次
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      {item.helpfulCount}人觉得有帮助
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      新鲜度 {item.freshnessScore}
                    </div>
                  </div>

                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => handleViewDetail(item)}>
                      查看详情
                    </Button>
                    <Button
                      size="sm"
                      variant={likedItems.has(item.id) ? "default" : "outline"}
                      onClick={() => handleLike(item.id)}
                    >
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      {likedItems.has(item.id) ? '已赞' : '点赞'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 弹窗 */}
      <AddKnowledgeDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSave={handleAddKnowledge}
      />
      <KnowledgeDetailDialog
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        knowledge={selectedKnowledge}
      />
      <ExportDialog
        open={exportDialogOpen}
        onOpenChange={setExportDialogOpen}
        title="导出知识库数据"
        type="knowledge"
      />
    </div>
  )
}
