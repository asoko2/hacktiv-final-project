"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import DataTable from "@/components/data-table/data-table";
import { setFlash } from "@/lib/flash-toaster";
import { toast } from "@/components/ui/use-toast";

interface UsersTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function UsersTable<TData, TValue>({
  columns,
  data,
}: UsersTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-2">
        <Link href={"/dashboard/users/tambah"}>
          <Button variant={"default"} className="flex items-center gap-2">
            <Icon icon="fluent:add-12-filled" className="h-4 w-4" /> Tambah User
          </Button>
        </Link>
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm bg-white"
        />
      </div>
      <DataTable table={table} columns={columns} data={data} />
      <DataTablePagination table={table} />
    </div>
  );
}
