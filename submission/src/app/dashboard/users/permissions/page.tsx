import { getUsersWithGroup } from "@/api/users-api";
import { columns } from "@/app/dashboard/users/permissions/columns";
import { UsersPermissionTable } from "@/app/dashboard/users/permissions/users-permissions-table";
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

export default async function UsersPermissionPage() {
  const userWithGroups = await getUsersWithGroup();

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
                <BreadcrumbPage>Users Permission</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex flex-1">
          <UsersPermissionTable columns={columns} data={userWithGroups} />
        </div>
      </div>
    </CheckPermission>
  );
}
