"use server";
import { ICreateFolderBody, IFolder } from "@/@types/actions/folders";
import { HttpResponse } from "@/@types/httpTypes";
import { apiEndpoints } from "@/config/constants";
import { httpClient } from "@/infra/http-client";
import { cookies } from "next/headers";

export async function createFolder(data: ICreateFolderBody) {
  const authCookie = (await cookies()).get("auth_token");

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    cookie: authCookie?.value || "",
  };

  const response = await httpClient.request({
    method: "post",
    url: apiEndpoints.folders.createFolder,
    body: data,
    headers,
  });

  return response;
}

export async function getUsersFolders(): Promise<HttpResponse<IFolder[]>> {
  const authCookie = (await cookies()).get("auth_token");

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    cookie: authCookie?.value || "",
  };

  const response = await httpClient.request({
    method: "get",
    url: apiEndpoints.folders.findFoldersByUser,
    headers,
  });

  return response;
}
