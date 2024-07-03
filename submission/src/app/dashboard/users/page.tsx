import { getAllUsers } from "@/api/users-api";
import { columns } from "@/app/dashboard/users/columns";
import UsersCard from "@/app/dashboard/users/users-card";
// import { users } from "@/app/dashboard/users/data";
import { UsersTable } from "@/app/dashboard/users/users-table";
import UsersTableSkeleton from "@/app/dashboard/users/users-table-skeleton";
import CheckPermission from "@/components/check-permission";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Suspense } from "react";

export default function UsersPage() {
  return (
    <CheckPermission groups={["hrd"]}>
      <div className="flex-1">
        <div className="mb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Users</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Suspense fallback={<UsersTableSkeleton />}>
          <UsersCard />
        </Suspense>
      </div>
    </CheckPermission>
  );
}
