import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import axiosInstance from './lib/axios';
import { jwtDecode } from 'jwt-decode';
import { IUser } from './store/authStore';

const protectedRoutes = ['/dashboard', '/order', '/account', '/checkout'];

export default async function proxy(req: NextRequest) {
  try {
    const isProtectedRoutes = protectedRoutes.some((path) =>
      req.nextUrl.pathname.startsWith(path),
    );

    const token = (await cookies()).get('access_token')?.value || '';

    if (isProtectedRoutes && !token) {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    const user: IUser = jwtDecode(token);

    if (
      user.role === 'customer' &&
      req.nextUrl.pathname.startsWith('/dashboard')
    ) {
      return NextResponse.redirect(new URL('/cart', req.nextUrl));
    }

    if (user.role !== 'customer' && req.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/account/:path*',
    '/checkout/:path*',
    '/account/:path*',
    '/order/:path*',
  ],
};
