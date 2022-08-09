/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { useRef, useState } from "preact/hooks";
import { DEFAULT_NAME, JSON_FORMATTER, ENCODER_DECODER, PASSWORD_GENERATOR, TEXT_DIFF } from "../util/menuItems.ts";

interface SelectorProps {
  name:string;
}

export default function FunctionSelector(props:SelectorProps) {
  const menuStyle = tw`text-gray-700 block px-4 py-2 hover:bg-gray-100 text-l`;
  const input = useRef(null);
  
  return (
    <div class={tw`flex justify-center`}>
      <select ref={input} id="tool-selector" onChange={() => {window.location=input!.current!.value}} class="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-2xl font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 bg-[url(`data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E`)]">
        <option selected={props.name == DEFAULT_NAME} value="/">Please select</option>
        <option selected={props.name == PASSWORD_GENERATOR} value="/password-generator">Password Generator</option>
        <option selected={props.name == ENCODER_DECODER} value="/encoding-decoding">Encoding/Decoding</option>
        <option selected={props.name == TEXT_DIFF} value="/text-diff">Text Diff</option>
        <option selected={props.name == JSON_FORMATTER} value="/json">JSON Formatter/Validator</option>
      </select>
    </div>
  );
}
