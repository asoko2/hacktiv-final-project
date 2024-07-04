import { updateSubmissionItem } from "@/api/submission-items-api";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { SubmissionItem } from "@/lib/definition";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function EditSubmissionItemButton({
  data,
}: {
  data: SubmissionItem;
}) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const initialState = { errors: {}, message: null };
  const [state, formAction] = useFormState(updateSubmissionItem, initialState);

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
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <TooltipProvider>
        <Tooltip delayDuration={150}>
          <DialogTrigger asChild>
            <TooltipTrigger asChild content="tooltip content">
              <Button type="button" size="icon">
                <Icon icon="tabler:edit" className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent>Edit</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Edit Barang</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form action={formAction}>
            <input type="hidden" name="id" value={data.id} />
            <div className="flex gap-4 mb-4 items-start">
              <Label
                htmlFor="itemName"
                className={cn(
                  "w-2/5 mt-2",
                  state.errors?.itemName && "text-red-500 mt-3"
                )}
              >
                Nama Barang
              </Label>
              <div className="flex flex-col gap-2 w-full items-start">
                <Input
                  id="itemName"
                  name="itemName"
                  defaultValue={data.itemName}
                  className={cn(
                    "w-full",
                    state.errors?.itemName && "focus-visible:ring-red-500"
                  )}
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
            </div>
            <div className="flex gap-4 mb-4 items-start">
              <Label
                htmlFor="price"
                className={cn(
                  "w-2/5 mt-2",
                  state.errors?.price && "text-red-500 mt-3"
                )}
              >
                Harga
              </Label>
              <div className="flex flex-col gap-2 w-full items-start">
                <Input
                  id="price"
                  name="price"
                  defaultValue={data.price}
                  className={cn(
                    "w-full",
                    state.errors?.price && "focus-visible:ring-red-500"
                  )}
                  aria-describedby="name-error"
                />
                <div id="name-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.price &&
                    state.errors.price.map((error: string) => (
                      <p key={error} className="text-red-500 text-sm">
                        {error}
                      </p>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4 mb-4 items-start">
              <Label
                htmlFor="qty"
                className={cn(
                  "w-2/5 mt-2",
                  state.errors?.qty && "text-red-500 mt-3"
                )}
              >
                Jumlah Barang
              </Label>
              <div className="flex flex-col gap-2 w-full items-start">
                <Input
                  id="qty"
                  name="qty"
                  defaultValue={data.qty}
                  className={cn(
                    "w-full",
                    state.errors?.qty && "focus-visible:ring-red-500"
                  )}
                  aria-describedby="name-error"
                />
                <div id="name-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.qty &&
                    state.errors.qty.map((error: string) => (
                      <p key={error} className="text-red-500 text-sm">
                        {error}
                      </p>
                    ))}
                </div>
              </div>
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
  );
}
