"use client"
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import React from 'react'

function Provider({children}: {children: React.ReactNode}) {
  return (
    <div>
      <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </SessionProvider>
    </div>
  )
}

export default Provider
