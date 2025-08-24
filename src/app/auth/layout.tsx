"use client"

import { OnlyGuests } from "../_components/Guards"


export default function AuthLayout({ children }: { children: React.ReactNode }) {
return <OnlyGuests>{children}</OnlyGuests>
}