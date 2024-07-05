import { uploadInvoice } from "@/api/submissions-api";
import SubmitButton from "@/components/submit-button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { Submission } from "@/lib/definition";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export default function UploadInvoiceButton({
  submission,
}: {
  submission: Submission;
}) {
  const [state, formAction] = useFormState(uploadInvoice, undefined);

  useEffect(() => {
    if (state?.error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: state.message,
        duration: 2000,
      });
    } else {
      toast({
        title: "Success",
        variant: "success",
        description: "Invoice berhasil diupload",
        duration: 2000,
      });
    }
  }, [state]);

  return (
    <AlertDialog>
      <TooltipProvider>
        <Tooltip>
          <AlertDialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button variant={"default"}>Upload Invoice</Button>
            </TooltipTrigger>
          </AlertDialogTrigger>
          <TooltipContent>Upload</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Upload Invoice</AlertDialogTitle>
          <AlertDialogDescription>
            Silakan upload invoice untuk meneruskan pengajuan
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form action={formAction}>
          <input type="hidden" name="id" value={submission.id} />
          <div className="flex flex-col gap-2 mb-4">
            <Label htmlFor="invoice" className="text-sm">
              Invoice File
            </Label>
            <Input
              type="file"
              id="invoice"
              name="invoice"
              aria-describedby="invoice-errir"
            />
            <div id="invoice-error">
              {state?.error &&
                state.message?.map((error: string) => (
                  <p key={error} className="text-red-500 text-sm">{error}</p>
                ))}
            </div>
          </div>
          <div className="w-full justify-end">
            <div className="flex w-1/2 gap-2">
              <Button type="button" variant={"secondary"}>
                Batal
              </Button>
              <SubmitButton>Upload</SubmitButton>
            </div>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
