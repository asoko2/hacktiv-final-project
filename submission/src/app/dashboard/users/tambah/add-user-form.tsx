"use client";

import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/submit-button";
import { addUser } from "@/api/users-api";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

export default function AddUserForm() {
  const initialState = { message: null, errors: {} };

  const [state, formActions] = useFormState(addUser, initialState);

  const { toast } = useToast();

  useEffect(() => {
    // console.log("state", state);
    if (state != null && state.message != null) {
      if (state.errors != null) {
        toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
          duration: 3000,
        });
      } else {
        toast({
          title: "Success",
          description: state.message,
          duration: 3000,
        });
      }
    }
  }, [state]);

  return (
    <div className="w-1/2">
      <form action={formActions}>
        <div className="flex flex-col gap-4 mb-4">
          <Label htmlFor="name">Nama</Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Nama"
            className="w-full bg-white"
            aria-describedby="name-error"
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p key={error} className="text-red-500 text-sm">
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 mb-4">
          <Label htmlFor="nip">NIP</Label>
          <Input
            type="number"
            id="nip"
            name="nip"
            placeholder="NIP"
            className="w-full bg-white"
            aria-describedby="nip-error"
          />
          <div id="nip-error" aria-live="polite" aria-atomic="true">
            {state.errors?.nip &&
              state.errors.nip.map((error: string) => (
                <p key={error} className="text-red-500 text-sm">
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 mb-4">
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            className="w-full bg-white"
            aria-describedby="username-error"
          />
          <div id="username-error" aria-live="polite" aria-atomic="true">
            {state.errors?.username &&
              state.errors.username.map((error: string) => (
                <p key={error} className="text-red-500 text-sm">
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            className="w-full bg-white"
            aria-describedby="email-error"
          />
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p key={error} className="text-red-500 text-sm">
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="w-full">
          <SubmitButton>Tambah</SubmitButton>
        </div>
      </form>
    </div>
  );
}
