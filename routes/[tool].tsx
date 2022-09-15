import { PageProps } from "$fresh/server.ts";
import FunctionSelector from "../islands/Selector.tsx";
import PasswordGenerator from "../islands/PasswordGenerator.tsx";
import { DEFAULT_NAME, ENCODER_DECODER, FORMATTER, PASSWORD_GENERATOR, TEXT_DIFF } from "../util/menuItems.ts";
import EncoderDecoder from "../islands/EncoderDecoder.tsx";
import TextDiff from "../islands/TextDiff.tsx";
import { Fragment } from "preact/jsx-runtime";
import { Head } from "$fresh/runtime.ts";


export default function Tool(props: PageProps) {
  let tool:unknown;
  let selectorName = DEFAULT_NAME;
  let title = "Developer tools";
  
  if (props.params.tool === "text-diff") {
    tool = <TextDiff/>;
    selectorName = TEXT_DIFF;
    title = "Compare text"
  } else if (props.params.tool === "password-generator") {
    tool = <PasswordGenerator/>;
    selectorName = PASSWORD_GENERATOR;
    title = "Generate strong, easy to use, passwords"
  } else if (props.params.tool === "format") {
    tool = <PasswordGenerator/>;
    selectorName = FORMATTER;
    title = "Format text or code"
  } else if (props.params.tool === "encoding-decoding") {
    tool = <EncoderDecoder/>;
    selectorName = ENCODER_DECODER;
    title = "Encode or decode text"
  } else {
    console.log('No tool selected')
  }
  
  return (
    <Fragment>
      <Head>
        <title>${title}</title>
      </Head>
      <div class="p-4 mx-auto">
        <FunctionSelector name={selectorName}/>
        {tool}
      </div>
    </Fragment>
  );
}
