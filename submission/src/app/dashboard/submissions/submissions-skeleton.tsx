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
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function SubmissionsTable() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-2">
        <Link href={"/dashboard/submissions/pengajuan-baru"}>
          <Button variant={"default"} className="flex items-center gap-2">
            <Icon icon="fluent:add-12-filled" className="h-4 w-4" /> Pengajuan
            Baru
          </Button>
        </Link>
        <Input placeholder="Filter names..." className="max-w-sm bg-white" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/12">NO</TableHead>
            <TableHead className="w-3/12">Nama</TableHead>
            <TableHead className="w-1/12 text-right">Jumlah Barang</TableHead>
            <TableHead className="w-2/12 text-right">Total Harga</TableHead>
            <TableHead className="w-2/12 text-right">Total Item</TableHead>
            <TableHead className="w-3/12">Status</TableHead>
            <TableHead className="w-3/12">Tahun</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  );
}
