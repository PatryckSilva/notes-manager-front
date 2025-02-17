import { cookies } from "next/headers";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

import { IUserPublicInfo } from "./@types/actions/user";

const publicRoutes = [
  { path: "/login", whenAuthenticated: "redirect" },
  { path: "/register", whenAuthenticated: "redirect" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/login";
const REDIRECT_WHEN_DEFAULT_PATH = "/dashboard";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("auth_token");
  const userInfosCookie = cookieStore.get("user_infos");
  const userInfos: IUserPublicInfo | undefined = userInfosCookie?.value
    ? JSON.parse(userInfosCookie.value)
    : undefined;

  const authToken = tokenCookie?.value;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  if (pathname === "/") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_DEFAULT_PATH;
    return NextResponse.redirect(redirectUrl);
  }

  const publicRoute = publicRoutes.find(route => route.path === pathname);

  if (publicRoute) {
    if (!authToken)
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

    if (authToken && publicRoute.whenAuthenticated === "redirect") {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/";
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (!authToken) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  if (!userInfos) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config: MiddlewareConfig = {
  matcher: [
    // Aplica o middleware para todas as rotas, exceto as rotas estáticas, API, etc.
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
