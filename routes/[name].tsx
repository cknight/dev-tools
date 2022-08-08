/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { useEffect, useState } from "preact/hooks";
import { Handlers, PageProps } from "$fresh/server.ts";
import FunctionSelector from "../islands/Selector.tsx";
import PasswordGenerator from "../islands/PasswordGenerator.tsx";
import { BASE64_HELPER, DEFAULT_NAME, JSON_FORMATTER, JWT_HELPER, PASSWORD_GENERATOR, TEXT_DIFF } from "../util/menuItems.ts";


export default function Tool(props: PageProps) {
  let tool:unknown;
  let selectorName = DEFAULT_NAME;

  if (props.params.name === "text-diff") {
    tool = <PasswordGenerator/>;
    selectorName = TEXT_DIFF;
  } else if (props.params.name === "password-generator") {
    tool = <PasswordGenerator/>;
    selectorName = PASSWORD_GENERATOR;
  } else if (props.params.name === "json") {
    tool = <PasswordGenerator/>;
    selectorName = JSON_FORMATTER;
  } else if (props.params.name === "jwt") {
    tool = <PasswordGenerator/>;
    selectorName = JWT_HELPER;
  } else if (props.params.name === "base64") {
    tool = <PasswordGenerator/>;
    selectorName = BASE64_HELPER;
  } 
  
  return (
    <div class={tw`p-4 mx-auto`}>
      <FunctionSelector name={selectorName}/>
      {tool}
    </div>
  );
}
