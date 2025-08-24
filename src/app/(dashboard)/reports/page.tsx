"use client"
import React from 'react'
import { LoaderCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useGetReports } from '@/app/lib/hooks/use-reports';
import ReportsTable from './_components/ReportsTable';
import { reportsColumn } from './_components/ReportsTableColumns';
import { ReportStatus } from '@/app/types/enums';
import { EmptyState } from '@/app/_components/EmptyState';
import ReportsActions from './_components/ReportActions';
import { start } from 'repl';

const page = () => {
    const searchParams = useSearchParams()
  
const page = Number(searchParams.get("page")) || 1;
const limit = Number(searchParams.get("limit")) || 10;

const isPaidParam = searchParams.get("is_paid");
const is_paid = isPaidParam === "true" ? true : isPaidParam === "false" ? false : undefined;

const start_date = searchParams.get("start_date") || undefined;
const end_date = searchParams.get("end_date") || undefined;

const statusParam = searchParams.get("status");
const status = statusParam
  ? statusParam
      .split(',')
      .filter(s => Object.values(ReportStatus).includes(s as ReportStatus))
      .join(',') // 👈 join back into a comma-separated string
  : undefined;

const { data, isLoading, error, refetch } = useGetReports({
  page,
  limit,
  status,
  is_paid,
  start_date,
  end_date,
});

  const hasFilters = Boolean(is_paid !== undefined|| status || start_date || end_date);


  return (
    <div>
      <ReportsActions/>
      
      {  data && data.data.data.length > 0 ? ( <ReportsTable columns={reportsColumn} data={data?.data?.data}  total={data.data.total}/> ) 
        : (
          <EmptyState
            title="No reports found"
            description={
                hasFilters
                  ? "No reports match the applied filters. Try changing them to see more results."
                  : "There are no reports available yet."
              }
          />
        )
      }
    </div>
  )
}

export default page
