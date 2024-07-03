"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function login(prevState: string | undefined, formData: FormData) {
  const parsedCredentials = z
    .object({ nip: z.string().min(1), password: z.string().min(1) })
    .safeParse({
      nip: formData.get("nip"),
      password: formData.get("password"),
    });

  if (parsedCredentials.success) {
    // console.log(parsedCredentials);
    const response = await fetch(`${process.env.API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(parsedCredentials.data),
    });

    if (response.ok) {
      setAuthCookie(response);
      redirect("/dashboard");
    }
    return `Authentication Failed`;
  }

  return `Credentials Wrong`;
}

const setAuthCookie = (response: Response) => {
  const setCookieHeader = response.headers.get("Set-Cookie");

  // console.log("cookie headaer : ", setCookieHeader);

  if (setCookieHeader) {
    const setCookies = setCookieHeader.split(", ");
    const tokenCookies = setCookies.filter((sc, index) => {
      const ck = sc.split("; ");
      if (ck[0].split("=")[0] === "access_token") return true;
    });

    console.log("tokenCookies = ", tokenCookies);
    const token = tokenCookies[0].split("; ")[0].split("=")[1];
    const exp = jwtDecode(token).exp;
    const expDate = new Date(exp! * 1000);

    try {
      cookies().set({
        name: "accessToken",
        value: token,
        expires: expDate,
        httpOnly: true,
      });

      cookies().set({
        name: "group",
        value: "pegawai",
      });
    } catch (e) {
      throw new Error("Failed to set cookie : " + e);
    }
  }
};
