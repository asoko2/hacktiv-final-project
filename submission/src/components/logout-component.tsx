import { logout } from "@/api/auth-api";
import { useFormState } from "react-dom";

export default function Logout() {
  const [state, formAction] = useFormState(logout, undefined);

  return (
    <form action={formAction} method="post">
      <button type="submit">Logout</button>
    </form>
  );
}
