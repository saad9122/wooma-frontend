"use client"
import React, { useState } from 'react'
import UserTable from './_components/UserTable';
import { userColumns } from './_components/UserTableColumns';
import { useUsers } from '@/app/lib/hooks/use-users';
import { LoaderCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { EmptyState } from '@/app/_components/EmptyState';
import { UserSearch } from './_components/UserSearch';

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

  const hasFilters = Boolean(id || phone_number);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <LoaderCircle size={48} strokeWidth={2} className="animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div>
      <UserSearch/>
      {data && data.data.data.length > 0 ? (
        <UserTable
          columns={userColumns}
          data={data.data.data}
          total={data.data.total}
        />
      ) : (
        <EmptyState
          title="No users found"
          description={
            hasFilters
              ? "No users match the applied filters. Try changing them to see more results."
              : "There are no users available yet."
          }
        />
      )}
    </div>
  )
}

export default page
