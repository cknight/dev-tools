import { PageProps } from "$fresh/server.ts";
import { Fragment, jsx } from "preact/jsx-runtime";
import { Head } from "$fresh/runtime.ts";
import Menu from "../islands/Menu.tsx";
import { Handlers } from "$fresh/server.ts";
import { baseStyles,background,primaryText } from "../util/styles.ts";
import { toolRegistry } from "../util/toolRegistry.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    if (toolRegistry.get(ctx.params.tool) === undefined) {
      return await ctx.renderNotFound();
    }
    return await ctx.render();
  },
};

export default function Tool(props: PageProps) {
  const toolEntry = toolRegistry.get(props.params.tool)!;

  return (
    <Fragment>
      <Head>
        <title>{toolEntry.pageTitle}</title>
        <meta name="description" content={toolEntry.metaDescription}/>
        <style>{baseStyles}</style>
      </Head>
      <div class={background + " w-full h-full " + primaryText}>
        <div class="p-4 mx-auto flex flex-col h-full">
          <Menu title={toolEntry.displayName} page={props.params.tool}/>
          {jsx(toolEntry.island, {})}
        </div>
      </div>
    </Fragment>
  );
}
