// // src/middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { authOptions } from './app/api/auth/[...nextauth]/route';
// import { getToken } from 'next-auth/jwt';

// const protectedRoutes = ['/profile', '/articles'];
// const adminRoutes = ['/admin'];

// export async function middleware(request: NextRequest) {
//   // const token = await getToken({ req: request, secret: authOptions.secret });
//   const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

//   // Check if route is protected
//   const isProtectedRoute = protectedRoutes.some((route) =>
//     request.nextUrl.pathname.startsWith(route)
//   );

//   // Check if route is admin-only
//   const isAdminRoute = adminRoutes.some((route) =>
//     request.nextUrl.pathname.startsWith(route)
//   );

//   // Redirect to login if trying to access protected route without auth
//   if (isProtectedRoute && !token) {
//     const absoluteURL = new URL('/login', request.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }

//   // Redirect to home if trying to access admin route without admin role
//   if (isAdminRoute && token?.role !== 'ADMIN') {
//     const absoluteURL = new URL('/', request.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }

//   return NextResponse.next();
// }

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const protectedRoutes = ['/profile', '/articles'];
const adminRoutes = ['/admin'];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  const isAdminRoute = adminRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAdminRoute && token?.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
