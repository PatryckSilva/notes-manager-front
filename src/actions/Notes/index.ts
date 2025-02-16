"use server";

import { INote, TCreateNoteBody, TUpdateNoteBody } from "@/@types/actions/notes";
import { HttpResponse } from "@/@types/httpTypes";
import { apiEndpoints } from "@/config/constants";
import { httpClient } from "@/infra/http-client";
import { cookies } from "next/headers";

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

  return response;
}

export async function getAllUserNotes(): Promise<HttpResponse<{ message: string } | INote[]>> {
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

  return response;
}

export async function getNoteById(id: string): Promise<HttpResponse<INote>> {
  const authCookie = (await cookies()).get("auth_token");

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    cookie: authCookie?.value || "",
  };

  const url = `${apiEndpoints.notes.findNoteById}/${id}`;

  const response = await httpClient.request({
    method: "get",
    url,
    headers,
  });

  return response;
}

export async function updateNote(id: string, data: TUpdateNoteBody) {
  const authCookie = (await cookies()).get("auth_token");

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    cookie: authCookie?.value || "",
  };

  const url = `${apiEndpoints.notes.updateNote}/${id}`;

  const response = await httpClient.request({
    method: "patch",
    url,
    body: data,
    headers,
  });

  return response;
}
