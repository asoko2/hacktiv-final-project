"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export default function SubmitButton({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "link"
    | "outline"
    | "ghost";
}) {
  const formStatus = useFormStatus();

  return (
    <div className="w-full">
      <Button
        type="submit"
        disabled={formStatus.pending}
        className="w-full"
        variant={variant}
      >
        {formStatus.pending ? "Loading..." : children}
      </Button>
    </div>
  );
}
