"use client"

import { MinimalAuthPage } from '@/components/minimal-auth-page'
import { AuthForm } from '@/components/sign-in-1'
import { signInWithGoogle } from '@/lib/auth-utils'
import { IconBrandGithub, IconBrandGoogle, IconMail } from '@tabler/icons-react'
import React from 'react'


function page() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <MinimalAuthPage/>
    
  </div>
  )
}

export default page
