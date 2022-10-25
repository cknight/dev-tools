import { useRef } from "preact/hooks";
import { PageProps } from "$fresh/server.ts";
import FunctionSelector from "../islands/Selector.tsx";
import PasswordGenerator from "../islands/PasswordGenerator.tsx";
import { DEFAULT_NAME, ENCODER_DECODER, FORMATTER, PASSWORD_GENERATOR, TEXT_DIFF } from "../util/menuItems.ts";
import EncoderDecoder from "../islands/EncoderDecoder.tsx";
import TextDiff from "../islands/TextDiff.tsx";
import { Fragment } from "preact/jsx-runtime";
import { Head } from "$fresh/runtime.ts";
import FormatValidate2 from "../islands/FormatValidate2.tsx";
import Menu from "../islands/Menu.tsx";


export default function Tool(props: PageProps) {
  let tool:unknown;
  let selectorName = DEFAULT_NAME;
  let title = "";

  if (props.params.tool === "text-diff") {
    tool = <TextDiff/>;
    selectorName = TEXT_DIFF;
    title = "- Text Diff"
  } else if (props.params.tool === "password-generator") {
    tool = <PasswordGenerator/>;
    selectorName = PASSWORD_GENERATOR;
    title = "- Generate Password"
  } else if (props.params.tool === "format-validate") {
    tool = <FormatValidate2/>;
    selectorName = FORMATTER;
    title = "- Format/Validate"
  } else if (props.params.tool === "encoding-decoding") {
    tool = <EncoderDecoder/>;
    selectorName = ENCODER_DECODER;
    title = "- Encode/Decode"
  } else {
    console.log('No tool selected')
  }
  

  return (
    <Fragment>
      <Head>
        <style>{`html, body {height: 100%}`}</style>
      </Head>
      <div class="p-4 mx-auto flex flex-col h-full">
        <Menu title={title}/>

        {tool}
      </div>
    </Fragment>
  );
}
