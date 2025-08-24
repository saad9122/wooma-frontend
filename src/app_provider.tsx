'use client'

import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import { PropsWithChildren } from 'react'

interface ProvidersProps extends PropsWithChildren {
  session?: Session | null
}

export function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}