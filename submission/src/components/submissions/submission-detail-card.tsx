import { useAuth } from "@/components/auth-provider";
import ApproveSubmissionButton from "@/components/submissions/approve-submission-button";
import AuthenticateSubmissionButton from "@/components/submissions/authenticate-submission-button";
import RejectSubmissionButton from "@/components/submissions/reject-submission-button";
import RevisionSubmissionButton from "@/components/submissions/revision-submission-button";
import UploadInvoiceButton from "@/components/submissions/upload-invoice-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Submission } from "@/lib/definition";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function SubmissionDetailCard({
  submission,
  monitor = false,
}: {
  submission: Submission;
  monitor: boolean;
}) {
  const { currentGroup } = useAuth();
  return (
    <Card className="mb-4 shadow-none">
      <CardHeader className="p-4">
        <CardTitle>Detail Pengajuan</CardTitle>
      </CardHeader>
      <Separator className="w-full" />
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-16">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <label className="text-sm text-gray-500 w-1/2">
                Nama Pengajuan
              </label>
              <p className="font-semibold text-sm w-1/2 text-right">
                {submission.name}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <label className="text-sm text-gray-500 w-1/2">
                Tahun Pengajuan
              </label>
              <p className="font-semibold text-sm w-1/2 text-right">
                {submission.year}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <label className="text-sm text-gray-500 w-1/2">Total Harga</label>
              <p className="font-semibold text-sm w-1/2 text-right">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(submission.total_price)}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <label className="text-sm text-gray-500 w-1/2">
                Status Pengajuan
              </label>
              <div
                className={cn(
                  {
                    "bg-red-500 text-white": submission.status === "1",
                    "bg-primary-500 text-white":
                      submission.status === "2" ||
                      submission.status === "3" ||
                      submission.status === "4" ||
                      submission.status === "5" ||
                      submission.status === "8" ||
                      submission.status === "7",
                    "bg-green-500 text-white": submission.status === "6",
                  },
                  "rounded-md p-2 w-1/2 flex justify-center items-center"
                )}
              >
                <p className="font-semibold text-sm">
                  {submission.status_name}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <label className="text-sm text-gray-500 w-1/2">Pemohon</label>
              <p className="font-semibold text-sm w-1/2 text-right">
                {submission.request_user_name}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <label className="text-sm text-gray-500 w-1/2">
                Approval Atasan
              </label>
              <p className="font-semibold text-sm w-1/2 text-right">
                {submission.atasan_name}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <label className="text-sm text-gray-500 w-1/2">
                Approval HRD
              </label>
              <p className="font-semibold text-sm w-1/2 text-right">
                {submission.hrd_name}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <label className="text-sm text-gray-500 w-1/2">
                Approval Pengesah
              </label>
              <p className="font-semibold text-sm w-1/2 text-right">
                {submission.authenticator_name}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {submission.need_revision_user_id !== null && (
              <>
                <div className="flex gap-4 items-center">
                  <label className="text-sm text-gray-500 w-1/2">
                    Direvisi oleh
                  </label>
                  <p className="font-semibold text-sm w-1/2 text-right">
                    {submission.need_revision_name}
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <label className="text-sm text-gray-500 w-1/2">
                    Alasan Revisi
                  </label>
                  <p className="font-semibold text-sm w-1/2 text-right">
                    {submission.reason_need_revision}
                  </p>
                </div>
              </>
            )}
            {submission.rejected_user_id !== null && (
              <>
                <div className="flex gap-4 items-center">
                  <label className="text-sm text-gray-500 w-1/2">
                    Ditolak oleh
                  </label>
                  <p className="font-semibold text-sm w-1/2 text-right">
                    {submission.rejector_name}
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <label className="text-sm text-gray-500 w-1/2">
                    Alasan ditolak
                  </label>
                  <p className="font-semibold text-sm w-1/2 text-right">
                    {submission.reason_rejected}
                  </p>
                </div>
              </>
            )}
            <div className="flex gap-4 items-center">
              <label className="text-sm text-gray-500 w-1/2">
                Download Invoice
              </label>
              <p className="font-semibold text-sm w-1/2 text-left">
                <a href={submission.invoice_dir} target="_blank">
                  <Button size={"icon"}>
                    <Icon
                      icon="tabler:download"
                      className="font-semibold h-4 w-4"
                    />{" "}
                  </Button>{" "}
                </a>
              </p>
            </div>
            <div className="flex gap-2 items-center justify-between">
              {monitor && (
                <>
                  {(submission.status === "2" && currentGroup === "atasan") ||
                  (submission.status === "3" && currentGroup === "hrd") ? (
                    <>
                      <RevisionSubmissionButton submissionId={submission.id} />
                      <RejectSubmissionButton submissionId={submission.id} />
                      <ApproveSubmissionButton submissionId={submission.id} />
                    </>
                  ) : (
                    submission.status === "5" &&
                    currentGroup === "pengesah" && (
                      <AuthenticateSubmissionButton
                        submissionId={submission.id}
                      />
                    )
                  )}
                </>
              )}
              {submission.status === "4" && (
                <UploadInvoiceButton submission={submission} />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
