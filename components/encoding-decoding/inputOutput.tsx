import { useSignal } from "@preact/signals";
import { useRef } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { buttonStyle, labelStyle } from "../../util/styles.ts";
import { EncoderRegistryEntry } from "../../types.ts";
import { registry } from "../../util/encoderRegistry.ts";
import { Toast } from "../toast.tsx";

export interface InputOutputProps {
  encodingType: string,
}

export default function InputOutput(props: InputOutputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const output = useSignal("");
  const outputError = useSignal(false);
  const fade = useSignal(false);
  const typeConfig = useSignal<EncoderRegistryEntry>(registry[0]);
  typeConfig.value = registry.find(e => e.selectValue === props.encodingType)!;

  if (IS_BROWSER) {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        document.getElementById('input')!.style.height = "" + entry.borderBoxSize[0].blockSize + "px";
        document.getElementById('output')!.style.height = "" + entry.borderBoxSize[0].blockSize + "px";
      }
    });
    resizeObserver.observe(document.getElementById('input')!);
    resizeObserver.observe(document.getElementById('output')!);
    
    setTimeout(() => {
      processInput();
    }, 0);
  }
  
  function processInput() {
    const input = inputRef.current!.value;

    if (input == "") {
      output.value = "";
      outputError.value = false;
    } else if (!typeConfig.value.isValidInput(input)) {
      output.value = "Input data is not of type: " + typeConfig.value.inputLabel;
      outputError.value = true;
    } else {
      const result = typeConfig.value.encoder(input);
      if (typeof result === 'string') {
        output.value = result;
      } else {
        output.value = result.msg + "\n\n" + result.err;
      }
      outputError.value = false;
    }
  }

  function clear() {
    output.value = "";
    outputError.value = false;
    inputRef.current!.value = "";
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

  return (
    <div class="mt-8">
      <div class={`flex mt-4 flex-col sm:flex-row`}>
        <div class="mx-px w-full">
          <label for="input" class={`${labelStyle}`}>Input ({typeConfig.value.inputLabel}):</label>
          <textarea id="input" ref={inputRef} class="dark:bg-[#353535] border(& gray-300 dark:gray-600) focus:outline-none focus:ring-1 focus:ring-blue-400 font-mono text-sm w-full h-40 p-3" onInput={() => processInput()}/>
        </div>
        <div class="mx-px w-full">
          <label for="output" class={`${labelStyle}`}>Output ({typeConfig.value.outputLabel}):</label>
          <textarea id="output" readonly class={`dark:bg-[#353535] border(& gray-300 dark:gray-600) focus:outline-none focus:ring-1 focus:ring-blue-400 font-mono w-full h-40 p-3 text-sm ${outputError.value ? 'text-red-600 dark:text-[#E76A6A]': ''}`} value={output.value}/>
        </div>
      </div>
      <div class="flex justify-center flex-wrap">
        <button aira-label="Clear all" onClick={() => clear()} class={`mx-2 mt-3 ` + buttonStyle}>
          Clear
        </button>
        <button aria-label="Copy output to clipboard" disabled={output.value.length == 0} onClick={() => copyToClipboard()} class={`mx-2 mt-3 ${output.value.length == 0 ? 'hidden' : ''} ` + buttonStyle}>
          Copy
        </button>
      </div>
      <Toast id="outputCopiedToast" message="Output copied to clipboard" fade={fade.value} type="info"/>
    </div>
  );
}