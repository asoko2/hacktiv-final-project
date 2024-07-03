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
import { SubmissionItem } from "@/lib/definition";
import SubmitButton from "@/components/submit-button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateSubmissionItem } from "@/api/submission-items-api";
import { toast } from "@/components/ui/use-toast";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

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
    cell: ({ row }) => {
      const { pending } = useFormStatus();

      const initialState = { errors: {}, message: null };
      const [state, formAction] = useFormState(
        updateSubmissionItem,
        initialState
      );

      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

      const data = row.original;

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
      }, [state]);

      return (
        <div className="flex items-center justify-center gap-2">
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button size="icon">
                <Icon icon="tabler:edit" />
              </Button>
            </DialogTrigger>
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle>Edit Barang</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <form action={formAction}>
                  <input type="hidden" name="id" value={data.id} />
                  <div className="flex gap-4 mb-4 items-center">
                    <Label htmlFor="itemName" className="w-2/5">
                      Nama Barang
                    </Label>
                    <Input
                      id="itemName"
                      name="itemName"
                      defaultValue={data.itemName}
                      aria-describedby="name-error"
                    />
                    <div id="name-error" aria-live="polite" aria-atomic="true">
                      {state.errors?.itemName &&
                        state.errors.itemName.map((error: string) => (
                          <p key={error} className="text-red-500 text-sm">
                            {error}
                          </p>
                        ))}
                    </div>
                  </div>
                  <div className="flex gap-4 mb-4 items-center">
                    <Label htmlFor="price" className="w-2/5">
                      Harga
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      defaultValue={data.price.toString()}
                    />
                  </div>
                  <div className="flex gap-4 mb-4 items-center">
                    <Label htmlFor="qty" className="w-2/5">
                      Jumlah Barang
                    </Label>
                    <Input
                      id="qty"
                      name="qty"
                      defaultValue={data.qty.toString()}
                    />
                  </div>
                  <div className="flex justify-end">
                    <div className="w-1/2">
                      <div className="flex gap-4">
                        <Button
                          variant={"secondary"}
                          onClick={() => setIsEditDialogOpen(false)}
                          type="button"
                          className="w-1/2"
                        >
                          Batal
                        </Button>
                        <div className="w-1/2">
                          <SubmitButton>Simpan</SubmitButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </DialogContent>
          </Dialog>
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
                  Data submission {data.itemName} akan dihapus permanen.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <form>
                  <Button
                    type="submit"
                    disabled={pending}
                    variant="destructive"
                  >
                    Hapus
                  </Button>
                </form>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
