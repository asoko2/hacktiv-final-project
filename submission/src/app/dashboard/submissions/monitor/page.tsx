import { getSubmissionApproval } from "@/api/submissions-api";
import { columns } from "@/app/dashboard/submissions/monitor/columns";
import { SubmissionsMonitorTable } from "@/app/dashboard/submissions/monitor/submissions-monitor-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export default async function SubmissionsPage() {
  const userSubmission = await getSubmissionApproval();

  return (
    <div className="flex-1">
      <div className="mb-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Monitor Submissions</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-1">
        <SubmissionsMonitorTable columns={columns} data={userSubmission} />
      </div>
    </div>
  );
}
