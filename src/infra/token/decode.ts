import { jwtDecode } from "jwt-decode";

export const decodeJWT = (token: string) => {
  const decoded = jwtDecode(token);

  const isTokenExpired = decoded?.exp && Date.now() >= decoded.exp * 1000;

  return isTokenExpired;
};
