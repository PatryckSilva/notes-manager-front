"use server";
import { ICreateFolderBody, IFolder } from "@/@types/actions/folders";
import { HttpResponse } from "@/@types/httpTypes";
import { apiEndpoints } from "@/config/constants";
import { httpClient } from "@/infra/http-client";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";

export async function createFolder(data: ICreateFolderBody) {
  const heads = await headers();
  const pathname = heads.get("url-x") || "/folder";
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
  revalidatePath("/dashboard");
  return response;
}

export async function deleteFolder(id: string) {
  const heads = await headers();
  const pathname = heads.get("url-x") || "/folder";
  const authCookie = (await cookies()).get("auth_token");

  const requestHeaders = {
    "Content-Type": "application/x-www-form-urlencoded",
    cookie: authCookie?.value || "",
  };

  const url = `${apiEndpoints.folders.deleteFolder}/${id}`;

  const response = await httpClient.request({
    method: "delete",
    url,
    headers: requestHeaders,
  });

  revalidatePath(pathname);
  revalidatePath("/dashboard");
  return response;
}

export async function getFolderById(id: string): Promise<HttpResponse<IFolder>> {
  const authCookie = (await cookies()).get("auth_token");

  const requestHeaders = {
    "Content-Type": "application/x-www-form-urlencoded",
    cookie: authCookie?.value || "",
  };

  const url = `${apiEndpoints.folders.findFolderById}/${id}`;

  const response = await httpClient.request({
    method: "get",
    url,
    headers: requestHeaders,
  });

  return response;
}

export async function getUsersFolders(): Promise<HttpResponse<IFolder[]>> {
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

  return response;
}

export async function updateFolder(id: string, data: ICreateFolderBody) {
  const heads = await headers();
  const pathname = heads.get("url-x") || "/folder";
  const authCookie = (await cookies()).get("auth_token");

  const requestHeaders = {
    "Content-Type": "application/x-www-form-urlencoded",
    cookie: authCookie?.value || "",
  };

  const url = `${apiEndpoints.folders.updateFolder}/${id}`;

  const response = await httpClient.request({
    method: "patch",
    url,
    body: data,
    headers: requestHeaders,
  });

  revalidatePath(pathname);
  revalidatePath("/dashboard");
  return response;
}
