import { approvalAtasan } from "@/api/submissions-api";
import SubmitButton from "@/components/submit-button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function ApproveSubmissionButton({
  submissionId,
}: {
  submissionId: string;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [state, formAction] = useFormState(approvalAtasan, undefined);

  useEffect(() => {
    if (state != null && state.message !== null) {
      if (state != undefined) {
        if (state!.error) {
          toast({
            title: "Error",
            description: state.message,
            variant: "destructive",
            duration: 2000,
          });
        } else {
          toast({
            title: "Success",
            variant: "success",
            description: state.message,
            duration: 3000,
          });
          setIsDialogOpen(false);
        }
      }
    }
  }, [state]);

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <TooltipProvider>
        <Tooltip>
          <AlertDialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button className="w-full flex items-center gap-2">
                <Icon
                  icon="tabler:square-rounded-check-filled"
                  className="h-4 w-4"
                />
                Approve
              </Button>
            </TooltipTrigger>
          </AlertDialogTrigger>
        </Tooltip>
      </TooltipProvider>
      <AlertDialogContent className="sm:max-w-[350px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Apakah Anda yakin ingin approve pengajuan ini?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex w-full">
          <form
            action={formAction}
            className="w-full mx-auto gap-4 flex flex-col justify-between"
          >
            <input type="hidden" name="id" value={submissionId} />
            <Button
              variant="secondary"
              type="button"
              onClick={() => setIsDialogOpen(false)}
              className="w-full"
            >
              Batal
            </Button>
            <SubmitButton>Approve</SubmitButton>
          </form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
