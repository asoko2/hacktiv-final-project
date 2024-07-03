import { getSubmissionItems } from "@/api/submissions-api";
import SubmissionDetailSkeleton from "@/app/dashboard/submissions/[id]/submission-detail-skeleton";
import SubmissionItemsTable from "@/app/dashboard/submissions/[id]/submission-items-table";
import SubmissionItemSection from "@/app/dashboard/submissions/[id]/submission-section";
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
import { Suspense } from "react";

export default function SubmissionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="flex-1">
      <Suspense fallback={<SubmissionDetailSkeleton />}>
        <SubmissionItemSection id={params.id} />
      </Suspense>
    </div>
  );
}
