"use server";

import { TCreateUserBody, TLoginUserBody } from "@/@types/actions/user";
import { apiEndpoints } from "@/config/constants";
import { httpClient } from "@/infra/http-client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

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
  const userCookies = await cookies();

  const response = await httpClient.request({
    method: "post",
    url: apiEndpoints.user.login,
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  });

  userCookies.set("auth_token", response.body.token, {
    httpOnly: true,
    maxAge: 3600000,
    sameSite: "none",
    secure: true,
    expires: new Date(Date.now() + 3600000),
  });

  return {
    status: response.statusCode,
    body: response.body,
    ok: response.ok,
  };
};

export const getUserByEmail = async (data: any) => {
  const authCookie = (await cookies()).get("auth_token");

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
