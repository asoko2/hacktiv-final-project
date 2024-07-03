import { Toaster } from "@/components/ui/toaster";
import FlashToasterClient from "@/lib/flash-toaster/flash-toaster-client";
import { cookies } from "next/headers";

export function FlashToaster() {
  const flash = cookies().get("flash");
  return (
    <>
      <Toaster />
      <FlashToasterClient flash={flash?.value} />
    </>
  );
}