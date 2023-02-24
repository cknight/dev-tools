import { MiddlewareHandlerContext } from "$fresh/server.ts";

const hitCount = new Map<string, number>();

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<unknown>,
) {
  const start = Date.now();
  const resp = await ctx.next();
  const url = req.url;
  hitCount.set(url, (hitCount.get(url) || 0) + 1);

  if (
      //Ignore project specific files
      !url.includes("favicon.ico") 
      && !url.includes("diff_match_patch") 
      && !url.endsWith(".css")
      && !url.includes("_frsh") 
      && !url.endsWith(".js")
      && !url.includes(".txt")
      //Ignore spam 
      && !url.includes(".php") 
      && !url.includes("/php") 
      && !url.includes("/admin") 
      && !url.includes("/user") 
      && !url.includes("/wp") 
      && !url.includes(".ini") 
      && !url.includes("/.env") 
      && !url.includes("/wp-includes/")
      && !url.includes(".git/")
      && !url.includes(".htaccess")
      && !url.includes("sitemap")
      && req.method === "GET"
  ) {
    const referrer = req.headers.get("referer") || 'no-referer';
    const region = Deno.env.get("DENO_REGION") || 'no-region';
    console.log(`${req.method} ${region} ${url} ${resp.status} ${Date.now() - start}ms ${referrer} count: ${hitCount.get(url)}`);
  }

  // Cache /static files for a year (need to rename file to bust cache)
  if (resp.status === 200 && 
      (req.url.includes("word-list.txt") 
       || req.url.includes("favicon.ico")
       || req.url.endsWith(".js"))) {
    resp.headers.set("Cache-Control", "max-age=31536000");
  }

  return resp;
}