"use client";

import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/submit-button";
import { State, addUser } from "@/api/users-api";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";

export default function AddUserForm() {
  const initialState: State = { message: null, errors: {} };

  const [state, formActions] = useFormState(addUser, initialState);

  return (
    <div>
      <form action={formActions}>
        <div className="flex flex-col gap-4 mb-4">
          <Label htmlFor="name">Nama</Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Nama"
            className="w-full"
            aria-describedby="name-error"
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error) => (
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
            className="w-full outline-none"
            aria-describedby="nip-error"
          />
          <div id="nip-error" aria-live="polite" aria-atomic="true">
            {state.errors?.nip &&
              state.errors.nip.map((error) => (
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
