import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function SubmissionMonitorDetailSkeleton() {
  return (
    <div>
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
              <BreadcrumbPage>
                <Skeleton className="w-36 h-4 rounded" />
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Card className="mb-4 shadow-none">
        <CardHeader className="p-4">
          <CardTitle>Detail Pengajuan</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-16">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <label className="text-sm text-gray-500 w-1/2">
                  Nama Pengajuan
                </label>
                <p className="font-semibold text-sm w-1/2 text-right">
                  <Skeleton className="w-full h-4 rounded" />
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <label className="text-sm text-gray-500 w-1/2">
                  Tahun Pengajuan
                </label>
                <p className="font-semibold text-sm w-1/2 text-right">
                  <Skeleton className="w-full h-4 rounded" />
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <label className="text-sm text-gray-500 w-1/2">
                  Total Harga
                </label>
                <p className="font-semibold text-sm w-1/2 text-right">
                  <Skeleton className="w-full h-4 rounded" />
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <label className="text-sm text-gray-500 w-1/2">
                  Status Pengajuan
                </label>
                <p className="font-semibold text-sm w-1/2 text-right">
                  <Skeleton className="w-full h-4 rounded" />
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <label className="text-sm text-gray-500 w-1/2">Pemohon</label>
                <p className="font-semibold text-sm w-1/2 text-right">
                  <Skeleton className="w-full h-4 rounded" />
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <label className="text-sm text-gray-500 w-1/2">
                  Approval Atasan
                </label>
                <p className="font-semibold text-sm w-1/2 text-right">
                  <Skeleton className="w-full h-4 rounded" />
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <label className="text-sm text-gray-500 w-1/2">
                  Approval HRD
                </label>
                <p className="font-semibold text-sm w-1/2 text-right">
                  <Skeleton className="w-full h-4 rounded" />
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <label className="text-sm text-gray-500 w-1/2">
                  Approval Pengesah
                </label>
                <p className="font-semibold text-sm w-1/2 text-right">
                  <Skeleton className="w-full h-4 rounded" />
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <label className="text-sm text-gray-500 w-1/2">Pemohon</label>
                <p className="font-semibold text-sm w-1/2 text-right">
                  <Skeleton className="w-full h-4 rounded" />
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <label className="text-sm text-gray-500 w-1/2">
                  Approval Atasan
                </label>
                <p className="font-semibold text-sm w-1/2 text-right">
                  <Skeleton className="w-full h-4 rounded" />
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <label className="text-sm text-gray-500 w-1/2">
                  Approval HRD
                </label>
                <p className="font-semibold text-sm w-1/2 text-right">
                  <Skeleton className="w-full h-4 rounded" />
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <label className="text-sm text-gray-500 w-1/2">
                  Approval Pengesah
                </label>
                <p className="font-semibold text-sm w-1/2 text-right">
                  <Skeleton className="w-full h-4 rounded" />
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Table className="bg-white rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/12">No</TableHead>
            <TableHead className="w-3/12">Nama Barang</TableHead>
            <TableHead className="w-1/12 text-right">Harga</TableHead>
            <TableHead className="w-2/12 text-right">Jumlah Barang</TableHead>
            <TableHead className="w-2/12 text-right">Total Harga</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={6}>
              <Skeleton className="w-full h-4 rounded" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
