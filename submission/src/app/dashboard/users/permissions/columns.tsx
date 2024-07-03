"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  DialogFooter,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { UserWithGroups } from "@/lib/definition";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

import { userGroups } from "@/lib/definition";
import { FormEvent, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { syncGroupState, syncGroups } from "@/api/users-api";
import { useToast } from "@/components/ui/use-toast";
import SubmitButton from "@/components/submit-button";

export const columns: ColumnDef<UserWithGroups>[] = [
  {
    id: "rowNumber",
    header: "No",
    size: 50,
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Nama",
    size: 50,
  },
  {
    accessorKey: "groups",
    header: "Hak Akses",
    size: 50,
    cell: ({ row }) => {
      const user = row.original;

      const newGroup = user.groups.map((group) => group.toUpperCase());

      return newGroup.join(", ");
    },
  },
  {
    id: "actions",
    size: 50,
    cell: ({ row }) => {
      const user = row.original;

      const syncGroupsWithId = syncGroups.bind(null, user.id);

      const initialState = { message: null, errors: {} };
      const [state, formAction] = useFormState(syncGroupsWithId, initialState);
      const { toast } = useToast();

      const handleSubmit = (e: FormEvent<HTMLFormElement>, id: string) => {
        e.preventDefault();
        // console.log("submit", groups);
      };

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
              duration: 3000,
            });
          }
        }
      }, [state]);

      return (
        <div className="flex items-center justify-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon">
                <Icon icon="tabler:edit" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Hak Akses</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <form action={formAction}>
                  {userGroups.map((userGroup) => (
                    <label
                      key={userGroup}
                      className="flex items-center gap-2 mb-4"
                    >
                      <label
                        key={userGroup}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          defaultChecked={user.groups.includes(userGroup)}
                          readOnly={userGroup === "pegawai"}
                          name="groups"
                          id={userGroup}
                          value={userGroup}
                          disabled={userGroup === "pegawai"}
                        />
                        {userGroup.toUpperCase()}
                      </label>
                    </label>
                  ))}
                  <SubmitButton>Simpan</SubmitButton>
                </form>
              </div>
              <DialogFooter></DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
