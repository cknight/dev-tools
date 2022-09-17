import { useRef } from "preact/hooks";
import { useSignal, signal } from "@preact/signals";
import { Toast } from "../components/toast.tsx";
import { buttonStyle, labelStyle } from "../util/styles.ts";
import { Fragment } from "preact/jsx-runtime";
import { Head } from "$fresh/runtime.ts";

export default function FormatValidate() {
  const fade = useSignal(false);
  const formattedCode = useSignal("");
  const codeInput = useRef<HTMLTextAreaElement>(null);
  const codeOutput= useRef<HTMLElement>(null);

  function copyToClipboard() {
  //  navigator.clipboard.writeText(output.value);
    showToast();
  }

  function showToast() {
    fade.value = true;
    setTimeout(() => {
      fade.value = false;
    }, 3000)
  }

  function clear() {
  }

  function processInput() {
    const start = new Date().getTime();
    //const result = hljs.highlight(codeInput.current!.value, {language: 'javascript'});
    const result = hljs.highlightAuto(codeInput.current!.value);//, {language: 'javascript'});
    codeOutput.current!.innerHTML = result.value;
    console.log('highlighting took', new Date().getTime() - start);
  }

  return (
    <Fragment>
      <Head>
        <link rel="stylesheet" href="/default.min.css"/>
        <script src="/highlight.min.js"></script>
      </Head>
      <div class="max-w-7xl mt-4 sm:mt-6 lg:mt-8 mx-auto mb-4 pt-1 sm:px-3 px-2 bg-gray-100 shadow-md rounded">
        <div>
          <div class={`flex mt-4 flex-col sm:flex-row`}>
            <div style="flex-grow: 1" class="mx-px w-1/2">
              <label for="input" class={`${labelStyle}`}>Input</label>
              <textarea id="input" ref={codeInput} class="h-[400px] border-1 focus:outline-none focus:ring-1 focus:ring-blue-400 font-mono text-sm w-full p-3" onInput={() => processInput()}/>
            </div>
            <div style="flex-grow: 1" class="mx-px w-1/2 overflow-auto">
              <label for="output" class={`${labelStyle}`}>Output</label>
              <div id="output" class={`overflow-auto h-[400px] bg-white border-1 focus:outline-none focus:ring-1 focus:ring-blue-400 font-mono w-full p-3 text-sm`}><pre><code ref={codeOutput}></code></pre></div>
            </div>
          </div>
        </div>
        <div class="flex justify-center flex-wrap h-[68px]">
          <button aria-label="Copy output to clipboard" onClick={() => copyToClipboard()} class={`mx-2 mt-3 ${formattedCode.value.length == 0 ? 'hidden' : ''} ` + buttonStyle}>
            Copy
          </button>
          <button aira-label="Clear all" onClick={() => clear()} class={`mx-2 mt-3 ` + buttonStyle}>
            Clear
          </button>
        </div>
        <Toast id="outputCopiedToast" message="Output copied to clipboard" fade={fade.value} type="info"/>
      </div>
    </Fragment>
  );
}