import { useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { Toast } from "../components/toast.tsx";
import { buttonStyle, labelStyle } from "../util/styles.ts";
import { Fragment } from "preact/jsx-runtime";
import { Head, IS_BROWSER } from "$fresh/runtime.ts";

export default function FormatValidate() {
  const fade = useSignal(false);
  const formattedCode = useSignal("");
  const errors = useSignal(0);
  const warnings = useSignal(0);
  const infos = useSignal(0);
  const hasOutput = useSignal(false);
  const size = useSignal(0);
  const line = useSignal(0);
  const col = useSignal(0);
  const isValidityPossible = useSignal(false);
  const codeInput = useRef<HTMLTextAreaElement>(null);
  const output = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLSelectElement>(null);
  const fullscreenButton = useRef<HTMLButtonElement>(null);
  const restoreButton = useRef<HTMLButtonElement>(null);
  const validityLangs = ['javascript', 'xml', 'json', 'html', 'css', 'yaml', 'lua']
  const isFullscreen = useSignal<boolean>(false);
  // deno-lint-ignore no-explicit-any
  const editor = useSignal<any>(null);
  const libsLoaded = useSignal<Map<string, boolean>>(new Map());


  function copyToClipboard() {
    navigator.clipboard.writeText(formattedCode.value);
    showToast();
  }

  function showToast() {
    fade.value = true;
    setTimeout(() => {
      fade.value = false;
    }, 3000);
  }

  function clear() {
    codeInput.current!.value = "";
    processInput();
  }

  function processInput() {
    const processAs = languageRef.current!.value;
    
    if (processAs == "") {
      hasOutput.value = false;
      return;
    }

    if (libsLoaded.value.get("/prettier/standalone.js") == undefined) {
      dynamicallyLoadJs("/prettier/standalone.js", () => {
        loadFormatLibrary(processAs);
      });
    } else {
      loadFormatLibrary(processAs);
    }
  }

  function loadFormatLibrary(processAs:string) {
    const [prettierParser, aceMode, _] = processAs.split(',');

    switch(prettierParser) {
      case "json":
      case "json5":
      case "babel-ts":
          if (libsLoaded.value.get("/prettier/parser-babel.js") == undefined) {
          dynamicallyLoadJs("/prettier/parser-babel.js", () => {
            format(prettierParser, aceMode);
          });
        } else {
          format(prettierParser, aceMode);
        }
        break;
      case "html":
        if (libsLoaded.value.get("/prettier/parser-html.js") == undefined) {
          dynamicallyLoadJs("/prettier/parser-html.js", () => {
            format(prettierParser, aceMode);
          });
        } else {
          format(prettierParser, aceMode);
        }
        break;
      case "yaml":
        if (libsLoaded.value.get("/prettier/parser-yaml.js") == undefined) {
          dynamicallyLoadJs("/prettier/parser-yaml.js", () => {
            format(prettierParser, aceMode);
          });
        } else {
          format(prettierParser, aceMode);
        }
        break;
      case "graphql":
        if (libsLoaded.value.get("/prettier/parser-graphql.js") == undefined) {
          dynamicallyLoadJs("/prettier/parser-graphql.js", () => {
            format(prettierParser, aceMode);
          });
        } else {
          format(prettierParser, aceMode);
        }
        break;
      case "css":
      case "less":
      case "scss":
        if (libsLoaded.value.get("/prettier/parser-postcss.js") == undefined) {
          dynamicallyLoadJs("/prettier/parser-postcss.js", () => {
            format(prettierParser, aceMode);
          });
        } else {
          format(prettierParser, aceMode);
        }
        break;
      case "markdown":
        if (libsLoaded.value.get("/prettier/parser-markdown.js") == undefined) {
          dynamicallyLoadJs("/prettier/parser-markdown.js", () => {
            format(prettierParser, aceMode);
          });
        } else {
          format(prettierParser, aceMode);
        }
        break;
      default:
        // should never happen
        format(prettierParser, aceMode);
      }
  }

  function format(prettierParser: string, aceMode: string) {
    const start = new Date().getTime();
    formattedCode.value = codeInput.current!.value;
    if (prettierParser != '-') {
      //Format the input data
      try {
        //@ts-ignore - prettier is a global export from standalone.js 
        formattedCode.value = prettier.format(codeInput.current!.value, 
          {
            parser: prettierParser, 
            //@ts-ignore - prettierPlugins is a global export from standalone.js 
            plugins: prettierPlugins, 
            htmlWhitespaceSensitivity: "ignore", 
            printWidth: 120
          });
      } catch(e) {
        // Stick with original formatting in the event of an error
        console.log(e);
      }
    }

    editor.value.session.setMode("ace/mode/" + aceMode);
    editor.value.session.setValue(formattedCode.value);
    size.value = new Blob([formattedCode.value]).size;
    hasOutput.value = formattedCode.value.length > 0;
    isValidityPossible.value = validityLangs.includes(aceMode);
    console.log('processing took', (new Date().getTime() - start) + "ms");
  }

  // deno-lint-ignore no-explicit-any
  function dynamicallyLoadJs(url: string, onload: (this: GlobalEventHandlers, ev: Event) => any) {
    const script = document.createElement("script");
    script.onload = onload;
    script.src = url;
    script.async = true;
    document.body.appendChild(script);
    libsLoaded.value.set(url, true);
  }

  if (IS_BROWSER) {
    setTimeout(() => {
      restoreButton.current!.classList.add("hidden");

      //@ts-ignore - ace is a global export from ace.js
      editor.value = ace.edit("editor");
      document.querySelector("#editor textarea")!.id = "output";
      editor.value.setOptions({
        printMargin: false,
        readOnly: true
      });
      //editor.value.setTheme("ace/theme/monokai")
      editor.value.getSession().setUseWrapMode(true);
      editor.value.getSession().on("changeAnnotation", () => {
        const annotations = editor.value.getSession().getAnnotations();
        const counts = new Map();
        annotations.forEach((el: { type: string; }) => {
          counts.set(el.type, (counts.get(el.type) || 0) + 1);
        });
        errors.value = counts.get("error") ?? 0;
        warnings.value = counts.get("warning") ?? 0;
        infos.value = counts.get("info") ?? 0;
      });
      editor.value.on("changeStatus", updateLineCol);
      editor.value.on("changeSelection", updateLineCol);
      editor.value.on("keyboardActivity", updateLineCol);

      //@ts-ignore - For browser console testing
      globalThis.editor = editor.value;
    },0);
    document.addEventListener('DOMContentLoaded', () => {
      languageRef.current!.disabled = false;
    });
  }

  function updateLineCol() {
    line.value = editor.value.getSession().selection.getCursor().row + 1;
    col.value = editor.value.getSession().selection.getCursor().column + 1;
  }

  function fullscreen() {
    output.current!.setAttribute("style", "position: absolute; inset: 0px; width: 100%; height: 100%; background: white; margin: auto; padding: 10px");
    restoreButton.current!.classList.remove("hidden");
    fullscreenButton.current!.classList.add("hidden");
    editor.value.resize();
    isFullscreen.value = true;
  }

  function download() {
    const [_a, _b, fileExtension, mimeType] = languageRef.current!.value.split(",");
    const a = document.createElement('a');
    const blob = new Blob([formattedCode.value], {type: mimeType});
    const url = URL.createObjectURL(blob);
    a.setAttribute('href', url);
    a.setAttribute('download', "download." + fileExtension);
    a.click();
  }

  function restore() {
    output.current!.setAttribute("style", "");
    restoreButton.current!.classList.add("hidden");
    fullscreenButton.current!.classList.remove("hidden");
    editor.value.resize();
    isFullscreen.value = false;
  }

  function jumpToNext(type:string) {
    const currentLine = editor.value.getSession().selection.getCursor().row;
    let firstAnnotation = -1;
    for (const annotation of editor.value.getSession().getAnnotations()) {
      if (annotation.type == type && annotation.row > currentLine) {
        editor.value.gotoLine(annotation.row + 1);
        return;
      } else if (firstAnnotation == -1 && annotation.type == type) {
        firstAnnotation = annotation.row;
      }
    }
    if (firstAnnotation > -1) {
      editor.value.gotoLine(firstAnnotation + 1);
    }
  }

  const annotationStyle = "focus:outline-none focus:ring-1 focus:ring-blue-400 rounded hover:outline-none hover:ring-1 hover:ring-blue-400 select-none cursor-pointer px-2";

  return (
    <Fragment>
      <Head>
        <link rel="stylesheet" href="/default.min.css"/>
        <script defer src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.11.1/ace.js"></script>
      </Head>
      <div class="flex flex-col h-full max-h-full w-full pb-2 mb-2 mt-3 sm:mt-6 lg:mt-8 mx-auto sm:px-3 px-2 bg-gray-100 shadow-md rounded">
          <div class="flex mt-3">
            <div class="flex items-baseline gap-5">
              <label for="language" class={`${labelStyle}`}>Language</label>
              <select id="language" disabled
                  ref={languageRef} 
                  onChange={() => processInput()} 
                  class="block p-2 mb-6 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-400 focus:ring-1">
                    <option value="">Please select</option>
                    <optgroup label="Data">
                      {/*value format is [prettier parser, ace mode, download extension, mime type]*/}
                      <option value="json,json,json,application/json">JSON</option>
                      <option value="json5,json5,json5,application/json5">JSON5/JSONC</option>
                      <option value="html,xml,xml,application/xml">XML</option>
                      <option value="yaml,yaml,yaml,application/yaml">YAML</option>
                    </optgroup>
                    <optgroup label="Language">
                      <option value="graphql,graphqlschema,gql,application/json">Graphql</option>
                      <option value="babel,javascript,js,application/js">Javascript (including JSX)</option>
                      <option value="babel-ts,typescript,ts,application/typescript">Typescript (including TSX)</option>
                    </optgroup>
                    <optgroup label="Markup">
                      <option value="css,css,css,text/css">CSS</option>
                      <option value="less,less,less,text/plain">Less</option>
                      <option value="html,html,html,text/html">HTML</option>
                      <option value="markdown,markdown,md,text/markdown">Markdown</option>
                      <option value="scss,scss,scss,text/plain">SCSS</option>
                    </optgroup>
              </select>
            </div>
          </div>
          <div class={`h-full max-h-full mb-3 flex flex-col sm:flex-row`}>
            <div class="flex flex-col mx-px h-1/2 sm:h-full sm:w-1/2">
              <label for="input" class={`${labelStyle}`}>Input</label>
              <textarea id="input" ref={codeInput} style="resize:none;" class="resize-x h-full border-1 focus:outline-none focus:ring-1 focus:ring-blue-400 font-mono text-sm w-full p-3" onInput={() => processInput()}/>
            </div>
            <div ref={output} class="flex flex-col mx-px h-1/2 sm:h-full sm:w-1/2 overflow-auto">
              <div class="flex justify-between mr-1 mb-1">
                <label for="output" class={`${labelStyle}`}>Output</label>
                {
                (errors.value > 0 || warnings.value > 0 || infos.value > 0) && 
                <Fragment>
                  <div id="validity" class="text-sm font-bold">
                    {errors.value > 0 && <span role="button" aria-label="jump to next error" tabIndex={0} onClick={() => jumpToNext('error')} class={annotationStyle + " text-red-600"}>Errors: {errors.value}</span>}
                    {warnings.value > 0 && <span role="button" aria-label="jump to next warning" tabIndex={0} onClick={() => jumpToNext('warning')} class={annotationStyle + " text-[#d43900]"}>Warnings: {warnings.value}</span>}
                    {infos.value > 0 && <span role="button" aria-label="jump to next info" tabIndex={0} onClick={() => jumpToNext('info')} class={annotationStyle + " text-blue-600"}>Info: {infos.value}</span>}
                    {errors.value ==0 && warnings.value == 0 && infos.value == 0 && hasOutput.value
                      && <span class="px-2 text-green-500">Valid</span>}
                  </div>
                </Fragment>
                }
                <div id="buttons" class="h-full flex gap-1">
                  <button onClick={clear} aria-label="Clear all" title="Clear all" class="h-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-2 my-px rounded inline-flex items-center focus:outline-none focus:ring-1 focus:ring-blue-400">
                    <svg class="fill-current w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill-rule="evenodd" clip-rule="evenodd">
                      <path d="M5.662 23l-5.369-5.365c-.195-.195-.293-.45-.293-.707 0-.256.098-.512.293-.707l14.929-14.928c.195-.194.451-.293.707-.293.255 0 .512.099.707.293l7.071 7.073c.196.195.293.451.293.708 0 .256-.097.511-.293.707l-11.216 11.219h5.514v2h-12.343zm3.657-2l-5.486-5.486-1.419 1.414 4.076 4.072h2.829zm6.605-17.581l-10.677 10.68 5.658 5.659 10.676-10.682-5.657-5.657z"/>
                    </svg>
                  </button>
                  <button onClick={copyToClipboard} aria-label="Copy output" title="Copy output" class="h-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-2 my-px rounded inline-flex items-center focus:outline-none focus:ring-1 focus:ring-blue-400">
                    <svg class="fill-current w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M18 6v-6h-18v18h6v6h18v-18h-6zm-12 10h-4v-14h14v4h-10v10zm16 6h-14v-14h14v14z"/></svg>                    
                  </button>
                  <button onClick={download} aria-label="Download output" title="Download output" class="h-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-2 my-px rounded inline-flex items-center focus:outline-none focus:ring-1 focus:ring-blue-400">
                    <svg class="fill-current w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                  </button>
                  <button ref={fullscreenButton} onClick={fullscreen} aria-label="Fullscreen" title="Fullscreen" class="h-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-2 my-px rounded items-center focus:outline-none focus:ring-1 focus:ring-blue-400">
                    <svg class="fill-current w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M24 9h-2v-5h-7v-2h9v7zm-9 13v-2h7v-5h2v7h-9zm-15-7h2v5h7v2h-9v-7zm9-13v2h-7v5h-2v-7h9z"/></svg>
                  </button>
                  <button ref={restoreButton} onClick={restore} aria-label="Restore" title="Restore" class="hidden h-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-2 my-px rounded items-center focus:outline-none focus:ring-1 focus:ring-blue-400">
                    <svg class="fill-current w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M15 2h2v5h7v2h-9v-7zm9 13v2h-7v5h-2v-7h9zm-15 7h-2v-5h-7v-2h9v7zm-9-13v-2h7v-5h2v7h-9z"/></svg>
                  </button>
                </div>
              </div>
              <div id="editor" class="text-sm font-mono h-full max-h-full border-1 focus:outline-none focus:ring-1 focus:ring-blue-400 font-mono w-full p-3"></div>
              {formattedCode.value.length > 0 &&
                <div id="footerbar" class="bg-gray-100 h-6 w-full bg-slate-300 text-xs text-gray-700 flex justify-between pt-2">
                  <span class="pl-2">Size: <span>{size.value.toLocaleString()}</span> bytes</span>
                  <span class="pr-2">Ln: <span>{line}</span>, Col: <span>{col}</span></span>
                </div>
              }
            </div>
          </div>
        <div class="flex justify-center flex-wrap h-[68px] hidden">
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