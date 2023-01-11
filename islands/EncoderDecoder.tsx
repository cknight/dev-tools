import { useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { registry } from "../util/encoderRegistry.ts";
import { EncoderRegistryEntry } from "../types.ts";
import { Toast } from "../components/toast.tsx";
import { buttonStyle, labelStyle } from "../util/styles.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function EncoderDecoder() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const encodingTypeRef = useRef<HTMLSelectElement>(null);
  const typeConfig = useSignal<EncoderRegistryEntry>(registry[0]);
  const fade = useSignal(false);
  const output = useSignal("");
  const outputError = useSignal(false);

  const selectedValue = encodingTypeRef?.current?.options[encodingTypeRef.current.selectedIndex].value;

  function processInput() {
    const input = inputRef.current!.value;
    const selectedType = encodingTypeRef.current!.value;
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
    const encodingType = encodingTypeRef.current!.value;
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
    inputRef.current!.value = "";
  }

  if (IS_BROWSER) {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        document.getElementById('input')!.style.height = "" + entry.borderBoxSize[0].blockSize + "px";
        document.getElementById('output')!.style.height = "" + entry.borderBoxSize[0].blockSize + "px";
      }
    });
    resizeObserver.observe(document.getElementById('input')!);
    resizeObserver.observe(document.getElementById('output')!);
  }

  return (
      <div class="mt-4 sm:mt-6 lg:mt-8 max-w-7xl w-full mx-auto py-6 sm:px-3 px-2 bg(gray-100 dark:[#272727]) shadow-md rounded pt-6">
        <label for="encodingType" class={`${labelStyle}`}>Encoding type</label>
        <select id="encodingType" 
            ref={encodingTypeRef} 
            onChange={() => encodingTypeChange()} 
            class="block p-2 mb-6 text-sm rounded-lg dark:bg-[#353535] border(& gray-300 dark:gray-600) focus:outline-none focus:ring-blue-400 focus:ring-1">
          {registry.map(entry => 
            <option value={entry.selectValue}>{entry.displayName}</option>
          )}
        </select>
        <p class={`text(red-600 dark:[#E76A6A] sm) ${selectedValue == 'JWT-decode' ? '' : 'hidden'}`}>WARNING: Decoded JWT content should not be trusted as no signature verification is undertaken.</p>
        <div class={`flex mt-4 flex-col sm:flex-row`}>
          <div style="flex-grow: 1" class="mx-px">
            <label for="input" class={`${labelStyle}`}>Input ({typeConfig.value.inputLabel}):</label>
            <textarea id="input" ref={inputRef} class="dark:bg-[#353535] border(& gray-300 dark:gray-600) focus:outline-none focus:ring-1 focus:ring-blue-400 font-mono text-sm w-full h-40 p-3" onInput={() => processInput()}/>
          </div>
          <div style="flex-grow: 1" class="mx-px">
            <label for="output" class={`${labelStyle}`}>Output ({typeConfig.value.outputLabel}):</label>
            <textarea id="output" readonly class={`dark:bg-[#353535] border(& gray-300 dark:gray-600) focus:outline-none focus:ring-1 focus:ring-blue-400 font-mono w-full h-40 p-3 text-sm ${outputError.value ? 'text-red-600 dark:text-[#E76A6A]': ''}`} value={output.value}/>
          </div>
        </div>
        <div class="flex justify-center flex-wrap">
          <button aria-label="Copy output to clipboard" disabled={output.value.length == 0} onClick={() => copyToClipboard()} class={`mr-2 mt-3 ${output.value.length == 0 ? 'hidden' : ''} ` + buttonStyle}>
            Copy
          </button>
          <button aira-label="Clear all" onClick={() => clear()} class={`ml-2 mt-3 ` + buttonStyle}>
            Clear
          </button>
        </div>
        <Toast id="outputCopiedToast" message="Output copied to clipboard" fade={fade.value} type="info"/>
    </div>
    );
}