import SubmissionDetailSkeleton from "@/app/dashboard/submissions/[id]/submission-detail-skeleton";
import SubmissionDetailWrapper from "@/app/dashboard/submissions/[id]/submission-detail-wrapper";
import { Suspense } from "react";

export default function SubmissionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="flex-1">
      {/* <SubmissionDetailSkeleton /> */}
      <Suspense fallback={<SubmissionDetailSkeleton />}>
        <SubmissionDetailWrapper id={params.id} />
      </Suspense>
    </div>
  );
}
