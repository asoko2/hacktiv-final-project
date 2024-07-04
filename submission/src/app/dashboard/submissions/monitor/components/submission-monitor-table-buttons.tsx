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

export default function SubmissionMonitorTableButtons({
  submission,
}: {
  submission: Submission;
}) {
  return (
    <div className="flex gap-2 items-center justify-end">
      <TooltipProvider>
        <Tooltip delayDuration={150}>
          <TooltipTrigger asChild>
            <Link href={`/dashboard/submissions/monitor/${submission.id}`}>
              <Button variant="default" size="icon">
                <Icon icon="tabler:eye" className="h-4 w-4" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>Detail</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
