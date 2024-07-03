import LoginForm from "@/components/login-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-100">
      <div className="w-2/3 md:w-1/2 lg:w-1/3">
        <Card className="pb-8">
          <CardHeader className="text-center border-b border-slate-200">
            <CardTitle className="text-3xl">SIJUANG</CardTitle>
            <CardDescription>
              Anda harus login terlebih dahulu untuk menggunakan aplikasi
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full py-4">
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
