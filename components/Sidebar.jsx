"use client"
import { motion, AnimatePresence } from "framer-motion"
import {
  PanelLeftClose,
  PanelLeftOpen,
  SearchIcon,
  Plus,
  Clock,
  Settings,
  Asterisk,
  User,
  LogOut,
  Shield,
  CreditCard,
  HelpCircle,
} from "lucide-react"
import SidebarSection from "./SidebarSection"
import ConversationRow from "./ConversationRow"
import SearchModal from "./SearchModal"
import SettingsPopover from "./SettingsPopover"
import { cls } from "./utils"
import { useState } from "react"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Sidebar({
  open,
  onClose,
  collapsed,
  setCollapsed,
  conversations,
  recent,
  selectedId,
  onSelect,
  togglePin,
  query,
  setQuery,
  searchRef,
  createNewChat,
  sidebarCollapsed = false,
  setSidebarCollapsed = () => {},
  user = null, // Add user prop
}) {
  const [showSearchModal, setShowSearchModal] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false })
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (sidebarCollapsed) {
    return (
      <motion.aside
        initial={{ width: 320 }}
        animate={{ width: 64 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="z-50 flex h-full shrink-0 flex-col border-r border-gray-200 bg-white"
      >
        <div className="flex items-center justify-center border-b border-gray-200 px-3 py-3">
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="rounded-xl p-2 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 transition-colors"
            aria-label="Open sidebar"
            title="Open sidebar"
          >
            <PanelLeftOpen className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 pt-4">
          <button
            onClick={createNewChat}
            className="rounded-xl p-2 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 transition-colors"
            title="New Chat"
          >
            <Plus className="h-5 w-5 text-gray-600" />
          </button>

          <button
            onClick={() => setShowSearchModal(true)}
            className="rounded-xl p-2 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 transition-colors"
            title="Search"
          >
            <SearchIcon className="h-5 w-5 text-gray-600" />
          </button>

          <div className="mt-auto mb-4">
            <SettingsPopover>
              <button
                className="rounded-xl p-2 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 transition-colors"
                title="Settings"
              >
                <Settings className="h-5 w-5 text-gray-600" />
              </button>
            </SettingsPopover>
          </div>
        </div>
      </motion.aside>
    )
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(open || typeof window !== "undefined") && (
          <motion.aside
            key="sidebar"
            initial={{ x: -340 }}
            animate={{ x: open ? 0 : 0 }}
            exit={{ x: -340 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className={cls(
              "z-50 flex h-full w-80 shrink-0 flex-col border-r border-gray-200 bg-white",
              "fixed inset-y-0 left-0 md:static md:translate-x-0",
            )}
          >
            <div className="flex items-center gap-2 border-b border-gray-200 px-3 py-3">
              <div className="flex items-center gap-2">
                <div className="text-sm font-semibold tracking-tight font-brockmann bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                  SauLM
                </div>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <button
                  onClick={() => setSidebarCollapsed(true)}
                  className="hidden md:block rounded-xl p-2 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 transition-colors"
                  aria-label="Close sidebar"
                  title="Close sidebar"
                >
                  <PanelLeftClose className="h-5 w-5 text-gray-600" />
                </button>

                <button
                  onClick={onClose}
                  className="md:hidden rounded-xl p-2 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 transition-colors"
                  aria-label="Close sidebar"
                >
                  <PanelLeftClose className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="px-3 pt-3">
              <label htmlFor="search" className="sr-only">
                Search conversations
              </label>
              <div className="relative">
                <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="search"
                  ref={searchRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search…"
                  onClick={() => setShowSearchModal(true)}
                  onFocus={() => setShowSearchModal(true)}
                  className="w-full rounded-full border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm outline-none ring-0 placeholder:text-gray-400 text-gray-900 focus:border-red-500 focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div className="px-3 pt-3">
              <button
                onClick={createNewChat}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:from-red-600 hover:to-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                title="New Chat (⌘N)"
              >
                <Plus className="h-4 w-4" /> Start New Chat
              </button>
            </div>

            <nav className="mt-4 flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-2 pb-4">
              <SidebarSection
                icon={<Clock className="h-4 w-4" />}
                title="RECENT CHATS"
                collapsed={false}
                onToggle={() => {}}
              >
                {recent.length === 0 ? (
                  <div className="select-none rounded-lg border border-dashed border-gray-200 px-3 py-3 text-center text-xs text-gray-500">
                    No conversations yet. Start a new one!
                  </div>
                ) : (
                  recent.map((c) => (
                    <ConversationRow
                      key={c.id}
                      data={c}
                      active={c.id === selectedId}
                      onSelect={() => onSelect(c.id)}
                      onTogglePin={() => togglePin(c.id)}
                      showMeta
                    />
                  ))
                )}
              </SidebarSection>
            </nav>

            <div className="mt-auto border-t border-gray-200 px-3 py-3">
              <div className="flex items-center gap-2">
                <SettingsPopover>
                  <button className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 text-gray-700">
                    <Settings className="h-4 w-4" /> Settings
                  </button>
                </SettingsPopover>
              </div>
              <div className="mt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-3 rounded-xl p-2 h-auto hover:bg-gray-100"
                    >
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-red-500 to-pink-500 text-xs font-bold text-white">
                        {user?.name ? user.name.charAt(0).toUpperCase() : user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div className="min-w-0 text-left">
                        <div className="truncate text-sm font-medium text-gray-900">
                          {user?.name || user?.email || 'User'}
                        </div>
                        <div className="truncate text-xs text-gray-500">
                          {user?.email ? 'Pro workspace' : 'Guest'}
                        </div>
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Profile Settings
                      </DialogTitle>
                      <DialogDescription>
                        Manage your account settings and preferences
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      {/* User Info */}
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                        <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-red-500 to-pink-500 text-sm font-bold text-white">
                          {user?.name ? user.name.charAt(0).toUpperCase() : user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {user?.name || user?.email || 'User'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user?.email || 'No email'}
                          </div>
                          <div className="text-xs text-gray-400">
                            {user?.email ? 'Pro workspace' : 'Guest'}
                          </div>
                        </div>
                      </div>

                      {/* Profile Options */}
                      <div className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                          <User className="h-4 w-4" />
                          Edit Profile
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-2">
                          <Shield className="h-4 w-4" />
                          Privacy & Security
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-2">
                          <CreditCard className="h-4 w-4" />
                          Billing & Subscription
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-2">
                          <HelpCircle className="h-4 w-4" />
                          Help & Support
                        </Button>
                      </div>

                      {/* Logout Button */}
                      <div className="pt-4 border-t">
                        <Button 
                          variant="destructive" 
                          className="w-full gap-2"
                          onClick={handleLogout}
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        conversations={conversations}
        selectedId={selectedId}
        onSelect={onSelect}
        togglePin={togglePin}
        createNewChat={createNewChat}
      />
    </>
  )
}
