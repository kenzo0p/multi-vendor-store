import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
            Match all paths except for:
            /api routes
            /next (next.js internals)
            /_static (inside/public)
            all root files inside /public (e.g./favicon.ico)
            ""
        */
    "/((?!api/|_next/|_static/|_vercel|media/|[w-]+.w+).*)",
  ],
};


export default async function middleware(req  : NextRequest){
    const url = req.nextUrl;
    //extract the host name e.g , "om.neurogum.com or om.localhost:3000"
    const hostName = req.headers.get("host") || ""; 
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "";

    if(hostName.endsWith(`.${rootDomain}`)){
        const tenantSlug = hostName.replace(`.${rootDomain}` , "");
        return NextResponse.rewrite(new URL(`/tenants/${tenantSlug}${url.pathname}` ,req.url));
    }

    return NextResponse.next();
}