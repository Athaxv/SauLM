import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
	const token = await getToken({ 
		req: request, 
		secret: process.env.NEXTAUTH_SECRET 
	});

	const { pathname } = request.nextUrl;

	// Public routes that don't require authentication
	const publicRoutes = ['/', '/signin', '/api/auth'];
	const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

	// If user is not authenticated and trying to access protected routes
	if (!token && !isPublicRoute) {
		return NextResponse.redirect(new URL("/signin", request.url));
	}

	// If user is authenticated and trying to access signin page, redirect to dashboard
	if (token && pathname === '/signin') {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

		// Allow authenticated users to visit home ("/") so post-signout redirects land correctly

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
};