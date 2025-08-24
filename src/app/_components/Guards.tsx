"use client"


import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useAuthStore } from "../lib/store/auth-store"


export function RequireAuth({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
    const hydrate = useAuthStore((s) => s.hydrateFromLocalStorage)
    const [ready, setReady] = useState(false)


    useEffect(() => {
    hydrate()
    setReady(true)
    }, [hydrate])


    useEffect(() => {
    if (!ready) return
    if (!isAuthenticated) {
    router.replace(`/auth/login?next=${encodeURIComponent(pathname || "/")}`)
    }
    }, [ready, isAuthenticated, router, pathname])


    if (!ready || !isAuthenticated) return null // prevent UI flash
    return <>{children}</>
}


export function OnlyGuests({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
    const hydrate = useAuthStore((s) => s.hydrateFromLocalStorage)
    const [ready, setReady] = useState(false)


    useEffect(() => {
    hydrate()
    setReady(true)
    }, [hydrate])


    useEffect(() => {
    if (!ready) return
    if (isAuthenticated) {
    router.replace("/users")
    }
    }, [ready, isAuthenticated, router])


    if (!ready || isAuthenticated) return null
    return <>{children}</>
}