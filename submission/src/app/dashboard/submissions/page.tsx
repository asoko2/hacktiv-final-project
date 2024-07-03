import { getSubmissionByUserId } from "@/api/submissions-api";
import { columns } from "@/app/dashboard/submissions/columns";
import { SubmissionsTable } from "@/app/dashboard/submissions/submissions-table";
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
  const userSubmission = await getSubmissionByUserId();

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
              <BreadcrumbPage>Submissions</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-1">
        <SubmissionsTable columns={columns} data={userSubmission} />
      </div>
    </div>
  );
}
