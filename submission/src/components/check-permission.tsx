"use client";

import { useAuth } from "@/components/auth-provider";
import { checkMenuGroup } from "@/lib/helpers/check-menu-groups";
import { checkMenuPermission } from "@/lib/helpers/check-menu-permission";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export type CheckPermissionProps = {
  groups: string[];
  children?: React.ReactNode;
};

export default function CheckPermission({ groups, children }: CheckPermissionProps) {
  const { currentSession, currentGroup } = useAuth();

  useEffect(() => {
    const isCheck = checkMenuGroup(groups, currentGroup!);

    if (!isCheck && currentSession) {
      redirect("/dashboard");
    }

    // if (!groups.includes(currentGroups)) {
    //   redirect("/admin/leaves/type");
    // }
  }, [currentGroup, groups, currentSession]);
  return <>{children}</>;
}
