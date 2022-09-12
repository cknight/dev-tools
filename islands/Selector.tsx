import { useRef } from "preact/hooks";
import { DEFAULT_NAME, JSON_FORMATTER, ENCODER_DECODER, PASSWORD_GENERATOR, TEXT_DIFF } from "../util/menuItems.ts";

interface SelectorProps {
  name:string;
}

export default function FunctionSelector(props:SelectorProps) {
  const menuStyle = `text-gray-700 block px-4 py-2 hover:bg-gray-100 text-l`;
  const input = useRef(null);
  
  function changePage() {
    //@ts-ignore - value DOES exist on this element
    window.location = input!.current!.value;
  }

  return (
    <div class="flex justify-center">
      <select ref={input} id="tool-selector" onChange={() => changePage()} class="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-2xl font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
        <option selected={props.name == DEFAULT_NAME} value="/">Please select</option>
        <option selected={props.name == PASSWORD_GENERATOR} value="/password-generator">Password Generator</option>
        <option selected={props.name == ENCODER_DECODER} value="/encoding-decoding">Encoding/Decoding</option>
        <option selected={props.name == TEXT_DIFF} value="/text-diff">Text Diff</option>
        <option selected={props.name == JSON_FORMATTER} value="/json">JSON Formatter/Validator</option>
      </select>
    </div>
  );
}
