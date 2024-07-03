"use client";

import { addSubmissionItem } from "@/api/submission-items-api";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function AddItemForm({
  submission_id,
}: {
  submission_id: string;
}) {
  const initialState = { errors: {}, message: null };

  const [state, formAction] = useFormState(addSubmissionItem, initialState);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    console.log("state changed", state.errors === undefined);
    if (state != null && state.message != null) {
      if (Object.keys(state.errors).length != 0) {
        toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: state.message,
          variant: "success",
        });
        setIsDialogOpen(false);
      }
    }
  }, [state]);

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="default" type="button">
            <Icon icon="tabler:plus" className="h-4 w-4" /> Tambah Item
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Item Pengajuan</DialogTitle>
          </DialogHeader>
          <form action={formAction}>
            <input type="hidden" name="submissionId" value={submission_id} />
            <div className="flex flex-col gap-2 mb-4">
              <Label htmlFor="itemName">Nama Barang</Label>
              <Input
                type="text"
                name="itemName"
                placeholder="Contoh: Kertas, Stopmap"
                className={cn({
                  "focus-visible:ring-red-500 border-red-500":
                    state.errors?.itemName,
                })}
                aria-describedby="itemName-error"
              />
              <div id="itemName-error" aria-live="polite" aria-atomic="true">
                {state.errors?.itemName &&
                  state.errors.itemName.map((error: string) => (
                    <p key={error} className="text-red-500 text-sm">
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <Label htmlFor="price">Harga</Label>
              <Input
                type="number"
                name="price"
                className={cn({
                  "focus-visible:ring-red-500 border-red-500":
                    state.errors?.price,
                })}
                aria-describedby="price-error"
              />
              <div id="price-error" aria-live="polite" aria-atomic="true">
                {state.errors?.price &&
                  state.errors.price.map((error: string) => (
                    <p key={error} className="text-red-500 text-sm">
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <Label htmlFor="qty">Jumlah Barang</Label>
              <Input
                type="number"
                name="qty"
                className={cn({
                  "focus-visible:ring-red-500 border-red-500":
                    state.errors?.qty,
                })}
                aria-describedby="qty-error"
              />
              <div id="qty-error" aria-live="polite" aria-atomic="true">
                {state.errors?.qty &&
                  state.errors.qty.map((error: string) => (
                    <p key={error} className="text-red-500 text-sm">
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <div className="flex justify-end">
              <SubmitButton>Simpan</SubmitButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
