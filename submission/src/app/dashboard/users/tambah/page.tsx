import AddUserForm from "@/app/dashboard/users/tambah/add-user-form";
import CheckPermission from "@/components/check-permission";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AddUserPage() {
  return (
    <CheckPermission groups={["hrd"]}>
      <div className="flex-1">
        <h1 className="text-2xl font-semibold mb-4">Tambah User</h1>
        <AddUserForm />
      </div>
    </CheckPermission>
  );
}
