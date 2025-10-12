"use client"

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { ArrowLeft, Trash2, LogOut, User } from 'lucide-react'

export default function EditProfilePage() {
  const { data: session, status: _status, update } = useSession()
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [loggingOutAll, setLoggingOutAll] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [appearance, setAppearance] = useState<'light' | 'dark'>('light')
  const [twoFAEnabled, setTwoFAEnabled] = useState<boolean>(false)

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '')
      setEmail(session.user.email || '')
      setAvatar(session.user.image || '')
    }
  }, [session])

  // No-op: appearance and 2FA are UI-only placeholders for now

  // Don't gate the whole page on session loading to avoid UI flicker during updates

  const handleSave = async () => {
    if (!name || !email) {
      toast.error('Name and email are required')
      return
    }
    setSaving(true)
    try {
      // If a new file is chosen, upload first to get a URL
      let avatarUrl = avatar
      if (file) {
        const form = new FormData()
        form.append('file', file)
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: form })
        if (!uploadRes.ok) throw new Error(await uploadRes.text())
        const { url } = await uploadRes.json()
        avatarUrl = url
      }
      const res = await fetch('/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, avatar: avatarUrl }),
      })
      if (!res.ok) throw new Error(await res.text())
      toast.success('Profile updated')
      // 1) Immediately update the client session so UI reflects changes without a reload
      try {
        await update({
          // Only pass the fields that changed; update merges into current session client-side
          user: {
            ...(session?.user ?? {} as any),
            name,
            email,
            image: avatarUrl,
          },
        } as any)
      } catch {}

      // 2) Update local UI state to match the persisted values without re-rendering the page
      setAvatar(avatarUrl)
      setFile(null)
    } catch (err) {
      console.error(err)
      toast.error('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleRemovePhoto = () => {
    setFile(null)
    // Show the default user icon by clearing the avatar
    setAvatar('')
  }

  const handleLogoutAll = async () => {
    try {
      setLoggingOutAll(true)
      const res = await fetch('/api/auth/logout-all', { method: 'POST' })
      if (!res.ok) throw new Error(await res.text())
      await signOut({ callbackUrl: '/' })
    } catch {
      toast.error('Failed to log out of all devices')
    } finally {
      setLoggingOutAll(false)
    }
  }

  const handleDeleteAccount = async () => {
    const ok = window.confirm('Are you sure you want to permanently delete your account? This cannot be undone.')
    if (!ok) return
    try {
      setDeleting(true)
      const res = await fetch('/api/user/delete', { method: 'DELETE' })
      if (!res.ok) throw new Error(await res.text())
      await signOut({ callbackUrl: '/' })
    } catch {
      toast.error('Failed to delete account')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="min-h-[60vh] flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-2xl">
        <div className="rounded-xl border bg-white p-6 shadow">
          <div className="mb-4 flex items-center gap-3">
            <button
              aria-label="Back"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border hover:bg-gray-50"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <h2 className="text-lg font-medium">Edit Profile</h2>
          </div>

          <div className="space-y-5">
            <h3 className="text-base font-semibold">My Profile</h3>
            {/* Avatar + upload */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border bg-gray-100 flex items-center justify-center">
                {avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatar}
                    alt="Profile avatar"
                    className="h-full w-full object-cover"
                    onError={() => setAvatar('')}
                  />
                ) : (
                  <User className="h-8 w-8 text-gray-500" aria-hidden="true" />
                )}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button variant="default" size="sm" onClick={() => fileInputRef.current?.click()} className="rounded-md px-3 py-2 text-sm">
                    + Change Image
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleRemovePhoto} className="rounded-md px-3 py-2 text-sm">
                    Remove Image
                  </Button>
                </div>
                <p className="mt-2 text-xs text-gray-500">We support PNGs, JPEGs and GIFs under 5MB</p>
                <div className="mt-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0]
                      if (!f) return
                      if (f.size > 5 * 1024 * 1024) {
                        toast.error('Please choose an image under 5MB')
                        return
                      }
                      setFile(f)
                      // show instant preview
                      const url = URL.createObjectURL(f)
                      setAvatar(url)
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block space-y-2">
                <div className="text-sm font-medium">Full name</div>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </label>

              <label className="block space-y-2 pt-2">
                <div className="text-sm font-medium">Email address</div>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
            </div>

            {/* Appearance + 2FA in two columns */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="text-sm font-medium">Appearance</div>
                <select
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                  value={appearance}
                  onChange={(e) => setAppearance(e.target.value as 'light' | 'dark')}
                >
                  <option value="light">Light (Default)</option>
                  <option value="dark">Dark</option>
                </select>
                <p className="text-xs text-gray-500">Choose light or dark.</p>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">2-Step Verification</div>
                <button
                  type="button"
                  onClick={() => setTwoFAEnabled((v) => !v)}
                  className={`relative inline-flex h-9 w-full items-center justify-between rounded-md border px-3 text-sm transition-colors ${twoFAEnabled ? 'border-green-600 bg-green-100 text-green-800' : 'border-gray-300 bg-white text-gray-700'}`}
                  aria-pressed={twoFAEnabled}
                >
                  <span>{twoFAEnabled ? 'Enabled' : 'Enable 2-step verification'}</span>
                  <span className={`ml-2 inline-flex h-5 w-10 items-center rounded-full ${twoFAEnabled ? 'bg-green-600' : 'bg-gray-300'}`}>
                    <span className={`h-4 w-4 rounded-full bg-white transition-transform ${twoFAEnabled ? 'translate-x-5' : 'translate-x-1'}`} />
                  </span>
                </button>
                <p className="text-xs text-gray-500">Add an extra layer of security during login.</p>
              </div>
            </div>

            {/* Save button centered and full width */}
            <div className="pt-4">
              <div className="mx-auto max-w-none">
                <Button onClick={handleSave} disabled={saving} className="w-full rounded-md h-11 text-[15px] font-medium">
                  {saving ? 'Saving...' : 'Save changes'}
                </Button>
              </div>
            </div>

            <hr className="my-8 border-t border-gray-200" />

            <div className="mt-2 space-y-3">
              <h3 className="text-base font-semibold">Support Access</h3>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-3">
                <div>
                  <div className="text-sm font-medium">Log out of all devices</div>
                  <div className="text-xs text-gray-500">Log out of all other active sessions on other devices besides this one.</div>
                </div>
                <Button variant="outline" onClick={handleLogoutAll} disabled={loggingOutAll} className="w-full sm:w-auto justify-center rounded-md gap-1 px-3 py-2 text-sm">
                  {loggingOutAll ? (
                    <>
                      <span className="animate-spin inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full" aria-hidden />
                      <span>Processing…</span>
                    </>
                  ) : (
                    <>
                      <LogOut className="h-4 w-4" /> <span>Log out</span>
                    </>
                  )}
                </Button>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between py-1">
                <div>
                  <div className="text-sm font-medium text-red-700">Delete my account</div>
                  <div className="text-xs text-gray-500">Permanently delete the account and remove access from all workspaces.</div>
                </div>
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                  className={`inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${deleting ? 'border-red-300 bg-red-100 text-red-400' : 'border-red-700 bg-red-50 text-red-700 hover:bg-red-100 focus:ring-red-300'}`}
                >
                  {deleting ? (
                    <>
                      <span className="animate-spin inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full" aria-hidden />
                      <span>Deleting…</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" /> <span>Delete Account</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
