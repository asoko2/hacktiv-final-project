import { updateSubmission } from "@/api/submissions-api";
import SubmitButton from "@/components/submit-button";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export default function EditSubmissionButton({
  submission,
}: {
  submission: Submission;
}) {
  const initialState = { errors: {}, message: null };
  const [state, formAction] = useFormState(updateSubmission, initialState);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, index) => currentYear - index);

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
            <TooltipTrigger asChild>
              <Button variant="default" size="icon" type="button">
                <Icon icon="tabler:edit" className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent>Edit</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Submission</DialogTitle>
        </DialogHeader>
        <form action={formAction}>
          <input type="hidden" name="id" value={submission.id} />
          <div className="flex flex-col gap-2 mb-4">
            <Label htmlFor="name">Nama</Label>
            <Input type="text" name="name" defaultValue={submission.name} />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <Label htmlFor="year">Tahun</Label>
            <Select name="year" defaultValue={submission.year.toString()}>
              <SelectTrigger aria-describedby="year-error">
                <SelectValue placeholder="Pilih Tahun" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-end">
            <div className="w-1/2 flex gap-4">
              <Button
                type="button"
                variant={"secondary"}
                className="w-1/2"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Batal
              </Button>
              <div className="w-1/2">
                <SubmitButton>Simpan</SubmitButton>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
