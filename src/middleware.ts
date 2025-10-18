import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { IS_LAUNCHED } from './config/launch';

export function middleware(request: NextRequest) {
    // If the app is launched, let all requests pass through
    if (IS_LAUNCHED) {
        return NextResponse.next();
    }

    // If not launched, redirect all routes to the home page (which shows coming soon)
    const { pathname } = request.nextUrl;

    // Allow static files and API routes to pass through
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/favicon.ico') ||
        pathname.startsWith('/assets') ||
        pathname.startsWith('/videos') ||
        pathname.startsWith('/file.svg') ||
        pathname.startsWith('/globe.svg') ||
        pathname.startsWith('/next.svg') ||
        pathname.startsWith('/vercel.svg') ||
        pathname.startsWith('/window.svg')
    ) {
        return NextResponse.next();
    }

    // Redirect all other routes to home (which will show coming soon)
    if (pathname !== '/') {
        return NextResponse.redirect(new URL('/', request.url));
    }

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
