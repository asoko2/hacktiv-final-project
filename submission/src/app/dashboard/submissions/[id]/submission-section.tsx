import { getSubmissionItems } from "@/api/submission-items-api";
import { columns } from "@/app/dashboard/submissions/[id]/columns";
import SubmissionItemsTable from "@/app/dashboard/submissions/[id]/submission-items-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default async function SubmissionItemSection({ id }: { id: string }) {
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
      <Card className="bg-transparent border-0 shadow-none">
        <CardContent className="p-4">
          <h1 className="text-xl font-semibold mb-2">
            Detail Pengajuan - {submissionData.submission.name}
          </h1>
          <SubmissionItemsTable data={submissionData.items} columns={columns} />
        </CardContent>
      </Card>
    </div>
  );
}
