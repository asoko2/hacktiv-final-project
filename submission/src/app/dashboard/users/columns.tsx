"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ArrowUpIcon, CaretSortIcon } from "@radix-ui/react-icons";
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
import SubmitButton from "@/components/submit-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { User } from "@/lib/definition";
import { DeleteUserState, deleteUser } from "@/api/users-api";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<User>[] = [
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
    accessorKey: "nip",
    header: "NIP",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const initialState: DeleteUserState = {
        errors: {
          message: "",
        },
        message: "",
      };
      const deleteUserWithId = deleteUser.bind(null, row.original.id);
      const [error, formAction] = useFormState(deleteUserWithId, initialState);

      const user = row.original;
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      return (
        <div className="flex items-center justify-center gap-2">
          <TooltipProvider>
            <Tooltip delayDuration={150}>
              <TooltipTrigger asChild>
                <Link href={`/dashboard/users/${user.id}/edit`}>
                  <Button variant="default" size="icon">
                    <Icon icon="tabler:edit" className="h-4 w-4" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
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
                  Data user {user.name} akan dihapus permanen.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <form action={formAction}>
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
