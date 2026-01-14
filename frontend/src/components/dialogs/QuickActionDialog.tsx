import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface QuickActionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  icon: React.ReactNode
  actions: Array<{
    label: string
    description?: string
    onClick: () => void
    variant?: 'default' | 'outline' | 'ghost'
  }>
}

export default function QuickActionDialog({
  open,
  onOpenChange,
  title,
  description,
  icon,
  actions
}: QuickActionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {icon}
            {title}
          </DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 py-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || 'outline'}
              className="w-full justify-start h-auto py-3 px-4"
              onClick={() => {
                action.onClick()
                onOpenChange(false)
              }}
            >
              <div className="flex flex-col items-start gap-1">
                <span className="font-medium">{action.label}</span>
                {action.description && (
                  <span className="text-xs opacity-70 font-normal">
                    {action.description}
                  </span>
                )}
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
