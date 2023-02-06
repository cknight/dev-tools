import { useSignal } from "@preact/signals";
import { useRef } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { buttonStyle, labelStyle, linkStyles } from "../util/styles.ts";
import { Toast } from "../components/toast.tsx";
import { isJWT, jwtToParts } from "../util/jwt.ts";
import { EncodeDecodeError } from "../types.ts";

export default function JwtDecode() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const outputHeader = useSignal("");
  const outputPayload = useSignal("");
  const outputSignature = useSignal("");
  const outputError = useSignal(false);
  const fade = useSignal(false);
  
  if (IS_BROWSER) {
    setTimeout(() => {
      processInput();
    }, 0);
  }

  function processInput() {
    const input = inputRef.current!.value;

    if (input == "") {
      clearOutput();
    } else if (!isJWT(input)) {
      outputHeader.value = "Input data is an invalid JWT";
      outputError.value = true;
    } else {
      const jwtParts = jwtToParts(input);
      if ('err' in jwtParts) {
        outputHeader.value = jwtParts.msg;
        outputError.value = true;
      } else {
        outputHeader.value = jwtParts.header;
        outputPayload.value = jwtParts.payload;
        outputSignature.value = jwtParts.signature;
        outputError.value = false;
      }
    }
  }

  function clear() {
    clearOutput();
    inputRef.current!.value = "";
  }

  function clearOutput() {
    outputHeader.value = "";
    outputPayload.value = "";
    outputSignature.value = "";
    outputError.value = false;
  }

  function copyToClipboard(value:string) {
    navigator.clipboard.writeText(value);
    showToast();
  }

  function copyHeaderToClipboard() {
    copyToClipboard(outputHeader.value);
  }

  function copyPayloadToClipboard() {
    copyToClipboard(outputPayload.value);
  }

  function copySignatureToClipboard() {
    copyToClipboard(outputSignature.value);
  }

  function showToast() {
    fade.value = true;
    setTimeout(() => {
      fade.value = false;
    }, 3000)
  }

  return (
    <div>
      Decode a <a class={linkStyles} target="_blank" href="https://jwt.io/introduction">JWT</a> into its three component parts: header, payload and signature.  Caution: as no signature verification is done, the content of the JWT is not guaranteed to be untampered with.
      <div class="mt-8">
      <div class={`flex mt-4 flex-col sm:flex-row`}>
        <div id="inputCol" class="mr-px sm:mr-3 w-full">
          <label for="input" class={`${labelStyle}`}>Input (JWT):</label>
          <textarea id="input" ref={inputRef} class="dark:bg-[#353535] border(& gray-300 dark:gray-600) focus:outline-none focus:ring-1 focus:ring-blue-400 font-mono text-sm w-full h-[94%] p-3" onInput={() => processInput()}/>
        </div>
        <div id="outputCol" class="ml-px sm:ml-3 w-full">
          <div>
            <div class="flex justify-between mr-1 mb-1">
              <label for="outputHeaders" class={`${labelStyle}`}>JWT Header:</label>
              <button onClick={copyHeaderToClipboard} aria-label="Copy output" title="Copy output" class={`${outputHeader.value != '' ? 'inline-flex': 'hidden'} bg(gray-300 hover:gray-400 dark:[#505050] dark:hover:[#606060]) text-gray-800 font-bold my-px rounded items-center focus:outline-none focus:ring-1 focus:ring-blue-400`}>
                <svg width="30" height="15" viewBox="-3 0 30 25"><path d="M18 6v-6h-18v18h6v6h18v-18h-6zm-12 10h-4v-14h14v4h-10v10zm16 6h-14v-14h14v14z"/></svg>                    
              </button>
            </div>
            <textarea id="outputHeaders" readonly class={`dark:bg-[#353535] border(& gray-300 dark:gray-600) focus:outline-none focus:ring-1 focus:ring-blue-400 font-mono w-full h-32 p-3 text-sm ${outputError.value ? 'text-red-600 dark:text-[#E76A6A]': ''}`} value={outputHeader.value}/>
          </div>
          <div class="mt-2">
            <div class="flex justify-between mr-1 mb-1">
              <label for="outputHeaders" class={`${labelStyle}`}>JWT Payload:</label>
              <button onClick={copyPayloadToClipboard} aria-label="Copy output" title="Copy output" class={`${outputPayload.value != '' ? 'inline-flex': 'hidden'} bg(gray-300 hover:gray-400 dark:[#505050] dark:hover:[#606060]) text-gray-800 font-bold my-px rounded items-center focus:outline-none focus:ring-1 focus:ring-blue-400`}>
                <svg width="30" height="15" viewBox="-3 0 30 25"><path d="M18 6v-6h-18v18h6v6h18v-18h-6zm-12 10h-4v-14h14v4h-10v10zm16 6h-14v-14h14v14z"/></svg>                    
              </button>
            </div>
            <textarea id="outputPayload" readonly class={`dark:bg-[#353535] border(& gray-300 dark:gray-600) focus:outline-none focus:ring-1 focus:ring-blue-400 font-mono w-full h-64 p-3 text-sm ${outputError.value ? 'text-red-600 dark:text-[#E76A6A]': ''}`} value={outputPayload.value}/>
          </div>
          <div class="mt-2">
            <div class="flex justify-between mr-1 mb-1">
              <label for="outputHeaders" class={`${labelStyle}`}>JWT Signature (unverified):</label>
              <button onClick={copySignatureToClipboard} aria-label="Copy output" title="Copy output" class={`${outputSignature.value != '' ? 'inline-flex': 'hidden'} bg(gray-300 hover:gray-400 dark:[#505050] dark:hover:[#606060]) text-gray-800 font-bold my-px rounded items-center focus:outline-none focus:ring-1 focus:ring-blue-400`}>
                <svg width="30" height="15" viewBox="-3 0 30 25"><path d="M18 6v-6h-18v18h6v6h18v-18h-6zm-12 10h-4v-14h14v4h-10v10zm16 6h-14v-14h14v14z"/></svg>                    
              </button>
            </div>
            <textarea id="outputSignature" readonly class={`dark:bg-[#353535] border(& gray-300 dark:gray-600) focus:outline-none focus:ring-1 focus:ring-blue-400 font-mono w-full h-32 p-3 text-sm ${outputError.value ? 'text-red-600 dark:text-[#E76A6A]': ''}`} value={outputSignature.value}/>
          </div>
        </div>
      </div>
      <div class="flex justify-center flex-wrap">
        <button aira-label="Clear all" onClick={() => clear()} class={`mx-2 mt-3 ` + buttonStyle}>
          Clear
        </button>
      </div>
      <Toast id="outputCopiedToast" message="Output copied to clipboard" fade={fade.value} type="info"/>
    </div>
    </div>
  );
}