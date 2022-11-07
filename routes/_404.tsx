import { UnknownPageProps } from "$fresh/server.ts";

export default function NotFoundPage({ url }: UnknownPageProps) {
  return <div class="m-5"><p>404 - Route not found: {url.pathname}</p></div>;
}