import { PageProps } from "$fresh/server.ts";
import PasswordGenerator from "../islands/PasswordGenerator.tsx";
import { ENCODER_DECODER, FORMATTER, PASSWORD_GENERATOR, TEXT_DIFF } from "../util/menuItems.ts";
import EncoderDecoder from "../islands/EncoderDecoder.tsx";
import TextDiff from "../islands/TextDiff.tsx";
import { Fragment } from "preact/jsx-runtime";
import { Head } from "$fresh/runtime.ts";
import FormatValidate2 from "../islands/FormatValidate.tsx";
import Menu from "../islands/Menu.tsx";
import { Handlers } from "$fresh/server.ts";
import { baseStyles,background,primaryText } from "../util/styles.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    try {
      const resp = await ctx.render();
      return resp;
    } catch (e) {
      if (e.code === "404") {
        return ctx.renderNotFound();
      }
      throw e;
    }
  },
};

export default function Tool(props: PageProps) {
  let tool:unknown;
  let pageName = "";
  let title = "";

  if (props.params.tool === "text-diff") {
    tool = <TextDiff/>;
    pageName = TEXT_DIFF;
    title = "- Text Diff"
  } else if (props.params.tool === "password-generator") {
    tool = <PasswordGenerator/>;
    pageName = PASSWORD_GENERATOR;
    title = "- Generate Password"
  } else if (props.params.tool === "format-validate") {
    tool = <FormatValidate2/>;
    pageName = FORMATTER;
    title = "- Format/Validate"
  } else if (props.params.tool === "encoding-decoding") {
    tool = <EncoderDecoder/>;
    pageName = ENCODER_DECODER;
    title = "- Encode/Decode"
  } else {
    console.log('No tool selected')
    const toolNotFound = new Error("Tool not found");
    //@ts-ignore - this is a custom error code
    toolNotFound.code = "404";
    throw toolNotFound;
  }
  

  return (
    <Fragment>
      <Head>
        <style>{baseStyles}</style>
      </Head>
      <div class={background + " w-full h-full " + primaryText}>
        <div class="p-4 mx-auto flex flex-col h-full">
          <Menu title={title} page={pageName}/>

          {tool}
        </div>
      </div>
    </Fragment>
  );
}
