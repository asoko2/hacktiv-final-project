import { getAllUsers } from "@/api/users-api";
import { columns } from "@/app/dashboard/users/columns";
import { UsersTable } from "@/app/dashboard/users/users-table";

export default async function UsersCard(){
  const users = await getAllUsers();

  return (
    <UsersTable columns={columns} data={users} />
  )
}