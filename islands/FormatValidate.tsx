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
  const codeOutput = useRef<HTMLElement>(null);
  const languageRef = useRef<HTMLSelectElement>(null);
  const highlightOnlyLangs = ['Bash', 'C', 'C++','C#', 'Diff', 'Go', 'Java','Koitlin', 'Lua', 'Makefile', 'Objective-C', 'Perl', 'PHP', 'Python', 'R', 'Ruby', 'Rust', 'Shell', 'SQL', 'Swift', 'VBNet', 'WASM'];

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
    codeInput.current!.value = "";
    processInput();
  }

  function processInput() {
    const processAs = languageRef.current!.value;
    
    if (processAs == "") return;
    const [prettierParser, highlightLang] = processAs.split(',');
    const start = new Date().getTime();
    let formattedCode = codeInput.current!.value;
    if (prettierParser != '-') {
      try {
        //@ts-ignore - prettier and prettierPlugins are global exports from standalone.js 
        formattedCode = prettier.format(codeInput.current!.value, {parser: prettierParser, plugins: prettierPlugins});
      } catch(e) {
        codeOutput.current!.innerHTML = "<span class='hljs-title'>" + e + "</span";
        return;
      }
    }

    //@ts-ignore - hljs is a global export from highlight.min.js
    const result = hljs.highlightAuto(formattedCode, [highlightLang]);
    //console.log(result);
    codeOutput.current!.innerHTML = result.value;
    console.log('processing took', new Date().getTime() - start);
  }

  return (
    <Fragment>
      <Head>
        <link rel="stylesheet" href="/default.min.css"/>
        <script src="/highlight.min.js"></script>
        <script src="https://unpkg.com/prettier@2.7.1/standalone.js"></script>
        <script src="https://unpkg.com/prettier@2.7.1/parser-babel.js"></script>
        <script src="https://unpkg.com/prettier@2.7.1/parser-graphql.js"></script>
        <script src="https://unpkg.com/prettier@2.7.1/parser-html.js"></script>
        <script src="https://unpkg.com/prettier@2.7.1/parser-markdown.js"></script>
        <script src="https://unpkg.com/prettier@2.7.1/parser-postcss.js"></script>
        <script src="https://unpkg.com/prettier@2.7.1/parser-yaml.js"></script>
      </Head>
      <div class="max-w-7xl mt-4 sm:mt-6 lg:mt-8 mx-auto mb-4 pt-1 sm:px-3 px-2 bg-gray-100 shadow-md rounded">
        <div>
          <label for="language" class={`${labelStyle}`}>Language</label>
          <select id="language" 
              ref={languageRef} 
              onChange={() => processInput()} 
              class="block p-2 mb-6 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-400 focus:ring-1">
                <option value="">Please select</option>
                <optgroup label="Format, Validate, Syntax highlight">
                  <option value="babel,javascript">Javascript (including JSX)</option>
                  <option value="json,json">JSON</option>
                  <option value="json5,javascript">JSON5/JSONC</option>
                  <option value="babel-ts,javascript">Typescript (including TSX)</option>
                  <option value="graphql,graphql">Graphql</option>
                  <option value="html,xml">HTML/XML</option>
                  <option value="markdown,markdown">Markdown</option>
                  <option value="mdx,markdown">MDX</option>
                  <option value="css,css">CSS</option>
                  <option value="less,less">Less</option>
                  <option value="scss,scss">SCSS</option>
                  <option value="yaml,yaml">YAML</option>
                </optgroup>
                <optgroup label="Syntax highlight only">
                {highlightOnlyLangs.map(entry => 
                  <option value={'-,' + entry.toLowerCase()}>{entry}</option>
                )}
                </optgroup>
          </select>

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