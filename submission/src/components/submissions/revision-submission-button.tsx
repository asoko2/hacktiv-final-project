import { sendRevision } from "@/api/submissions-api";
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

export default function RevisionSubmissionButton({
  submissionId,
}: {
  submissionId: string;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const initialState = { message: null, errors: {} };
  const [state, formAction] = useFormState(sendRevision, initialState);

  useEffect(() => {
    if (state != null && state.message !== null) {
      if (state.errors != null) {
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
  }, [state]);

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <TooltipProvider>
        <Tooltip>
          <AlertDialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                variant={"secondary"}
                className="w-full flex items-center gap-2"
              >
                <Icon
                  icon="tabler:square-rounded-chevrons-left-filled"
                  className="h-4 w-4"
                />
                Revisi
              </Button>
            </TooltipTrigger>
          </AlertDialogTrigger>
        </Tooltip>
      </TooltipProvider>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Apakah Anda yakin ingin merevisi pengajuan ini?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <form action={formAction}>
          <input type="hidden" name="submissionId" value={submissionId} />
          <div className="flex flex-col gap-2 mb-4">
            <Label htmlFor="reason">Alasan Revisi</Label>
            <Textarea
              id="reason"
              name="reason"
              placeholder="Tuliskan alasan di sini"
              className={cn(
                {
                  "border-red-500 focus-visible:ring-red-500":
                    state.errors?.reason,
                },
                "w-full bg-white resize-none"
              )}
              aria-describedby="reason-error"
            />
            <div id="reason-error">
              {state.errors?.reason &&
                state.errors.reason.map((error: string) => (
                  <p key={error} className="text-red-500 text-sm">
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="flex justify-end">
            <div className="w-1/2 flex gap-2">
              <Button
                className="w-full"
                type="button"
                variant="secondary"
                onClick={() => setIsDialogOpen(false)}
              >
                Batal
              </Button>
              <SubmitButton>Revisi</SubmitButton>
            </div>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
