/** @jsx h */
import { h } from "preact";
import { apply, tw } from "@twind";
import { Handlers, PageProps } from "https://deno.land/x/fresh@1.0.0/server.ts";
import { useRef, useState } from "preact/hooks";
import { registry } from "../util/encoderRegistry.ts";
import { EncoderRegistryEntry } from "../types.ts";

export default function EncoderDecoder() {
  const labelStyle = apply`block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400`;
  const inputRef = useRef(null);
  const encodingTypeRef = useRef(null);
  const [output, setOutput] = useState("");
  const [typeConfig, setTypeConfig] = useState<EncoderRegistryEntry>(registry.get("default")!);

  function processInput() {
    const input = inputRef?.current?.value;
    const selectedType = encodingTypeRef!.current!.value;
    const typeConfig = registry.get(selectedType)!;

    if (input == "") {
      setOutput("");
    } else if (!typeConfig.isValidInput(input)) {
      setOutput("Input data is not of type: " + typeConfig.inputLabel);
    } else {
      const result = typeConfig.encoder(input);
      if (typeof result === 'string') {
        setOutput(result);
      } else {
        setOutput(result.msg + "\n\n" + result.err);
      }
    }
  }

  function encodingTypeChange() {
    setTypeConfig(registry.get(encodingTypeRef!.current!.value)!);
    processInput();
  }

  return (
    <div class={tw`mt-12 max-w-7xl mx-auto py-6 sm:px-3 lg:px-8 px-4 py-6 sm:px-0 bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4`}>
      <label for="small" class={tw`${labelStyle}`}>Encoding type</label>
      <select id="small" ref={encodingTypeRef} onChange={() => encodingTypeChange()} class={tw`block p-2 mb-6 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
        <option value="default" selected>Please select</option>
        <option value="base64-to-string">Base64 to String</option>
        <option value="binary-to-hex">Binary to Hex</option>
        <option value="binary-to-decimal">Binary - Decimal</option>
        <option value="decimal-to-hex">Decimal to Hex</option>
        <option value="decimal-to-binary">Decimal to Binary</option>
        <option value="hex-to-binary">Hex to Binary</option>
        <option value="hex-to-decimal">Hex to Decimal</option>
        <option value="html-entities-to-string">HTML Entities to String</option>
        <option value="string-to-base64">String to Base64</option>
        <option value="string-to-html-entities">String to HTML Entities</option>
        <option value="string-to-url">String to URL</option>
        <option value="url-to-string">URL to String</option>
      </select>
      <label for="input" class={tw`${labelStyle}`}>Input {}:</label>
      <textarea id="input" ref={inputRef} class={tw`w-full h-40 p-3`} onInput={() => processInput()}/>
      <label for="output" class={tw`${labelStyle}`}>Output:</label>
      <textarea id="output" readonly class={tw`w-full h-40 p-3`} value={output}/>
    </div>
  );
}