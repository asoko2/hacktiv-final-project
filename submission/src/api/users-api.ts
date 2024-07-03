"use server";

import {
  User,
  UserWithGroups,
  UserWithGroupsCollection,
} from "@/lib/definition";
import { error } from "console";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export type State = {
  errors?: {
    name?: string[];
    nip?: string[];
    username?: string[];
    email?: string[];
  };
  message?: string | null;
};

const formSchema = z.object({
  id: z.string(),
  name: z.coerce
    .string({
      required_error: "Nama harus diisi",
    })
    .min(1, {
      message: "Nama harus diisi",
    }),
  nip: z.coerce
    .number({
      invalid_type_error: "NIP harus diisi angka",
    })
    .min(1, {
      message: "NIP harus diisi",
    }),
  username: z.coerce.string().min(1, {
    message: "Username harus diisi",
  }),
  email: z
    .string({
      required_error: "Email harus diisi",
    })
    .email({
      message: "Email tidak valid",
    }),
});

const AddUser = formSchema.omit({ id: true });
const EditUser = formSchema.omit({ id: true });

export async function addUser(prevState: State, formData: FormData) {
  const validatedFields = AddUser.safeParse({
    name: formData.get("name"),
    nip: formData.get("nip"),
    username: formData.get("username"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Data tidak valid",
    };
  }

  const { name, nip, username, email } = validatedFields.data;

  const token = cookies().get("accessToken")?.value;

  const response = await fetch(`${process.env.API_URL}/users`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, nip, username, email }),
  });
  const responseJson = await response.json();

  if (!response.ok) {
    return {
      errors: responseJson.errors,
      message: responseJson.message,
    };
  }

  redirect("/dashboard/users");
}

export async function getUserById(id: string): Promise<User> {
  const token = cookies().get("accessToken");

  const response = await fetch(`${process.env.API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const responseJson = await response.json();

  return responseJson.data;
}

export async function editUser(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = EditUser.safeParse({
    name: formData.get("name"),
    nip: formData.get("nip"),
    username: formData.get("username"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Data tidak valid",
    };
  }

  const { name, nip, username, email } = validatedFields.data;

  const token = cookies().get("accessToken")?.value;

  const response = await fetch(`${process.env.API_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, nip, username, email }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    return {
      errors: responseJson.errors,
      message: responseJson.message,
    };
  }

  redirect("/dashboard/users");
}

export async function getAllUsers(): Promise<User[]> {
  const token = cookies().get("accessToken");

  const response = await fetch(`${process.env.API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const responseJson = await response.json();

  return responseJson.data;
}

export async function getUsersWithGroup(): Promise<UserWithGroups[]> {
  const token = cookies().get("accessToken");

  const response = await fetch(`${process.env.API_URL}/users/groups`, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
    next: {
      tags: [UserWithGroupsCollection],
      revalidate: 0,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const responseJson = await response.json();

  return responseJson.data;
}

export type syncGroupState = {
  errors?: {
    groups?: string[];
  };
  message?: string | null;
};

const syncGroupSchema = z.object({
  id: z.string(),
  groups: z.array(z.string()).refine((value) => value.some((v) => v), {
    message: "Hak akses harus diisi",
  }),
});

const syncGroup = syncGroupSchema.omit({ id: true });

export async function syncGroups(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = syncGroup.safeParse({
    id,
    groups: formData.getAll("groups"),
  });

  const token = cookies().get("accessToken")?.value;

  let validatedData = validatedFields.data!;

  if (validatedData === undefined) {
    validatedData = {
      groups: ["pegawai"],
    };
  } else {
    validatedData.groups = [...validatedData.groups, "pegawai"];
  }

  const { groups } = validatedData;

  const response = await fetch(
    `${process.env.API_URL}/users/${id}/sync-group`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ groups }),
    }
  );

  const responseJson = await response.json();

  if (!response.ok) {
    return {
      errors: responseJson.errors,
      message: responseJson.message,
    };
  }

  revalidateTag(UserWithGroupsCollection);
  return {
    errors: null,
    message: "Berhasil menyimpan hak akses",
  };
}

export type DeleteUserState = {
  errors?: {
    message?: string;
  };
  message?: string;
};

export async function deleteUser(id: string, prevState: DeleteUserState) {
  const token = cookies().get("accessToken")?.value;

  const response = await fetch(`${process.env.API_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return {
      errors: {
        message: "Gagal menghapus user",
      },
      message: "",
    };
  }

  revalidatePath("/dashboard/users");
  return {
    errors: {
      message: "",
    },
    message: "Berhasil menghapus user",
  };
}
