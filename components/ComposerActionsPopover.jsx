"use client"
import { useState, useRef } from "react"
import { Paperclip, Bot, Search, Palette, BookOpen, MoreHorizontal, Globe, ChevronRight, Upload, FileText, CheckCircle } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"

export default function ComposerActionsPopover({ children, onFileUploaded }) {
  const [open, setOpen] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploadedFileName, setUploadedFileName] = useState("")
  const fileInputRef = useRef(null)

  const mainActions = [
    {
      icon: Paperclip,
      label: "Upload Document",
      action: () => handleFileUpload(),
    },
    {
      icon: Bot,
      label: "Agent mode",
      badge: "NEW",
      action: () => console.log("Agent mode"),
    },
    {
      icon: Search,
      label: "Deep research",
      action: () => console.log("Deep research"),
    },
    {
      icon: Palette,
      label: "Create image",
      action: () => console.log("Create image"),
    },
    {
      icon: BookOpen,
      label: "Study and learn",
      action: () => console.log("Study and learn"),
    },
  ]

  const moreActions = [
    {
      icon: Globe,
      label: "Web search",
      action: () => console.log("Web search"),
    },
    {
      icon: Palette,
      label: "Canvas",
      action: () => console.log("Canvas"),
    },
    {
      icon: () => (
        <div className="h-4 w-4 rounded bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
          <div className="h-2 w-2 bg-white rounded-full" />
        </div>
      ),
      label: "Connect Google Drive",
      action: () => console.log("Connect Google Drive"),
    },
    {
      icon: () => (
        <div className="h-4 w-4 rounded bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
          <div className="h-2 w-2 bg-white rounded-full" />
        </div>
      ),
      label: "Connect OneDrive",
      action: () => console.log("Connect OneDrive"),
    },
    {
      icon: () => (
        <div className="h-4 w-4 rounded bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center">
          <div className="h-2 w-2 bg-white rounded-full" />
        </div>
      ),
      label: "Connect Sharepoint",
      action: () => console.log("Connect Sharepoint"),
    },
  ]

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Check if file is PDF or DOC/DOCX
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    
    if (!allowedTypes.includes(file.type)) {
      alert('Please select a PDF or DOC/DOCX file')
      return
    }

    setUploading(true)
    setUploadSuccess(false)
    setUploadedFileName("")

    try {
      const formData = new FormData()
      formData.append('pdf', file) // Keep the same field name for backend compatibility

      const response = await fetch('http://localhost:5000/pdf/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        setUploadSuccess(true)
        setUploadedFileName(file.name)
        
        // Notify parent component about successful upload
        if (onFileUploaded) {
          // Generate a file ID based on filename and timestamp
          const fileId = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9]/g, '-')}`
          onFileUploaded(file.name, fileId)
        }
        
        // Auto-close popover after 2 seconds
        setTimeout(() => {
          setOpen(false)
          setUploadSuccess(false)
          setUploadedFileName("")
        }, 2000)
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload file. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleAction = (action) => {
    action()
    setOpen(false)
    setShowMore(false)
  }

  const handleMoreClick = () => {
    setShowMore(true)
  }

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen)
    if (!newOpen) {
      setShowMore(false)
    }
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent className="w-96 p-0" align="start" side="top">
          {uploading ? (
            // Upload progress view
            <div className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Upload className="h-6 w-6 animate-pulse text-blue-500" />
              </div>
              <p className="text-sm text-gray-600">Uploading Document...</p>
              <p className="text-xs text-gray-500 mt-1">Please wait while we process your document</p>
            </div>
          ) : uploadSuccess ? (
            // Upload success view
            <div className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <p className="text-sm text-gray-600">Upload Successful!</p>
              <p className="text-xs text-gray-500 mt-1 truncate">{uploadedFileName}</p>
              <p className="text-xs text-green-600 mt-2">You can now query this document</p>
            </div>
          ) : !showMore ? (
          // Main actions view
          <div className="p-3">
            <div className="space-y-1">
              {mainActions.map((action, index) => {
                const IconComponent = action.icon
                return (
                  <button
                    key={index}
                    onClick={() => handleAction(action.action)}
                    className="flex items-center gap-3 w-full p-2 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{action.label}</span>
                    {action.badge && (
                      <span className="ml-auto px-2 py-0.5 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full">
                        {action.badge}
                      </span>
                    )}
                  </button>
                )
              })}
              <button
                onClick={handleMoreClick}
                className="flex items-center gap-3 w-full p-2 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span>More</span>
                <ChevronRight className="h-4 w-4 ml-auto" />
              </button>
            </div>
          </div>
        ) : (
          // More options view with two columns
          <div className="flex">
            <div className="flex-1 p-3 border-r border-zinc-200 dark:border-zinc-800">
              <div className="space-y-1">
                {mainActions.map((action, index) => {
                  const IconComponent = action.icon
                  return (
                    <button
                      key={index}
                      onClick={() => handleAction(action.action)}
                      className="flex items-center gap-3 w-full p-2 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
                    >
                      <IconComponent className="h-4 w-4" />
                      <span>{action.label}</span>
                      {action.badge && (
                        <span className="ml-auto px-2 py-0.5 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full">
                          {action.badge}
                        </span>
                      )}
                    </button>
                  )
                })}
                <button
                  onClick={handleMoreClick}
                  className="flex items-center gap-3 w-full p-2 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700"
                >
                  <MoreHorizontal className="h-4 w-4" />
                  <span>More</span>
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </button>
              </div>
            </div>
            <div className="flex-1 p-3">
              <div className="space-y-1">
                {moreActions.map((action, index) => {
                  const IconComponent = action.icon
                  return (
                    <button
                      key={index}
                      onClick={() => handleAction(action.action)}
                      className="flex items-center gap-3 w-full p-2 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
                    >
                      {typeof IconComponent === "function" ? <IconComponent /> : <IconComponent className="h-4 w-4" />}
                      <span>{action.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
    </>
  )
}
