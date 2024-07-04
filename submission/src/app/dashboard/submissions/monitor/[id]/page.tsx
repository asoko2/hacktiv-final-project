import SubmissionMonitorDetailSkeleton from "@/app/dashboard/submissions/monitor/[id]/submission-detail-skeleton";
import SubmissionMonitorDetailWrapper from "@/app/dashboard/submissions/monitor/[id]/submission-detail-wrapper";
import { Suspense } from "react";

export default function SubmissionMonitorDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="flex-1">
      <Suspense fallback={<SubmissionMonitorDetailSkeleton />}>
        <SubmissionMonitorDetailWrapper id={params.id} />
      </Suspense>
    </div>
  );
}
