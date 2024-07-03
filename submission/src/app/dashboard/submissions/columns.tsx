"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { login } from "@/api/auth-api";
import { Submission } from "@/lib/definition";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/submit-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DeleteSubmissionState,
  deleteSubmission,
  updateSubmission,
} from "@/api/submissions-api";
import { toast } from "@/components/ui/use-toast";

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
    cell: ({ row }) => {
      const { pending } = useFormStatus();
      const initialState = { errors: {}, message: null };
      const initialDeleteSubmissionState: DeleteSubmissionState = {
        errors: {
          message: "",
        },
        message: "",
      };
      const [state, formAction] = useFormState(updateSubmission, initialState);
      const [deleteState, formDeleteAction] = useFormState(
        deleteSubmission,
        initialDeleteSubmissionState
      );

      const submission = row.original;
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

      const currentYear = new Date().getFullYear();
      const years = Array.from(
        { length: 5 },
        (_, index) => currentYear - index
      );

      useEffect(() => {
        if (state != null && state.message != null) {
          if (state.errors != null && state.errors.groups != null) {
            toast({
              title: "Error",
              description: state.message,
              variant: "destructive",
              duration: 3000,
            });
          } else {
            toast({
              title: "Success",
              description: state.message,
              variant: "success",
              duration: 3000,
            });
            setIsEditDialogOpen(false);
          }
        }
        console.log("deleteState", deleteState);
        if (deleteState != null && deleteState.message != "") {
          if (deleteState.errors != null && deleteState.errors.message != "") {
            toast({
              title: "Error",
              description: deleteState.message,
              variant: "destructive",
              duration: 3000,
            });
          } else {
            setIsDialogOpen(false);
            toast({
              title: "Success",
              description: deleteState.message,
              variant: "success",
              duration: 3000,
            });
          }
        }
      }, [state, deleteState]);

      return (
        <div className="flex items-center justify-center gap-2">
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <TooltipProvider>
              <Tooltip delayDuration={150}>
                <DialogTrigger asChild>
                  <TooltipTrigger asChild>
                    <Button variant="default" size="icon" type="button">
                      <Icon icon="tabler:edit" className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                </DialogTrigger>
                <TooltipContent>Edit</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Submission</DialogTitle>
              </DialogHeader>
              <form action={formAction}>
                <input type="hidden" name="id" value={submission.id} />
                <div className="flex flex-col gap-2 mb-4">
                  <Label htmlFor="name">Nama</Label>
                  <Input
                    type="text"
                    name="name"
                    defaultValue={submission.name}
                  />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                  <Label htmlFor="year">Tahun</Label>
                  <Select name="year" defaultValue={submission.year.toString()}>
                    <SelectTrigger aria-describedby="year-error">
                      <SelectValue placeholder="Pilih Tahun" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-end">
                  <div className="w-1/2 flex gap-4">
                    <Button
                      type="button"
                      variant={"secondary"}
                      className="w-1/2"
                      onClick={() => setIsEditDialogOpen(false)}
                    >
                      Batal
                    </Button>
                    <div className="w-1/2">
                      <SubmitButton>Simpan</SubmitButton>
                    </div>
                  </div>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          <TooltipProvider>
            <Tooltip delayDuration={150}>
              <TooltipTrigger asChild>
                <Link href={`/dashboard/submissions/${submission.id}`}>
                  <Button variant="default" size="icon">
                    <Icon icon="tabler:eye" className="h-4 w-4" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>Detail</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <TooltipProvider>
              <Tooltip delayDuration={150}>
                <AlertDialogTrigger asChild>
                  <TooltipTrigger asChild content="tooltip content">
                    <Button variant="destructive" size="icon">
                      <Icon icon="tabler:trash" className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                </AlertDialogTrigger>
                <TooltipContent>Hapus</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
                <AlertDialogDescription>
                  Data submission {submission.name} akan dihapus permanen.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <form action={formDeleteAction}>
                  <input type="hidden" name="id" value={submission.id} />
                  <SubmitButton variant="destructive">Hapus</SubmitButton>
                </form>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
