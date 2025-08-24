"use client"


import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"


export type AuthUser = { id: string; phone?: string; name?: string } | null


type AuthState = {
token: string | null
user: AuthUser
isAuthenticated: boolean
login: (token: string, user?: AuthUser) => void
logout: () => void
hydrateFromLocalStorage: () => void
}


export const useAuthStore = create<AuthState>()(
persist(
    (set) => ({
    token: null,
    user: null,
    isAuthenticated: false,

    login: (token, user = null) => {
    localStorage.setItem("access_token", token)
    set({ token, user, isAuthenticated: true })
    },

    logout: () => {
    localStorage.removeItem("access_token")
    set({ token: null, user: null, isAuthenticated: false })
    },


    hydrateFromLocalStorage: () => {
    const token = localStorage.getItem("access_token")
    set({ token, isAuthenticated: !!token })
    },
    }),
    {
    name: "auth-storage",
    storage: createJSONStorage(() => localStorage),
    partialize: (s) => ({ token: s.token, user: s.user, isAuthenticated: s.isAuthenticated }),
    }
  )
)