import { useRef } from "preact/hooks";
import { useSignal, signal } from "@preact/signals";
import { Toast } from "../components/toast.tsx";
import { buttonStyle, labelStyle } from "../util/styles.ts";
import { Fragment } from "preact/jsx-runtime";
import { ASSET_CACHE_BUST_KEY, Head, IS_BROWSER } from "$fresh/runtime.ts";

export default function FormatValidate() {
  const fade = useSignal(false);
  const formattedCode = useSignal("");
  const codeInput = useRef<HTMLTextAreaElement>(null);
  const codeOutput = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLSelectElement>(null);
  const highlightOnlyLangs = ['Bash', 'C', 'C++','C#', 'Diff', 'Go', 'Java','Koitlin', 'Lua', 'Makefile', 'Objective-C', 'Perl', 'PHP', 'Python', 'R', 'Ruby', 'Rust', 'Shell', 'SQL', 'Swift', 'VBNet', 'WASM'];
  const processingInput = useSignal(false);
  const maxHeight = useSignal(0);
  const editor = useSignal<any>(null);

  console.log('Initializing FormatValidate island')
  function copyToClipboard() {
    navigator.clipboard.writeText(formattedCode.value);
    showToast();
  }

  function showToast() {
    processingInput.value = true;
    fade.value = true;
    setTimeout(() => {
      fade.value = false;
    }, 3000);
    setTimeout(() => {
      processingInput.value = false;
    }, 4000);
  }

  function clear() {
    codeInput.current!.value = "";
    processInput();
  }

  function processInput() {
    processingInput.value = true;
    const processAs = languageRef.current!.value;
    
    if (processAs == "") return;

    const [prettierParser, aceMode] = processAs.split(',');
    const start = new Date().getTime();
    formattedCode.value = codeInput.current!.value;
    if (prettierParser != '-') {
      //Format (and validate to an extent) the input data
      try {
        //@ts-ignore - prettier and prettierPlugins are global exports from standalone.js 
        formattedCode.value = prettier.format(codeInput.current!.value, {parser: prettierParser, plugins: prettierPlugins, htmlWhitespaceSensitivity: "ignore", printWidth: 120});
      } catch(e) {
        console.log(e);
        // editor.value.setValue(e.toString());
        // setTimeout(() => {
        //   //wait to 'finish' processing input (and let DOM settle) to prevent new output content from resizing output div
        //   processingInput.value = false;
        // }, 1000);
        // return;
      }
    }

    // Now syntax-highlight the (potentially formatted) input
    //@ts-ignore - hljs is a global export from highlight.min.js
    //const result = hljs.highlightAuto(formattedCode.value, [highlightLang]);
    //console.log(result);

    editor.value.session.setMode("ace/mode/" + aceMode);
    editor.value.session.setValue(formattedCode.value);
    console.log('processing took', new Date().getTime() - start);
    setTimeout(() => {
      //wait to 'finish' processing input (and let DOM settle) to prevent new output content from resizing output div
      processingInput.value = false;
    }, 1000);
  }

  if (IS_BROWSER) {
    const resizeObserver = new ResizeObserver((entries) => {
      // If we aren't processing input and we get a resize event, then set the max-height of the output to the size of the input
      // This prevents the output div from growing to big when output code is set as the innerHTML content
      console.log('Processing input:', processingInput.value, entries);
      if (!processingInput.value) {
        maxHeight.value = document.getElementById('input')!.offsetHeight;
        document.getElementById('output')!.style.maxHeight = document.getElementById('input')!.offsetHeight + "px";
        console.log("Setting max-height:",document.getElementById('input')!.offsetHeight + "px");
      }
    });
    setTimeout(() => {
      console.log('Max height:', maxHeight.value);
      if (maxHeight.value == 0) {
        maxHeight.value = document.getElementById('input')!.offsetHeight;
        //document.getElementById('output')!.style.maxHeight = document.getElementById('input')!.offsetHeight + "px";
      }

      editor.value = ace.edit("editor");
      editor.value.setReadOnly(true);
      //editor.value.setTheme("ace/theme/monokai")
      editor.value.session.setUseWrapMode(true);
      // document.getElementById('editor')!.classList.add("text-sm");
      // document.getElementById('editor')!.classList.add("font-mono");
    },0);
    //resizeObserver.observe(document.getElementById('input')!);
    document.addEventListener('DOMContentLoaded', () => {
      languageRef.current!.disabled = false;
    });
  }

  return (
    <Fragment>
      <Head>
        <link rel="stylesheet" href="/default.min.css"/>
        <script defer src="/highlight.min.js"></script>
        <script defer src="/prettier/standalone.js"></script>
        <script defer src="/prettier/parser-babel.js"></script>
        <script defer src="/prettier/parser-html.js"></script>
        <script defer src="/prettier/parser-markdown.js"></script>
        <script defer src="/prettier/parser-postcss.js"></script>
        <script defer src="/prettier/parser-graphql.js"></script>
        <script defer src="/prettier/parser-yaml.js"></script>
        <script defer src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.11.1/ace.js"></script>
      </Head>
      <div class="flex flex-col h-full max-h-full w-full pb-2 mb-2 mt-3 sm:mt-6 lg:mt-8 mx-auto sm:px-3 px-2 bg-gray-100 shadow-md rounded">
          <div class="mt-3">
            <label for="language" class={`${labelStyle}`}>Language</label>
            <select id="language" disabled
                ref={languageRef} 
                onChange={() => processInput()} 
                class="block p-2 mb-6 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-400 focus:ring-1">
                  <option value="">Please select</option>
                  <optgroup label="Format, Validate, Syntax highlight&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;">
                    <option value="babel,javascript">Javascript (including JSX)</option>
                    <option value="json,json">JSON</option>
                    <option value="json5,json5">JSON5/JSONC</option>
                    <option value="babel-ts,typescript">Typescript (including TSX)</option>
                    <option value="graphql,graphqlschema">Graphql</option>
                    <option value="html,html">HTML</option>
                    <option value="html,xml">XML</option>
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
          </div>
          {/* <div id="editor" ref={codeOutput} class="h-full"></div> */}
          <div class={`h-full max-h-full mb-3 flex flex-col sm:flex-row`}>
            <div class="flex flex-col mx-px h-1/2 sm:h-full sm:w-1/2">
              <label for="input" class={`${labelStyle}`}>Input</label>
              <textarea id="input" ref={codeInput} style="resize:none;" class="resize-x h-full border-1 focus:outline-none focus:ring-1 focus:ring-blue-400 font-mono text-sm w-full p-3" onInput={() => processInput()}/>
            </div>
            <div class="flex flex-col mx-px h-1/2 sm:h-full sm:w-1/2 overflow-auto">
              <label for="output" class={`${labelStyle}`}>Output</label>
              <div id="editor" ref={codeOutput} class="text-sm font-mono h-full max-h-full border-1 focus:outline-none focus:ring-1 focus:ring-blue-400 font-mono w-full p-3"></div>
              {/* <div id="output" class={`h-full overflow-auto bg-white border-1 focus:outline-none focus:ring-1 focus:ring-blue-400 font-mono w-full p-3 text-sm`} style={`max-height: ` + maxHeight + `px`}><pre><code ref={codeOutput}></code></pre></div> */}
              {/* <div id="output" class={`h-full max-h-full overflow-auto bg-white border-1 focus:outline-none focus:ring-1 focus:ring-blue-400 font-mono w-full p-3 text-sm`} style={`max-height: ` + maxHeight + `px`}>
                {/* <div id="editorppp" ref={codeOutput} style={`max-height: ` + maxHeight + `px`}></div> 
              </div> */}
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