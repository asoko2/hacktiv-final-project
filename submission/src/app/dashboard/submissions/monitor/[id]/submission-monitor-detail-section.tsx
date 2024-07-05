"use client";
import AddItemForm from "@/app/dashboard/submissions/[id]/add-item-form";

import SubmissionItemsButtons from "@/app/dashboard/submissions/[id]/components/submission-items-buttons";
import SubmissionItemsTable from "@/app/dashboard/submissions/[id]/submission-items-table";
import { useAuth } from "@/components/auth-provider";
import CheckApproval from "@/components/submissions/check-approval";
import SubmissionDetailCard from "@/components/submissions/submission-detail-card";
import { Submission, SubmissionItem } from "@/lib/definition";
import { ColumnDef } from "@tanstack/react-table";

export default function SubmissionMonitorDetailSection({
  submissionData,
}: {
  submissionData: {
    items: SubmissionItem[];
    submission: Submission;
  };
}) {
  const columns: ColumnDef<SubmissionItem>[] = [
    {
      id: "rowNumber",
      header: "No",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "itemName",
      header: "Nama Barang",
    },
    {
      accessorKey: "price",
      header: () => <div className="w-full text-right">Harga</div>,

      cell: ({ row }) => (
        <div className="text-right">
          {new Intl.NumberFormat("id-ID").format(row.original.price)}
        </div>
      ),
    },
    {
      accessorKey: "qty",
      header: () => <div className="w-full text-right">Jumlah Barang</div>,
      cell: ({ row }) => (
        <div className="text-right">
          {new Intl.NumberFormat("id-ID").format(row.original.qty)}
        </div>
      ),
    },
    {
      accessorKey: "total",
      header: () => <div className="w-full text-right">Total Harga</div>,
      cell: ({ row }) => (
        <div className="text-right">
          {new Intl.NumberFormat("id-ID").format(row.original.total)}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <SubmissionItemsButtons
          data={row.original}
          submission={submissionData.submission}
        />
      ),
    },
  ];

  const { currentGroup } = useAuth();

  return (
    <div>
      {((currentGroup === "atasan" &&
        submissionData.submission.status !== "2") ||
        (currentGroup === "hrd" &&
          submissionData.submission.status !== "3")) && (
        <CheckApproval submission={submissionData.submission} />
      )}
      <SubmissionDetailCard submission={submissionData.submission} monitor />
      {(submissionData.submission.status === "1" ||
        submissionData.submission.status === "7") && (
        <div className="mb-4">
          <AddItemForm submission_id={submissionData.submission.id} />
        </div>
      )}
      <SubmissionItemsTable data={submissionData.items} columns={columns} />
    </div>
  );
}
