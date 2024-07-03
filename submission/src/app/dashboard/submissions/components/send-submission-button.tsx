"use client";
import { sendSubmission } from "@/api/submissions-api";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { Submission } from "@/lib/definition";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function SendSubmissionButton({
  submission,
}: {
  submission: Submission;
}) {
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);

  const [state, formAction] = useFormState(sendSubmission, undefined);

  useEffect(() => {
    if (state != undefined) {
      if (state!.error) {
        toast({
          variant: "destructive",
          description: state!.message,
          duration: 2000,
        });
      } else {
        toast({
          variant: "success",
          description: state!.message,
          duration: 2000,
        });
        setIsSendDialogOpen(false);
      }
    }
  }, [state]);

  return (
    <Dialog open={isSendDialogOpen} onOpenChange={setIsSendDialogOpen}>
      <TooltipProvider>
        <Tooltip delayDuration={150}>
          <DialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button variant="success" size="icon" type="button">
                <Icon icon="tabler:send" className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent side="left">Kirim</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kirim pengajuan?</DialogTitle>
          <DialogDescription>
            Setelah dikirim data tidak akan bisa diubah!
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full">
          <form
            action={formAction}
            className="w-1/2 mx-auto gap-4 flex justify-between"
          >
            <input type="hidden" name="id" value={submission.id} />
            <Button
              variant="secondary"
              type="button"
              onClick={() => setIsSendDialogOpen(false)}
              className="w-full"
            >
              Batal
            </Button>
            <SubmitButton>
              Kirim
            </SubmitButton>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
