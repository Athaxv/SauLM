"use client"

import { useRef, useState, forwardRef, useImperativeHandle, useEffect } from "react"
import { Send, Loader2, Plus, Mic, FileText, X } from "lucide-react"
import ComposerActionsPopover from "./ComposerActionsPopover"
import ModelSelector from "./ModelSelector"
import { cls } from "./utils"
import { Badge } from "./ui/badge"

const Composer = forwardRef(function Composer({ onSend, busy, selectedModel, modelOptions, onModelChange, onFileUploaded, uploadedFiles }, ref) {
  const [value, setValue] = useState("")
  const [sending, setSending] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [lineCount, setLineCount] = useState(1)
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      const textarea = inputRef.current
      const lineHeight = 20 // Approximate line height in pixels
      const minHeight = 40

      // Reset height to calculate scroll height
      textarea.style.height = "auto"
      const scrollHeight = textarea.scrollHeight
      const calculatedLines = Math.max(1, Math.floor((scrollHeight - 16) / lineHeight)) // 16px for padding

      setLineCount(calculatedLines)

      if (calculatedLines <= 12) {
        // Auto-expand for 1-12 lines
        textarea.style.height = `${Math.max(minHeight, scrollHeight)}px`
        textarea.style.overflowY = "hidden"
      } else {
        // Fixed height with scroll for 12+ lines
        textarea.style.height = `${minHeight + 11 * lineHeight}px` // 12 lines total
        textarea.style.overflowY = "auto"
      }
    }
  }, [value])

  useImperativeHandle(
    ref,
    () => ({
      insertTemplate: (templateContent) => {
        setValue((prev) => {
          const newValue = prev ? `${prev}\n\n${templateContent}` : templateContent
          setTimeout(() => {
            inputRef.current?.focus()
            const length = newValue.length
            inputRef.current?.setSelectionRange(length, length)
          }, 0)
          return newValue
        })
      },
      focus: () => {
        inputRef.current?.focus()
      },
    }),
    [],
  )

  async function handleSend() {
    if (!value.trim() || sending) return
    setSending(true)
    try {
      await onSend?.(value)
      setValue("")
      inputRef.current?.focus()
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false)
    }
  }

  const hasContent = value.length > 0

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <div
        className={cls(
          "mx-auto flex flex-col rounded-2xl border bg-white shadow-sm transition-all duration-200",
          "max-w-3xl border-gray-200 p-3",
        )}
      >
        {/* Uploaded Files Display */}
        {uploadedFiles && uploadedFiles.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {uploadedFiles.map((file) => (
              <Badge 
                key={file.id} 
                variant="secondary" 
                className="flex items-center gap-2 bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
              >
                <FileText className="h-3 w-3" />
                <span className="text-xs">{file.name}</span>
                <button
                  onClick={() => {
                    // Remove file from uploaded files
                    console.log(`Remove file: ${file.name}`)
                  }}
                  className="ml-1 hover:text-green-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={uploadedFiles && uploadedFiles.length > 0 ? "Ask about your uploaded document..." : "How can I help you today?"}
            rows={1}
            className={cls(
              "w-full resize-none bg-transparent text-sm outline-none placeholder:text-gray-400 transition-all duration-200",
              "px-0 py-2 min-h-[40px] text-left text-gray-800",
            )}
            style={{
              height: "auto",
              overflowY: lineCount > 12 ? "auto" : "hidden",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <ComposerActionsPopover onFileUploaded={onFileUploaded}>
              <button
                className="inline-flex shrink-0 items-center justify-center rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                title="Upload Document"
              >
                <Plus className="h-4 w-4" />
              </button>
            </ComposerActionsPopover>
            
            <ModelSelector 
              selectedModel={selectedModel}
              modelOptions={modelOptions}
              onModelChange={onModelChange}
            />
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              className="inline-flex items-center justify-center rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              title="Voice input"
            >
              <Mic className="h-4 w-4" />
            </button>
            <button
              onClick={handleSend}
              disabled={sending || busy || !value.trim()}
              className={cls(
                "inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:from-red-600 hover:to-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500",
                (sending || busy || !value.trim()) && "opacity-50 cursor-not-allowed",
              )}
            >
              {sending || busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-2 max-w-3xl px-1 text-[11px] text-gray-500">
        Press{" "}
        <kbd className="rounded border border-gray-300 bg-gray-50 px-1 text-gray-600">
          Enter
        </kbd>{" "}
        to send ·{" "}
        <kbd className="rounded border border-gray-300 bg-gray-50 px-1 text-gray-600">
          Shift
        </kbd>
        +
        <kbd className="rounded border border-gray-300 bg-gray-50 px-1 text-gray-600">
          Enter
        </kbd>{" "}
        for newline
      </div>
    </div>
  )
})

export default Composer
