import DeleteSubmissionButton from "@/app/dashboard/submissions/components/delete-submission-button";
import EditSubmissionButton from "@/app/dashboard/submissions/components/edit-submission-button";
import SendSubmissionButton from "@/app/dashboard/submissions/components/send-submission-button";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Submission } from "@/lib/definition";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

export default function SubmissionTableButtons({
  submission,
}: {
  submission: Submission;
}) {
  return (
    <div className="flex gap-2 items-center justify-end">
      {submission.status_code === "draft" && (
        <SendSubmissionButton submission={submission} />
      )}
      {submission.status_code === "draft" && (
        <EditSubmissionButton submission={submission} />
      )}
      <TooltipProvider>
        <Tooltip delayDuration={150}>
          <TooltipTrigger asChild>
            <Link href={`/dashboard/submissions/${submission.id}`}>
              <Button variant="default" size="icon">
                <Icon icon="tabler:eye" className="h-4 w-4" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>Detail</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {submission.status_code === "draft" && (
        <DeleteSubmissionButton submission={submission} />
      )}
    </div>
  );
}
