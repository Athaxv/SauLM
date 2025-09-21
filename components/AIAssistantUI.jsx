"use client"

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react"
import Sidebar from "./Sidebar"
import ChatPane from "./ChatPane"
import { useSession } from "next-auth/react"

export default function AIAssistantUI() {
  const { data: session, status } = useSession()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(() => {
    try {
      const raw = localStorage.getItem("sidebar-collapsed")
      return raw ? JSON.parse(raw) : { pinned: true, recent: false, folders: true, templates: true }
    } catch {
      return { pinned: true, recent: false, folders: true, templates: true }
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem("sidebar-collapsed", JSON.stringify(collapsed))
    } catch {}
  }, [collapsed])

  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try {
      const saved = localStorage.getItem("sidebar-collapsed-state")
      return saved ? JSON.parse(saved) : false
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem("sidebar-collapsed-state", JSON.stringify(sidebarCollapsed))
    } catch {}
  }, [sidebarCollapsed])

  const [conversations, setConversations] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [templates, setTemplates] = useState([]) 
  const [folders, setFolders] = useState([])
  const [loading, setLoading] = useState(true)

  // Model options
  const modelOptions = [
    {
      id: 'saul-goodman',
      name: 'Saul Goodman',
      description: 'Criminal Defense Specialist',
      tags: ['Criminal Defense', 'Street Smart', 'Resourceful'],
      image: '/SaulGoodman.webp'
    },
    {
      id: 'harvey-specter',
      name: 'Harvey Specter',
      description: 'Corporate Law Expert',
      tags: ['Corporate Law', 'Confident', 'Strategic'],
      image: '/harveyspecter.webp'
    },
    {
      id: 'matt-murdock',
      name: 'Matt Murdock',
      description: 'Civil Rights Advocate',
      tags: ['Civil Rights', 'Ethical', 'Compassionate'],
      image: '/mattmordock.webp'
    }
  ]

  const [selectedModel, setSelectedModel] = useState(modelOptions[0])
  const [uploadedFiles, setUploadedFiles] = useState([])

  const handleFileUploaded = (fileName, fileId) => {
    const newFile = {
      id: fileId || Math.random().toString(36).slice(2),
      name: fileName,
      uploadedAt: new Date().toISOString()
    }
    setUploadedFiles(prev => [...prev, newFile])
    console.log(`File uploaded successfully: ${fileName} with ID: ${fileId}`)
  }

  // Load chat sessions from database
  useEffect(() => {
    // Don't run if session is still loading
    if (status === "loading") return
    
    async function loadChatSessions() {
      if (!session?.user?.email) {
        // For testing purposes, create a mock conversation if no session
        const mockConversation = {
          id: Math.random().toString(36).slice(2),
          title: "Welcome to SauLM",
          updatedAt: new Date().toISOString(),
          messageCount: 0,
          preview: "Say hello to start...",
          pinned: false,
          folder: "Work Projects",
          messages: []
        }
        setConversations([mockConversation])
        setSelectedId(mockConversation.id)
        setLoading(false)
        return
      }

      try {
        const response = await fetch('/api/chat/sessions')
        if (response.ok) {
          const data = await response.json()
          const formattedSessions = data.sessions.map(session => ({
            id: Math.random().toString(36).slice(2), // Generate a frontend ID
            dbId: session.id, // Store the database ID
            title: session.title,
            updatedAt: session.updatedAt,
            messageCount: Array.isArray(session.messages) ? session.messages.length : 0,
            preview: Array.isArray(session.messages) && session.messages.length > 0 
              ? session.messages[session.messages.length - 1]?.content?.slice(0, 80) || "No messages"
              : "No messages",
            pinned: false, // You can add this field to the database schema if needed
            folder: "Work Projects", // You can add this field to the database schema if needed
            messages: Array.isArray(session.messages) ? session.messages : []
          }))
          setConversations(formattedSessions)
          
          // Auto-select the most recent chat if there are conversations
          if (formattedSessions.length > 0) {
            const mostRecent = formattedSessions.sort((a, b) => 
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            )[0]
            setSelectedId(mostRecent.id)
          }
        } else {
          console.error('Failed to load chat sessions')
          setConversations([])
        }
      } catch (error) {
        console.error('Error loading chat sessions:', error)
        setConversations([])
      } finally {
        setLoading(false)
      }
    }

    loadChatSessions()
  }, [session, status])

  // Save chat session to database
  async function saveChatSession(conversation) {
    if (!session?.user?.email) return

    try {
      const response = await fetch('/api/chat/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: conversation.title,
          messages: conversation.messages
        })
      })

      if (response.ok) {
        const data = await response.json()
        // Update the conversation with the database ID
        setConversations((prev) =>
          prev.map((c) => (c.id === conversation.id ? { ...c, dbId: data.session.id } : c))
        )
        return data.session.id
      } else {
        console.error('Failed to save chat session')
      }
    } catch (error) {
      console.error('Error saving chat session:', error)
    }
  }

  // Update chat session in database
  async function updateChatSession(conversation) {
    if (!session?.user?.email || !conversation.dbId) return

    try {
      const response = await fetch(`/api/chat/sessions/${conversation.dbId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId: conversation.dbId,
          title: conversation.title,
          messages: conversation.messages
        })
      })

      if (!response.ok) {
        console.error('Failed to update chat session')
      }
    } catch (error) {
      console.error('Error updating chat session:', error)
    }
  }

  const [query, setQuery] = useState("")
  const searchRef = useRef(null)

  const [isThinking, setIsThinking] = useState(false)
  const [thinkingConvId, setThinkingConvId] = useState(null)

  const createNewChat = useCallback(async () => {
    const id = Math.random().toString(36).slice(2)
    const item = {
      id,
      title: "New Chat",
      updatedAt: new Date().toISOString(),
      messageCount: 0,
      preview: "Say hello to start...",
      pinned: false,
      folder: "Work Projects",
      messages: [], // Ensure messages array is empty for new chats
    }
    setConversations((prev) => [item, ...prev])
    setSelectedId(id)
    setSidebarOpen(false)
    
    // Save to database if user is logged in
    if (session?.user?.email) {
      const dbId = await saveChatSession(item)
      if (dbId) {
        // Update the conversation with the database ID
        setConversations((prev) =>
          prev.map((c) => (c.id === id ? { ...c, dbId } : c))
        )
      }
    }
  }, [session?.user?.email])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "n") {
        e.preventDefault()
        createNewChat()
      }
      if (!e.metaKey && !e.ctrlKey && e.key === "/") {
        const tag = document.activeElement?.tagName?.toLowerCase()
        if (tag !== "input" && tag !== "textarea") {
          e.preventDefault()
          searchRef.current?.focus()
        }
      }
      if (e.key === "Escape" && sidebarOpen) setSidebarOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [sidebarOpen, conversations])

  useEffect(() => {
    // Only create a new chat if there are no conversations and we're not loading
    if (conversations.length === 0 && !loading && status !== "loading") {
      createNewChat()
    }
  }, [conversations.length, loading, status, createNewChat])

  const filtered = useMemo(() => {
    if (!query.trim()) return conversations
    const q = query.toLowerCase()
    return conversations.filter((c) => c.title.toLowerCase().includes(q) || c.preview.toLowerCase().includes(q))
  }, [conversations, query])

  const recent = filtered
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .slice(0, 10)

  function togglePin(id) {
    setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, pinned: !c.pinned } : c)))
  }

  // Function to generate a chat title from user input
  const generateChatTitle = (content) => {
    // Remove extra whitespace and limit to reasonable length
    const cleanContent = content.trim().replace(/\s+/g, ' ')
    
    // If content is very short, use it as is
    if (cleanContent.length <= 30) {
      return cleanContent
    }
    
    // If content is longer, take first 30 characters and add ellipsis
    if (cleanContent.length > 30) {
      return cleanContent.substring(0, 30) + '...'
    }
    
    return cleanContent
  }

  async function sendMessage(convId, content) {
    if (!content.trim()) return
    const now = new Date().toISOString()
    const userMsg = { id: Math.random().toString(36).slice(2), role: "user", content, createdAt: now }

    // Add user message to conversation
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== convId) return c
        const msgs = [...(c.messages || []), userMsg]
        
        // Generate title from first user message if it's still "New Chat"
        const newTitle = c.title === "New Chat" ? generateChatTitle(content) : c.title
        
        const updatedConv = {
          ...c,
          messages: msgs,
          title: newTitle,
          updatedAt: now,
          messageCount: msgs.length,
          preview: content.slice(0, 80),
        }
        
        // Update in database if user is logged in
        if (session?.user?.email) {
          updateChatSession(updatedConv)
        }
        
        return updatedConv
      }),
    )

    setIsThinking(true)
    setThinkingConvId(convId)

    try {
      // Determine which endpoint to use based on uploaded files
      const hasUploadedFiles = uploadedFiles.length > 0
      const endpoint = hasUploadedFiles 
        ? `http://localhost:5000/pdf/${uploadedFiles[0].id}/chat`
        : 'http://localhost:5000/chat'
      
      console.log(`Using endpoint: ${endpoint} (has files: ${hasUploadedFiles})`)
      
      // Make API call to backend
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: content
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // Extract the response text from the API response
      let responseText = "Sorry, I couldn't process your request."
      
      if (data.result && data.result.parts && data.result.parts[0] && data.result.parts[0].text) {
        responseText = data.result.parts[0].text
      } else if (data.result && typeof data.result === 'string') {
        responseText = data.result
      }

      // Add AI response to conversation
      const aiMsg = {
        id: Math.random().toString(36).slice(2),
        role: "assistant",
        content: responseText,
        createdAt: new Date().toISOString(),
      }

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id !== convId) return c
          const msgs = [...(c.messages || []), aiMsg]
          const updatedConv = {
            ...c,
            messages: msgs,
            updatedAt: new Date().toISOString(),
            messageCount: msgs.length,
            preview: responseText.slice(0, 80),
          }
          
          // Update in database if user is logged in
          if (session?.user?.email) {
            updateChatSession(updatedConv)
          }
          
          return updatedConv
        }),
      )
    } catch (error) {
      console.error('Error calling API:', error)
      
      // Add error message to conversation
      const errorMsg = {
        id: Math.random().toString(36).slice(2),
        role: "assistant",
        content: "Sorry, I encountered an error while processing your request. Please try again.",
        createdAt: new Date().toISOString(),
      }

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id !== convId) return c
          const msgs = [...(c.messages || []), errorMsg]
          const updatedConv = {
            ...c,
            messages: msgs,
            updatedAt: new Date().toISOString(),
            messageCount: msgs.length,
            preview: errorMsg.content.slice(0, 80),
          }
          
          // Update in database if user is logged in
          if (session?.user?.email) {
            updateChatSession(updatedConv)
          }
          
          return updatedConv
        }),
      )
    } finally {
      setIsThinking(false)
      setThinkingConvId(null)
    }
  }

  function editMessage(convId, messageId, newContent) {
    const now = new Date().toISOString()
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== convId) return c
        const msgs = (c.messages || []).map((m) =>
          m.id === messageId ? { ...m, content: newContent, editedAt: now } : m,
        )
        return {
          ...c,
          messages: msgs,
          preview: msgs[msgs.length - 1]?.content?.slice(0, 80) || c.preview,
        }
      }),
    )
  }

  function resendMessage(convId, messageId) {
    const conv = conversations.find((c) => c.id === convId)
    const msg = conv?.messages?.find((m) => m.id === messageId)
    if (!msg) return
    sendMessage(convId, msg.content)
  }

  function pauseThinking() {
    setIsThinking(false)
    setThinkingConvId(null)
  }

  const composerRef = useRef(null)

  const selected = conversations.find((c) => c.id === selectedId) || null

  if (loading || status === "loading") {
    return (
      <div className="h-screen w-full bg-white text-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your conversations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-full bg-white text-gray-900">
      <div className="flex h-screen w-full">
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          conversations={conversations}
          recent={recent}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId(id)}
          togglePin={togglePin}
          query={query}
          setQuery={setQuery}
          searchRef={searchRef}
          createNewChat={createNewChat}
          user={session?.user}
        />

        <main className="relative flex min-w-0 flex-1 flex-col">
          {/* Model Selection and Header */}
          <div className="border-b border-gray-200 bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <img 
                    src={selectedModel.image} 
                    alt={selectedModel.name}
                    className="h-10 w-10 rounded-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'block'
                    }}
                  />
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm" style={{display: 'none'}}>
                    {selectedModel.name.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-900">{selectedModel.name}</h1>
                    <p className="text-sm text-gray-600">{selectedModel.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ChatPane
            ref={composerRef}
            conversation={selected}
            onSend={(content) => selected && sendMessage(selected.id, content)}
            onEditMessage={(messageId, newContent) => selected && editMessage(selected.id, messageId, newContent)}
            onResendMessage={(messageId) => selected && resendMessage(selected.id, messageId)}
            isThinking={isThinking && thinkingConvId === selected?.id}
            onPauseThinking={pauseThinking}
            selectedModel={selectedModel}
            user={session?.user}
            modelOptions={modelOptions}
            onModelChange={setSelectedModel}
            onFileUploaded={handleFileUploaded}
            uploadedFiles={uploadedFiles}
          />
        </main>
      </div>
    </div>
  )
}
