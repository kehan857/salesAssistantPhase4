import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send, Smile, Paperclip, Mic } from 'lucide-react'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
  value?: string
  onChange?: (value: string) => void
}

export default function ChatInput({ onSend, disabled = false, value: externalValue, onChange: externalOnChange }: ChatInputProps) {
  const [internalInput, setInternalInput] = useState('')

  // 使用受控或非受控模式
  const input = externalValue !== undefined ? externalValue : internalInput
  const setInput = externalOnChange || setInternalInput

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim())
      // 如果是受控模式，通知父组件清空；否则清空内部状态
      if (externalOnChange) {
        externalOnChange('')
      } else {
        setInternalInput('')
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t border-border bg-background p-4">
      <div className="flex items-end gap-2">
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            title="附件"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            title="表情"
          >
            <Smile className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入消息... (Enter发送，Shift+Enter换行)"
            className="min-h-[60px] max-h-[200px] resize-none pr-12"
            disabled={disabled}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || disabled}
            size="icon"
            className="absolute right-2 bottom-2 h-8 w-8"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          title="语音输入"
        >
          <Mic className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
