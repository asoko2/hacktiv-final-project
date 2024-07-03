"use server";

import { Submission, SubmissionItem } from "@/lib/definition";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export type storeSubmissionState = {
  errors?: {
    year?: string[];
    name?: string[];
    items?: {}[];
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
  year: z.coerce.string().min(1, {
    message: "Tahun harus dipilih",
  }),
  items: z.array(
    z.object({
      itemName: z.string().min(1, {
        message: "Nama barang harus diisi",
      }),
      price: z.coerce.number().min(1, {
        message: "Harga barang harus diisi",
      }),
      qty: z.coerce.number().min(1, {
        message: "Jumlah barang harus diisi",
      }),
      total: z.coerce.number(),
    })
  ),
});

const AddSubmission = formSchema.omit({ id: true });

export async function storeSubmission(
  submissionItem: SubmissionItem[],
  prevState: storeSubmissionState,
  formData: FormData
) {
  const validatedFields = AddSubmission.safeParse({
    name: formData.get("name"),
    year: formData.get("year"),
    items: submissionItem,
  });

  // console.log("validatedFields", validatedFields.error);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.errors,
      message: null,
    };
  }

  const { name, year, items } = validatedFields.data;

  const token = cookies().get("accessToken")?.value;

  const response = await fetch(`${process.env.API_URL}/submissions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      year,
      submissionItems: items,
    }),
  });

  const responseJson = await response.json();

  // console.log("responseJson", responseJson);

  if (!response.ok) {
    return {
      errors: responseJson.errors,
      message: responseJson.message,
    };
  }

  redirect("/dashboard/submissions");
}

export type updateSubmissionState = {
  errors?: {
    name?: string[];
    year?: string[];
  };
  message?: string | null;
};

const updateSubmissionSchema = z.object({
  name: z.coerce
    .string({
      required_error: "Nama harus diisi",
    })
    .min(1, {
      message: "Nama harus diisi",
    }),
  year: z.coerce.string().min(1, {
    message: "Tahun harus dipilih",
  }),
});

export async function updateSubmission(
  prevState: updateSubmissionState,
  formData: FormData
) {
  const validatedFields = updateSubmissionSchema.safeParse({
    name: formData.get("name"),
    year: formData.get("year"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Data tidak valid",
    };
  }

  const { name, year } = validatedFields.data;

  const token = cookies().get("accessToken")?.value;

  const response = await fetch(
    `${process.env.API_URL}/submissions/${formData.get("id")}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, year }),
    }
  );

  const responseJson = await response.json();

  console.log("responseJson", responseJson);

  if (!response.ok) {
    return {
      errors: responseJson.errors,
      message: responseJson.message,
    };
  }

  revalidatePath("/dashboard/submissions");
  return {
    errors: {},
    message: "Data berhasil diupdate",
  };
}

export async function getSubmissionByUserId(): Promise<Submission[]> {
  const token = cookies().get("accessToken");

  const response = await fetch(`${process.env.API_URL}/auth/submissions`, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  const responseJson = await response.json();

  return await responseJson.data;
}

export type DeleteSubmissionState = {
  errors?: {
    message?: string;
  };
  message?: string;
};

export async function deleteSubmission(
  prevState: DeleteSubmissionState,
  formdata: FormData
) {
  const token = cookies().get("accessToken")?.value;

  const response = await fetch(
    `${process.env.API_URL}/submissions/${formdata.get("id")}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    return {
      errors: {
        message: "Gagal menghapus submission",
      },
      message: "",
    };
  }

  revalidatePath("/dashboard/submissions");
  return {
    errors: {
      message: "",
    },
    message: "Berhasil menghapus submission",
  };
}
