"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Submission } from "@/lib/definition";
import SubmissionTableButtons from "@/app/dashboard/submissions/components/submission-table-buttons";

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
    header: "Jumlah Barang",
    cell: ({ row }) => (
      <div className="text-right">
        {new Intl.NumberFormat("id-ID").format(row.original.total_qty)}
      </div>
    ),
  },
  {
    accessorKey: "total_price",
    header: "Total Harga",
    cell: ({ row }) => (
      <div className="text-right">
        {new Intl.NumberFormat("id-ID").format(row.original.total_price)}
      </div>
    ),
  },
  {
    accessorKey: "total_item",
    header: "Total Item",
    cell: ({ row }) => (
      <div className="text-right">
        {new Intl.NumberFormat("id-ID").format(row.original.total_item)}
      </div>
    ),
  },
  {
    accessorKey: "status_name",
    header: "Status",
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

      return <SubmissionTableButtons submission={submission} />;
    },
  },
];
