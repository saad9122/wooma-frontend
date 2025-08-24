"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGetReportsSummary } from "@/app/lib/hooks/use-reports"

export default function ReportSummary() {
  const { data, isLoading, error, refetch } = useGetReportsSummary()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
        <span className="ml-2 text-sm text-gray-600">Loading summary...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-red-600">
        <p>Failed to load summary.</p>
        <Button variant="outline" size="sm" onClick={() => refetch()} className="mt-2">
          <RefreshCw className="h-4 w-4 mr-1" /> Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Total Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">
            {data?.data?.data?.totalReports ?? 0}
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Paid Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-green-600">
            {data?.data?.data?.totalPaidReports ?? 0}
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">New Users (This Month)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-purple-600">
            {data?.data?.data?.newUsersThisMonth ?? 0}
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Revenue (This Month)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-emerald-600">
            &#xa3;{data?.data?.data?.revenueThisMonth ?? 0}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
