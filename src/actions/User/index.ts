"use server";

import { TCreateUserBody, TLoginUserBody } from "@/@types/actions/user";
import { apiEndpoints } from "@/config/constants";
import { httpClient } from "@/infra/http-client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const registerUser = async (data: TCreateUserBody) => {
  const response = await httpClient.request({
    method: "post",
    url: apiEndpoints.user.register,
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  });

  revalidatePath("/register");
  return { status: response.statusCode, body: response.body, ok: response.ok };
};

export const login = async ({ data }: { data: TLoginUserBody }) => {
  const cookieStore = await cookies();

  const response = await httpClient.request({
    method: "post",
    url: apiEndpoints.user.login,
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const userInfosResponse = await httpClient.request({
    method: "get",
    url: apiEndpoints.user.userByEmail,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      cookie: response.body.token || "",
    },
  });

  const userInfos = {
    userId: userInfosResponse.body.id,
    email: userInfosResponse.body.email,
    name: userInfosResponse.body.name,
  };

  cookieStore.set("user_infos", JSON.stringify(userInfos), {
    httpOnly: false,
    maxAge: 3600000,
    sameSite: "none",
    secure: true,
    expires: new Date(Date.now() + 3600000),
  });

  cookieStore.set("auth_token", response.body.token, {
    httpOnly: true,
    maxAge: 3600000,
    sameSite: "none",
    secure: true,
    expires: new Date(Date.now() + 3600000),
  });

  if (response.ok && userInfosResponse.ok) {
    redirect("/dashboard");
  }
};

export const getUserByEmail = async () => {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("auth_token");

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    cookie: authCookie?.value || "",
  };

  const response = await httpClient.request({
    method: "get",
    url: apiEndpoints.user.userByEmail,
    headers,
  });

  return { status: response.statusCode, body: response.body, ok: response.ok };
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  cookieStore.delete("user_infos");

  redirect("/login");
};
