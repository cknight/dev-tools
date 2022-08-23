/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { useEffect, useState } from "preact/hooks";
import { Handlers, PageProps } from "$fresh/server.ts";
import FunctionSelector from "../islands/Selector.tsx";
import PasswordGenerator from "../islands/PasswordGenerator.tsx";
import { DEFAULT_NAME, ENCODER_DECODER, JSON_FORMATTER, PASSWORD_GENERATOR, TEXT_DIFF } from "../util/menuItems.ts";
import EncoderDecoder from "../islands/EncoderDecoder.tsx";
import TextDiff from "../islands/TextDiff.tsx";


export default function Tool(props: PageProps) {
  let tool:unknown;
  let selectorName = DEFAULT_NAME;

  if (props.params.tool === "text-diff") {
    tool = <TextDiff/>;
    selectorName = TEXT_DIFF;
  } else if (props.params.tool === "password-generator") {
    tool = <PasswordGenerator/>;
    selectorName = PASSWORD_GENERATOR;
  } else if (props.params.tool === "json") {
    tool = <PasswordGenerator/>;
    selectorName = JSON_FORMATTER;
  } else if (props.params.tool === "encoding-decoding") {
    tool = <EncoderDecoder/>;
    selectorName = ENCODER_DECODER;
  } else {
    console.log('No tool selected')
  }
  
  return (
    <div class={tw`p-4 mx-auto`}>
      <FunctionSelector name={selectorName}/>
      {tool}
    </div>
  );
}
