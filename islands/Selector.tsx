/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { useState } from "preact/hooks";

interface SelectorProps {
  name:string;
}

export default function FunctionSelector(props:SelectorProps) {
  const [menuVis, setMenuVis] = useState(false);
  const [tool, setTool] = useState(props.name);
  const menuStyle = tw`text-gray-700 block px-4 py-2 hover:bg-gray-100 text-l`;

  function chooseTool(name: string) {
    setTool(name);
    setMenuVis(false);
  }

  return (
    <div>
      <div>
        <div class={tw`flex justify-center`}>
          <button type="button" onClick={() => setMenuVis(!menuVis)} class={tw`inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-2xl font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500`} id="menu-button" aria-expanded="true" aria-haspopup="true">
            {tool}
            <svg class={tw`-mr-1 ml-2 mt-2 h-5 w-5`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div class={tw`flex justify-center`}>
          <div class={tw`${menuVis ? 'block' : 'hidden'} right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
            <div class={tw`py-0`} role="none">
              <a href="/text-diff" onClick={() => chooseTool('Text Diff')} class={menuStyle} role="menuitem" tabIndex={-1} id="menu-item-0">Text Diff</a>
              <a href="/password-generator" onClick={() => chooseTool('Password Generator')} class={menuStyle} role="menuitem" tabIndex={-1} id="menu-item-1">Password Generator</a>
              <a href="/json" onClick={() => chooseTool('JSON Formatter')} class={menuStyle} role="menuitem" tabIndex={-1} id="menu-item-1">JSON Formatter</a>
              <a href="/jwt" onClick={() => chooseTool('JWT Encoder/Decoder')} class={menuStyle} role="menuitem" tabIndex={-1} id="menu-item-1">JWT Encoder/Decoder</a>
              <a href="/base64" onClick={() => chooseTool('BASE64 Encoder/Decoder')} class={menuStyle} role="menuitem" tabIndex={-1} id="menu-item-1">BASE64 Encoder/Decoder</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
