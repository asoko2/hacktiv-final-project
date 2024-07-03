import { getSubmissionItems } from "@/api/submission-items-api";
import SubmissionItemSection from "@/app/dashboard/submissions/[id]/submission-section";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export default async function SubmissionDetailWrapper({ id }: { id: string }) {
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
              <Link href="/dashboard/submissions">Pengajuan Barang</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{submissionData.submission.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <SubmissionItemSection submissionData={submissionData} />
    </div>
  );
}
