import { NextResponse } from "next/server";

export function middleware(request) {
    if(request.nextUrl.pathname === "/web-stories") {
        return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher:["/web-stories"],
};
