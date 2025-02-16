"use server";
import { ICreateFolderBody, IFolder } from "@/@types/actions/folders";
import { HttpResponse } from "@/@types/httpTypes";
import { apiEndpoints } from "@/config/constants";
import { httpClient } from "@/infra/http-client";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";

export async function createFolder(data: ICreateFolderBody) {
  const heads = headers();
  const pathname = heads.get("x-url") || "";

  const authCookie = (await cookies()).get("auth_token");

  const requestHeaders = {
    "Content-Type": "application/x-www-form-urlencoded",
    cookie: authCookie?.value || "",
  };

  const response = await httpClient.request({
    method: "post",
    url: apiEndpoints.folders.createFolder,
    body: data,
    headers: requestHeaders,
  });

  revalidatePath(pathname);
  return response;
}

export async function getUsersFolders(): Promise<HttpResponse<IFolder[]>> {
  const heads = headers();
  const pathname = heads.get("x-url") || "";

  const authCookie = (await cookies()).get("auth_token");

  const requestHeaders = {
    "Content-Type": "application/x-www-form-urlencoded",
    cookie: authCookie?.value || "",
  };

  const response = await httpClient.request({
    method: "get",
    url: apiEndpoints.folders.findFoldersByUser,
    headers: requestHeaders,
  });

  revalidatePath(pathname);
  return response;
}
