"use client"
import React from 'react'
import { LoaderCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useGetReports } from '@/app/lib/hooks/use-reports';
import ReportsTable from './_components/ReportsTable';
import { reportsColumn } from './_components/ReportsTableColumns';
import { ReportStatus } from '@/app/types/enums';

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

  return (
    <div>
      {
        data ? <ReportsTable columns={reportsColumn} data={data?.data?.data}  total={data.data.total}/> : <LoaderCircle size={48} strokeWidth={2} color="blue" />
      }
    </div>
  )
}

export default page
