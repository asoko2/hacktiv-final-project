import { getUserById } from "@/api/users-api";
import EditUserForm from "@/app/dashboard/users/[id]/edit/edit-user-form";
import CheckPermission from "@/components/check-permission";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function EditUserPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const user = await getUserById(id);

  return (
    <CheckPermission groups={["hrd"]}>
      <div className="flex-1">
        <Card>
          <CardHeader>
            <CardTitle>Edit User</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="p-6">
            <EditUserForm user={user} />
          </CardContent>
        </Card>
      </div>
    </CheckPermission>
  );
}
