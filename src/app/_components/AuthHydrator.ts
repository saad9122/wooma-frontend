"use client"
import { useEffect } from "react"
import { useAuthStore } from "../lib/store/auth-store"

export default function AuthHydrator() {
    const hydrate = useAuthStore((s) => s.hydrateFromLocalStorage)
        useEffect(() => {
        hydrate()
        }, [hydrate])
        return null
}