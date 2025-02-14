"use server";

import { apiEndpoints } from "@/config/constants";
import { cookies } from "next/headers";

type TCreateUserBody = {
  email: string;
  password: string;
  name: string;
};

export const registerUser = async (data: TCreateUserBody) => {
  const body = data;

  const response = await fetch(apiEndpoints.user.register, {
    body: JSON.stringify(body),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const login = async (data: Omit<TCreateUserBody, "name">) => {
  const body = data;

  const response = await fetch(apiEndpoints.user.login, {
    body: JSON.stringify(body),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const getUserByEmail = async () => {
  const authCookie = (await cookies()).get("auth_token");

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    cookie: authCookie?.value || "",
  };

  const response = await fetch(`${apiEndpoints.user.userByEmail}`, { headers });

  return response;
};
