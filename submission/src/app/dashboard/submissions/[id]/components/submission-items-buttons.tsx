"use client";
import DeleteSubmissionItemButton from "@/app/dashboard/submissions/[id]/components/delete-submission-item-button";
import EditSubmissionItemButton from "@/app/dashboard/submissions/[id]/components/edit-submission-item-button";
import { Submission, SubmissionItem } from "@/lib/definition";

export default function SubmissionItemsButtons({
  data,
  submission,
}: {
  data: SubmissionItem;
  submission: Submission;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      {submission.status == 1 && (
        <div className="flex gap-2">
          <EditSubmissionItemButton data={data} />
          <DeleteSubmissionItemButton data={data} />
        </div>
      )}
    </div>
  );
}
