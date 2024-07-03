"use server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function getSession() {
  const token = cookies().get("accessToken");
  if (!token) return null;
  const decodeAccessToken = await getProfile();

  return decodeAccessToken;
}

export async function getGroup() {
  const group = cookies().get("group")?.value;
  if (!group) return null;
  return group;
}
export async function getProfile() {
  const response = await fetch(`${process.env.API_URL}/auth/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
    },
  });

  if (response.ok) {
    const responseJson = await response.json();

    return await responseJson.data;
  }
}

export async function saveGroup(group: string) {
  cookies().set({
    name: "group",
    value: group,
    httpOnly: true,
  });
}
