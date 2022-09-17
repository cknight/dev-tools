import { useRef } from "preact/hooks";
import { DEFAULT_NAME, FORMATTER, ENCODER_DECODER, PASSWORD_GENERATOR, TEXT_DIFF } from "../util/menuItems.ts";

interface SelectorProps {
  name:string;
}

export default function FunctionSelector(props:SelectorProps) {
  const input = useRef(null);
  
  function changePage() {
    //@ts-ignore - value DOES exist on this element
    window.location = input!.current!.value;
  }

  return (
    <div class="flex justify-center">
      <select ref={input} id="tool-selector" onChange={() => changePage()} class="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-medium text-xs sm:text-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:outline-none focus:ring-blue-400 focus:ring-1">
        <option selected={props.name == DEFAULT_NAME} value="/">Please select</option>
        <option selected={props.name == PASSWORD_GENERATOR} value="/password-generator">Password Generator</option>
        <option selected={props.name == ENCODER_DECODER} value="/encoding-decoding">Encode/Decode</option>
        <option selected={props.name == TEXT_DIFF} value="/text-diff">Text Diff</option>
        <option selected={props.name == FORMATTER} value="/format-validate">Format/Validate</option>
      </select>
    </div>
  );
}
