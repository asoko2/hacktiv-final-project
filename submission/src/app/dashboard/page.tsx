import { getSession } from "@/api/authorization";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default async function Dashboard() {
  const session = await getSession();

  // console.log("session = ", session);

  return (
    <div className="flex-1">
      <Card>
        <CardContent className="p-4 pb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Selamat datang di Dashboard, {session.name}{" "}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
