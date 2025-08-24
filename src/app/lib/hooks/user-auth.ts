"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { authApi } from "../api/endpoints/authEndpoints"

export const useAuthLogout = () => {
  const router = useRouter()

  return useMutation({
    mutationKey: ["auth", "logout"],
    mutationFn: async () => authApi.logout(),
    onSuccess: () => {
      router.push("/auth/login") // redirect after successful logout
    },
    onError: (error) => {
      console.error("Logout failed:", error)
      router.push("/auth/login") // still redirect to login
    },
  })
}
