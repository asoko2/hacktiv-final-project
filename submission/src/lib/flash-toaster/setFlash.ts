"use server"
import { cookies } from "next/headers";

export async function setFlash(flash: {
  type: "success" | "error";
  message: string;
}) {
  cookies().set("flash", JSON.stringify(flash), {
    path: "/",
    expires: new Date(Date.now() + 10 * 1000),
  });
}
