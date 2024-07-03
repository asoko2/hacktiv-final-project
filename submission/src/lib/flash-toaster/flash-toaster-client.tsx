"use client";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

export default function FlashToasterClient(props: {
  flash: string | undefined;
}) {
  const { toast } = useToast();

  useEffect(() => {
    if (!!props.flash) {
      const { type, message } = JSON.parse(props.flash);
      if (type === "success") {
        toast({
          title: "Success",
          description: message,
        });
      } else if (type === "error") {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: message,
        });
      }
    }
  }, [props.flash]);
  return null;
}
