"use client";
import { login } from "@/api/auth-api";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";

export default function LoginForm() {
  const [errorMessage, formAction] = useFormState(login, undefined);

  return (
    <div>
      <form action={formAction}>
        <div className="grid w-full items-center gap-1.5 mb-4">
          <Label htmlFor="nip">NIP</Label>
          <Input
            type="text"
            id="nip"
            name="nip"
            placeholder="19972009xxxxxxxx"
          />
        </div>
        <div className="grid w-full items-center gap-1.5 mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
        </div>
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
        )}
        <div className="w-full">
          <SubmitButton>
            Login
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
