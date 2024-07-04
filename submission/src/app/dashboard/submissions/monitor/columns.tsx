"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Submission } from "@/lib/definition";
import SubmissionTableButtons from "@/app/dashboard/submissions/components/submission-table-buttons";
import SubmissionMonitorTableButtons from "@/app/dashboard/submissions/monitor/components/submission-monitor-table-buttons";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Submission>[] = [
  {
    id: "rowNumber",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "total_qty",
    header: () => <div className="text-right">Jumlah Barang</div>,
    cell: ({ row }) => (
      <div className="text-right">
        {new Intl.NumberFormat("id-ID").format(row.original.total_qty)}
      </div>
    ),
  },
  {
    accessorKey: "total_price",
    header: () => <div className="text-right">Total Harga</div>,
    cell: ({ row }) => (
      <div className="text-right">
        {new Intl.NumberFormat("id-ID").format(row.original.total_price)}
      </div>
    ),
  },
  {
    accessorKey: "total_item",
    header: () => <div className="text-right">Total Item</div>,
    cell: ({ row }) => (
      <div className="text-right">
        {new Intl.NumberFormat("id-ID").format(row.original.total_item)}
      </div>
    ),
  },
  {
    accessorKey: "request_user_name",
    header: "Pemohon",
  },
  {
    accessorKey: "year",
    header: "Tahun",
  },
  {
    id: "actions",
    size: 100,
    cell: ({ row }) => {
      const submission = row.original;

      return <SubmissionMonitorTableButtons submission={submission} />;
    },
  },
];
