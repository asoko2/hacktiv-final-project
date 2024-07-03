import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
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

export default function SubmissionDetailSkeleton() {
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
      <Card className="bg-transparent border-0 shadow-none">
        <CardContent className="p-4">
          <h1 className="text-xl font-semibold flex items-center gap-2 mb-2">
            Detail Pengajuan - <Skeleton className="w-36 h-4 rounded" />
          </h1>
          <Table className="bg-white rounded-md">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/12">NO</TableHead>
                <TableHead className="w-3/12">Nama Barang</TableHead>
                <TableHead className="w-1/12 text-right">Harga</TableHead>
                <TableHead className="w-2/12 text-right">
                  Jumlah Barang
                </TableHead>
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
        </CardContent>
      </Card>
    </div>
  );
}
