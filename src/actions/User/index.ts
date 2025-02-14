"use server";

import { TCreateUserBody, TLoginUserBody } from "@/@types/actions/user";
import { apiEndpoints } from "@/config/constants";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const registerUser = async (data: TCreateUserBody) => {
  const body = data;

  const response = await fetch(apiEndpoints.user.register, {
    body: JSON.stringify(body),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseBody = await response.json();

  revalidatePath("/register");
  return { status: response.status, body: responseBody, ok: response.ok };
};

export const login = async ({ data }: { data: TLoginUserBody }) => {
  const body = JSON.stringify(data);

  const response = await fetch(apiEndpoints.user.login, {
    body: body,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const responseBody = await response.json();

  return { status: response.status, body: responseBody, ok: response.ok };
};

export const getUserByEmail = async () => {
  const authCookie = (await cookies()).get("auth_token");

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    cookie: authCookie?.value || "",
  };

  const response = await fetch(`${apiEndpoints.user.userByEmail}`, { headers });

  const responseBody = await response.json();

  return { status: response.status, body: responseBody, ok: response.ok };
};
