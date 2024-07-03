"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SubmissionItem } from "@/lib/definition";
import SubmissionItemsButtons from "@/app/dashboard/submissions/[id]/components/submission-items-buttons";

export const columns: ColumnDef<SubmissionItem>[] = [
  {
    id: "rowNumber",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "itemName",
    header: "Nama Barang",
  },
  {
    accessorKey: "price",
    header: () => <div className="w-full text-right">Harga</div>,

    cell: ({ row }) => (
      <div className="text-right">
        {new Intl.NumberFormat("id-ID").format(row.original.price)}
      </div>
    ),
  },
  {
    accessorKey: "qty",
    header: () => <div className="w-full text-right">Jumlah Barang</div>,
    cell: ({ row }) => (
      <div className="text-right">
        {new Intl.NumberFormat("id-ID").format(row.original.qty)}
      </div>
    ),
  },
  {
    accessorKey: "total",
    header: () => <div className="w-full text-right">Total Harga</div>,
    cell: ({ row }) => (
      <div className="text-right">
        {new Intl.NumberFormat("id-ID").format(row.original.total)}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <SubmissionItemsButtons data={row.original} />,
  },
];
