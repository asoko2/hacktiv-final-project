"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function SubmissionDetailPage() {
  const { pending } = useFormStatus();
  // const [error, formAction] = useFormState(login, undefined);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex-1">
      <div className="mb-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link href="/dashboard/submissions">Pengajuan Barang</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold">Detail Pengajuan</h1>
          </div>
          <Separator className="my-2" />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/12">NO</TableHead>
                <TableHead className="w-3/12">Nama Barang</TableHead>
                <TableHead className="w-1/12 text-right">Harga</TableHead>
                <TableHead className="w-2/12 text-right">
                  Jumlah Barang
                </TableHead>
                <TableHead className="w-2/12 text-right">Total Harga</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody></TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
