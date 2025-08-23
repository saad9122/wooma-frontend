"use client"
import React, { useState } from 'react'
import UserTable from './_components/UserTable';
import { userColumns } from './_components/UserTableColumns';
import { useUsers } from '@/app/lib/hooks/use-users';
import { LoaderCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const page = () => {
    const searchParams = useSearchParams()
  
    
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const id = searchParams.get("id") || undefined;
    const phone_number = searchParams.get("phone_number") || undefined;

    const { data, isLoading, error, refetch } = useUsers({
    page,
    limit,
    id,
    phone_number
  });

  return (
    <div>
      {
        data ? <UserTable columns={userColumns} data={data?.data?.data}  total={data.data.total}/> : <LoaderCircle size={48} strokeWidth={2} color="blue" />
      }
    </div>
  )
}

export default page
