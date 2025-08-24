"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/reports")
    }, 5000)

    return () => clearTimeout(timer) // cleanup on unmount
  }, [router])

  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted/10 px-6">
      <Card className="max-w-md w-full shadow-lg rounded-2xl border-dashed bg-background">
        <CardContent className="flex flex-col items-center text-center gap-6 py-12">
          <AlertTriangle className="h-14 w-14 text-red-500" />

          <div>
            <h1 className="text-3xl font-bold text-foreground">404 - Page Not Found</h1>
            <p className="mt-2 text-muted-foreground">
              Oops! The page you’re looking for doesn’t exist or has been moved.
              <br />
              Redirecting you to <span className="font-semibold">Reports</span> in 5 seconds...
            </p>
          </div>

          <Button asChild size="lg" className="mt-4">
            <Link href="/reports">Go to Reports Now</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
