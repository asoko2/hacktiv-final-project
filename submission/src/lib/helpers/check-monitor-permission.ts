import { Submission } from "@/lib/definition";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function checkMonitorPermission(submission: Submission) {
  const group = cookies().get("group")?.value;

  if (group === "atasan") {
    if (submission.status !== "2") {
      setTimeout(() => {
        console.log('redirect')
        redirect("/dashboard/submissions/monitor");
      }, 1500);
    }
  } else if (group === "hrd") {
    if (submission.status !== "3") {
      setTimeout(() => {
        console.log('redirect')
        redirect("/dashboard/submissions/monitor");
      }, 1500);
    }
  }
}
