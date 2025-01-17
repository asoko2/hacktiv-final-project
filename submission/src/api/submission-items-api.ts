"use server";

import { Submission, SubmissionItem } from "@/lib/definition";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

export async function getSubmissionItems(
  id: string
): Promise<{ submission: Submission; items: SubmissionItem[] }> {
  const token = cookies().get("accessToken");

  const response = await fetch(
    `${process.env.API_URL}/submissions/${id}/items`,
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );

  const responseJson = await response.json();

  return await responseJson.data;
}

export type addSubmissionItemState = {
  errors?: {
    itemName?: string[];
    price?: string[];
    qty?: string[];
  };
  message?: string | null;
};

const addSubmissionItemSchema = z.object({
  itemName: z
    .string()
    .min(3, {
      message: "Nama barang minimal 3 karakter",
    })
    .max(255),
  price: z.coerce.number().min(1, {
    message: "Harga harus diisi",
  }),
  qty: z.coerce.number().min(1, {
    message: "Jumlah barang harus diisi",
  }),
});

export async function addSubmissionItem(
  prevState: addSubmissionItemState,
  formdata: FormData
) {
  const validatedFields = addSubmissionItemSchema.safeParse({
    itemName: formdata.get("itemName"),
    price: formdata.get("price"),
    qty: formdata.get("qty"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Data tidak valid",
    };
  }

  const { itemName, price, qty } = validatedFields.data;

  const total = price * qty;

  const token = cookies().get("accessToken")?.value;

  const response = await fetch(`${process.env.API_URL}/submission-items/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      submission_id: formdata.get("submissionId"),
      name: itemName,
      price,
      qty,
      total_price: total,
    }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    return {
      errors: responseJson.errors,
      message: responseJson.message,
    };
  }

  revalidatePath("/dashboard/submissions/[id]");
  return {
    errors: {},
    message: "Data item berhasil ditambahkan",
  };
}

export type updateSubmissionState = {
  errors?: {
    itemName?: string[];
    price?: string[];
    qty?: string[];
  };
  message?: string | null;
};

const updateSubmissionItemSchema = z.object({
  itemName: z
    .string()
    .min(3, {
      message: "Nama barang minimal 3 karakter",
    })
    .max(255),
  price: z.coerce.number().min(1, {
    message: "Harga harus diisi",
  }),
  qty: z.coerce.number().min(1, {
    message: "Jumlah barang harus diisi",
  }),
});

export async function updateSubmissionItem(
  prevState: updateSubmissionState,
  formdata: FormData
) {
  const validatedFields = updateSubmissionItemSchema.safeParse({
    itemName: formdata.get("itemName"),
    price: formdata.get("price"),
    qty: formdata.get("qty"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      messaage: "Data tidak valid",
    };
  }

  const { itemName, price, qty } = validatedFields.data;

  const total = price * qty;

  const token = cookies().get("accessToken")?.value;

  const response = await fetch(
    `${process.env.API_URL}/submission-items/${formdata.get("id")}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: itemName, price, qty, total_price: total }),
    }
  );

  const responseJson = await response.json();

  console.log("responseJSON", responseJson);

  if (!response.ok) {
    return {
      errors: responseJson.errors,
      message: responseJson.message,
    };
  }

  revalidatePath("/dashboard/submissions/[id]");
  return {
    errors: {},
    message: "Data item berhasil diperbarui",
  };
}

export type DeleteSubmissionItemState = {
  errors?: {
    message?: string;
  };
  message?: string;
};

export async function deleteSubmissionItem(
  prevState: DeleteSubmissionItemState,
  formdata: FormData
) {
  const token = cookies().get("accessToken")?.value;

  const response = await fetch(
    `${process.env.API_URL}/submission-items/${formdata.get("id")}`,
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
        message: "Gagal menghapus submission item",
      },
      message: "",
    };
  }

  revalidatePath("/dashboard/submissions/[id]");
  return {
    errors: {
      message: "",
    },
    message: "Berhasil menghapus submission item",
  };
}
