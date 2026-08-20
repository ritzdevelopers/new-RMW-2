import { NextResponse } from "next/server";

const redirectToHome = new Set([
    "/web-stories",
    "/services/eon-fairfox",
    "/services/exotica",
    "/services/ghd",
    "/services/gulshan",
    "/services/lumora",
    "/services/mansha-group",
    "/services/sanskar",
    "/services/splendor-onyx",
    "/services/vedvan",
    "/services/vvip-madhuban",
    "/rdx-digital-marketing-course",
]);

export function middleware(request) {
    const { pathname } = request.nextUrl;

    if (redirectToHome.has(pathname)) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    if (pathname === "/blogs") {
        return NextResponse.redirect(new URL("/blog", request.url));
    }
    if (pathname === "/work.html") {
        return NextResponse.redirect(new URL("/case-study", request.url));
    }
    if (pathname === "/services/contents-marketing") {
        return NextResponse.redirect(new URL("/services/content-marketing", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/web-stories",
        "/blogs",
        "/work.html",
        "/services/eon-fairfox",
        "/services/exotica",
        "/services/ghd",
        "/services/gulshan",
        "/services/lumora",
        "/services/mansha-group",
        "/services/sanskar",
        "/services/splendor-onyx",
        "/services/vedvan",
        "/services/vvip-madhuban",
        "/rdx-digital-marketing-course",
        "/services/contents-marketing"
    ],
};
