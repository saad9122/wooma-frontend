'use client';
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import moment from "moment"

interface IReport {
  id: string
  created_at: string
  status: string
  payment_reference?: string | null
  user: {
    id: string
    phone_number: string
  }
  pdf_url?: string
}

export const reportsColumn: ColumnDef<IReport>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Report ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const reportId = row.getValue<string>("id")
      return <div className="truncate max-w-[180px]">{reportId}</div>
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
        Created At
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
    accessorFn: (row) => row.user?.id,
    id: "userId",
    header: "User ID",
    cell: ({ row }) => {
      const userId = row.original.user?.id
      return <div className="truncate max-w-[180px]">{userId}</div>
    },
    size: 20,
  },
  {
    accessorFn: (row) => row.user?.phone_number,
    id: "phone",
    header: "User Phone",
    cell: ({ row }) => {
      const phone = row.original.user?.phone_number
      return <div>{phone}</div>
    },
    size: 20,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<string>("status")
      return <div className="uppercase">{status}</div>
    },
    size: 15,
  },
  {
    id: "payment_status",
    header: "Payment Status",
    cell: ({ row }) => {
      const paymentRef = row.original.payment_reference
      const status = typeof paymentRef === "string" && paymentRef.trim() !== "" ? "Paid" : "Unpaid"
      return (
        <div className={status === "Paid" ? "text-green-600" : "text-red-600"}>
          {status}
        </div>
      )
    },
    size: 15,
  },
  {
    accessorKey: "pdf_url",
    header: "PDF Link",
    cell: ({ row }) => {
      const url = row.getValue<string>("pdf_url")
      return url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          View PDF
        </a>
      ) : (
        <span className="text-gray-400">N/A</span>
      )
    },
    size: 20,
  },
]
