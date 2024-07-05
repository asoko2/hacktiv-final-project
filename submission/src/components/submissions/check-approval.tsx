import { useAuth } from "@/components/auth-provider";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Submission } from "@/lib/definition";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CheckApproval({
  submission,
}: {
  submission: Submission;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setIsDialogOpen(true);
  });

  return (
    <div>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Anda sudah menyetujui pengajuan ini. Silakan kembali ke halaman
              Daftar Pengajuan.
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="w-full text-center">
            <Link href={"/dashboard/submissions/monitor"}>
              <Button variant="default">Kembali ke Daftar Pengajuan</Button>
            </Link>
          </AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
