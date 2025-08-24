"use client"

import { useAuthLogout } from "@/app/lib/hooks/user-auth"
import { LogOut } from "lucide-react"

export default function LogoutButton({
  sidebarCollapsed,
  isMobile,
}: {
  sidebarCollapsed: boolean
  isMobile: boolean
}) {
  const { mutate: logout, isPending } = useAuthLogout()

  return (
    <button
      onClick={() => logout()}
      disabled={isPending}
      className={`w-full group flex items-center px-3 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-all duration-200 ${
        sidebarCollapsed && !isMobile ? "justify-center px-2" : "justify-start"
      } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <LogOut
        className={`flex-shrink-0 text-red-500 ${
          sidebarCollapsed && !isMobile ? "w-6 h-6" : "w-5 h-5 mr-3"
        }`}
      />
      {(!sidebarCollapsed || isMobile) && (
        <span className="truncate">{isPending ? "Logging out..." : "Logout"}</span>
      )}
    </button>
  )
}
