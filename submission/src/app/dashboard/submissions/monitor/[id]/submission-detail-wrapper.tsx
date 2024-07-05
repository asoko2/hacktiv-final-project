import { getSubmissionItems } from "@/api/submission-items-api";
import SubmissionMonitorDetailSection from "@/app/dashboard/submissions/monitor/[id]/submission-monitor-detail-section";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { checkMonitorPermission } from "@/lib/helpers/check-monitor-permission";
import Link from "next/link";

export default async function SubmissionMonitorDetailWrapper({
  id,
}: {
  id: string;
}) {
  const submissionData = await getSubmissionItems(id);

  return (
    <div>
      <div className="mb-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link href="/dashboard/submissions/monitor">
                Monitor Pengajuan
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{submissionData.submission.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <SubmissionMonitorDetailSection submissionData={submissionData} />
    </div>
  );
}
