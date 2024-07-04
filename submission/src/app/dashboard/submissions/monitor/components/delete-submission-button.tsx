import { DeleteSubmissionState, deleteSubmission } from "@/api/submissions-api";
import SubmitButton from "@/components/submit-button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
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

export default function DeleteSubmissionButton({
  submission,
}: {
  submission: Submission;
}) {
  const initialDeleteSubmissionState: DeleteSubmissionState = {
    errors: {
      message: "",
    },
    message: "",
  };

  const [deleteState, formDeleteAction] = useFormState(
    deleteSubmission,
    initialDeleteSubmissionState
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
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
  }, [deleteState]);
  return (
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
  );
}
