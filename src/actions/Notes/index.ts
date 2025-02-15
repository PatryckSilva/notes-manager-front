"use server";

import { apiEndpoints } from "@/config/constants";
import { httpClient } from "@/infra/http-client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export interface TCreateNoteBody {
  title: string;
  content: string;
}

export async function createNote(data: TCreateNoteBody) {
  const authCookie = (await cookies()).get("auth_token");

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    cookie: authCookie?.value || "",
  };

  const response = await httpClient.request({
    method: "post",
    url: apiEndpoints.notes.createNote,
    body: data,
    headers,
  });

  console.log(`response`, response.body);
}

export async function getAllUserNotes() {
  const authCookie = (await cookies()).get("auth_token");

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    cookie: authCookie?.value || "",
  };

  const response = await httpClient.request({
    method: "get",
    url: apiEndpoints.notes.findNotesByUser,
    headers,
  });

  console.log(`response`, response.body);
}
