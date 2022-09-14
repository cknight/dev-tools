import { useRef, useState } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { registry } from "../util/encoderRegistry.ts";
import { EncoderRegistryEntry } from "../types.ts";
import { Toast } from "../components/toast.tsx";
import { labelStyle } from "../util/styles.ts";

export default function EncoderDecoder() {
  const inputRef = useRef(null);
  const encodingTypeRef = useRef(null);
  const typeConfig = useSignal<EncoderRegistryEntry>(registry[0]);
  const fade = useSignal(false);
  const output = useSignal("");
  const outputError = useSignal(false);

  //@ts-ignore - value DOES exist on this input
  const selectedValue = encodingTypeRef?.current?.options[encodingTypeRef.current.selectedIndex].value;

  function processInput() {
    //@ts-ignore - value DOES exist on this input
    const input = inputRef?.current?.value;
    //@ts-ignore - value DOES exist on this input
    const selectedType = encodingTypeRef!.current!.value;
    const typeConfig = registry.find(e => e.selectValue === selectedType)!;

    if (input == "") {
      output.value = "";
      outputError.value = false;
    } else if (!typeConfig.isValidInput(input)) {
      output.value = "Input data is not of type: " + typeConfig.inputLabel;
      outputError.value = true;
    } else {
      const result = typeConfig.encoder(input);
      if (typeof result === 'string') {
        output.value = result;
      } else {
        output.value = result.msg + "\n\n" + result.err;
      }
      outputError.value = false;
    }
  }

  function encodingTypeChange() {
    //@ts-ignore - value does exist on this element
    const encodingType = encodingTypeRef!.current!.value;
    typeConfig.value = registry.find(e => e.selectValue === encodingType)!;
    processInput();
  }

  
  function copyToClipboard() {
    navigator.clipboard.writeText(output.value);
    showToast();
  }

  function showToast() {
    fade.value = true;
    setTimeout(() => {
      fade.value = false;
    }, 3000)
  }

  function clear() {
    output.value = "";
    outputError.value = false;
    //@ts-ignore - value does exist on this element
    inputRef.current.value = "";
  }

  return (
    <div class="mt-4 sm:mt-6 lg:mt-8 max-w-7xl mx-auto py-6 sm:px-3 px-2 py-6 bg-gray-100 shadow-md rounded pt-6 pb-8 mb-4">
      <label for="small" class={`${labelStyle}`}>Encoding type</label>
      <select id="encodingType" 
          ref={encodingTypeRef} 
          onChange={() => encodingTypeChange()} 
          class="block p-2 mb-6 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-400 focus:ring-1">
        {registry.map(entry => 
          <option value={entry.selectValue}>{entry.displayName}</option>
        )}
      </select>
      <p class={`text-red-600 text-sm ${selectedValue == 'JWT-decode' ? '' : 'hidden'}`}>WARNING: Decoded JWT content should not be trusted as no signature verification is undertaken.</p>
      <label for="input" class={`${labelStyle} mt-4`}>Input ({typeConfig.value.inputLabel}):</label>
      <textarea id="input" ref={inputRef} class="border-1 focus:outline-none focus:ring-1 focus:ring-blue-400 font-mono text-sm w-full h-40 p-3" onInput={() => processInput()}/>
      <label for="output" class={`${labelStyle}`}>Output ({typeConfig.value.outputLabel}):</label>
      <textarea id="output" readonly class={`border-1 focus:outline-none focus:ring-1 focus:ring-blue-400 font-mono w-full h-40 p-3 text-sm ${outputError.value ? 'text-red-600': ''}`} value={output.value}/>
      <div class="flex justify-center flex-wrap">
      <button disabled={output.value.length == 0} onClick={() => copyToClipboard()} class={`mr-2 mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-gray-400 ${output.value.length == 0 ? 'hidden' : ''}`}>
          Copy
        </button>
        <button onClick={() => clear()} class="ml-2 mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-gray-400">
          Clear
        </button>
      </div>
      <Toast id="outputCopiedToast" message="Output copied to clipboard" fade={fade.value} type="info"/>
   </div>
  );
}