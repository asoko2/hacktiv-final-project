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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

export default function UsersTableSkeleton() {
  return (
    <div className="w-full">
      <Card className="bg-transparent border-0 shadow-none">
        <CardContent className="p-0">
          <div className="flex items-center justify-between py-2">
            <Link href={"/dashboard/users/tambah"}>
              <Button variant={"default"} className="flex items-center gap-2">
                <Icon icon="fluent:add-12-filled" className="h-4 w-4" /> Tambah
                User
              </Button>
            </Link>
            <Input
              placeholder="Filter names..."
              className="max-w-sm bg-white"
            />
          </div>
          <Table className="bg-white">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/12">No</TableHead>
                <TableHead className="w-3/12">Nama</TableHead>
                <TableHead className="w-1/12">NIP</TableHead>
                <TableHead className="w-2/12">Email</TableHead>
                <TableHead className="w-2/12">Username</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Skeleton className="w-full h-4 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4 rounded" />
                </TableCell>
                <TableCell>
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
