import { MiddlewareHandlerContext } from "$fresh/server.ts";

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<unknown>,
) {
  const start = Date.now();
  const resp = await ctx.next();
  const url = req.url;
  if (!url.includes("favicon.ico") 
      && !url.includes("diff_match_patch") 
      && !url.includes(".css") 
      && !url.includes("_frsh") 
      && !url.includes(".txt")) {
    const referrer = req.headers.get("referrer") || 'unknown';
    console.log(`${req.method} ${url} ${resp.status} ${Date.now() - start}ms ${referrer}`);
  }

  return resp;
}