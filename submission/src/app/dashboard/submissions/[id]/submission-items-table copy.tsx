"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Submission, SubmissionItem } from "@/lib/definition";

export type Props = {
  submission: Submission;
  items: SubmissionItem[];
};

export default function SubmissionItemsTable({ submission, items }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/12">NO</TableHead>
          <TableHead className="w-3/12">Nama Barang</TableHead>
          <TableHead className="w-1/12 text-right">Harga</TableHead>
          <TableHead className="w-2/12 text-right">Jumlah Barang</TableHead>
          <TableHead className="w-2/12 text-right">Total Harga</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.itemName}</TableCell>
            <TableCell className="text-right">
              {new Intl.NumberFormat("id-ID").format(item.price)}
            </TableCell>
            <TableCell className="text-right">
              {new Intl.NumberFormat("id-ID").format(item.qty)}
            </TableCell>
            <TableCell className="text-right">
              {new Intl.NumberFormat("id-ID").format(item.total)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
