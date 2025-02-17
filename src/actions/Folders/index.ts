"use server";
import { ICreateFolderBody, IFolder } from "@/@types/actions/folders";
import { HttpResponse } from "@/@types/httpTypes";
import { apiEndpoints } from "@/config/constants";
import { httpClient } from "@/infra/http-client";
import { cookies } from "next/headers";

export async function createFolder(data: ICreateFolderBody) {
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

  return response;
}

export async function deleteFolder(id: string) {
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

  return response;
}

export async function getFolderById(
  id: string,
): Promise<HttpResponse<IFolder>> {
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
  console.log(`response`, response);
  return response;
}

export async function updateFolder(id: string, data: ICreateFolderBody) {
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

  return response;
}
