'use client';
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import moment from "moment"
import { IUser } from "@/app/types/interfaces";

export const userColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        User ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const data = row.getValue<string>("id")
      return <div className="truncate max-w-[180px]">{data}</div>
    },
    size: 20,
  },
  {
    accessorKey: "phone_number",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Phone
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const phone = row.getValue<string>("phone_number")
      return <div>{phone}</div>
    },
    size: 20,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Sign Up Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue<string>("created_at")
      return <div>{moment(createdAt).format("DD MMM YYYY, hh:mm A")}</div>
    },
    size: 20,
  },
  {
    accessorKey: "is_active",
    header: "Active",
    cell: ({ row }) => {
      const active = row.getValue<boolean>("is_active")
      return (
        <div className={active ? "text-green-600" : "text-red-600"}>
          {active ? "Yes" : "No"}
        </div>
      )
    },
    size: 10,
  },
  {
    accessorKey: "reports_created",
    header: "Reports Created",
    cell: ({ row }) => {
      const reports = row.getValue<number>("reports_created")
      return <div>{reports}</div>
    },
    size: 10,
  },
  {
    accessorKey: "paid_reports",
    header: "Reports Paid",
    cell: ({ row }) => {
      const paid = row.getValue<number>("paid_reports")
      return <div>{paid}</div>
    },
    size: 10,
  },
]

