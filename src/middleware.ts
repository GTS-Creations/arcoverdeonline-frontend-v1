import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("nextauth.token")?.value;

  const protectedRoutes = [
    "/allcategory",
    "/createcategory",
    "/editcategory/",
    "/allsubcategory",
    "/createsubcategory",
    "/editsubcategory/",
    "/allpost",
    "/createpost",
    "/editpost/",
    "/allsponsor",
    "/createsponsor",
    "/editsponsor/",
    "/edituser/",
    "/userid/",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (request.nextUrl.pathname === "/login" && token) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  // Verificar rotas protegidas
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
