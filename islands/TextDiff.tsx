import { Head } from "$fresh/runtime.ts";
import { useRef, useState } from "preact/hooks";
import { buttonStyle, labelStyle } from "../util/styles.ts";
import { textDiff } from "../util/textDiff.ts";
import { DiffTableRowResult } from "../util/diffModel.ts";
import { DiffOutput } from "../components/diffOutput.tsx";
import { Fragment } from "preact/jsx-runtime";

export default function TextDiff() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [diff, setDiff] = useState<DiffTableRowResult[]>();

  function processDiff(): void {
    //@ts-ignore - object is not null and has value
    const leftText = leftRef.current.value;
    //@ts-ignore - object is not null and has value
    const rightText = rightRef.current.value;
    setDiff(textDiff(leftText, rightText));
  }
  
  function clearAll(): void {
    setDiff([]);
    //@ts-ignore - object is not null and has value
    leftRef.current.value = '';
    //@ts-ignore - object is not null and has value
    rightRef.current.value = '';
  }

  function switchText(): void {
    //@ts-ignore - object is not null and has value
    const leftText = leftRef.current.value;
    //@ts-ignore - object is not null and has value
    leftRef.current.value = rightRef.current.value;
    //@ts-ignore - object is not null and has value
    rightRef.current.value = leftText;
    if (diff) {
      processDiff();
    }
  }

  const textAreaStyle = "";

  return (
    <Fragment>
    <Head>
        <title>Text-diff</title>
    </Head>
    <div class="w-full mt-12 mb-4 py-6 px-2 mx-auto sm:px-4 bg-gray-100 shadow-md rounded">
      <div class="flex mb-3">
        <div class="w-1/2 mr-2">
          <label for="left" class={`${labelStyle}`}>Left:</label>
          <textarea id="left" ref={leftRef} class="shadow-md font-mono text-xs w-full h-40 p-3"/>
        </div>
        <div class="w-1/2 ml-2">
          <label for="right" class={`${labelStyle}`}>Right:</label>
          <textarea id="right" ref={rightRef} class="shadow-md font-mono text-xs w-full h-40 p-3"/>
        </div>
      </div>

      <div class="flex justify-center flex-wrap">
        <button onClick={() => switchText()} class="sm:mx-10 mx-2 bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-gray-400">
          Switch
        </button>
        <button onClick={() => processDiff()} class={`sm:mx-10 mx-2 ` + buttonStyle}>
          Compare
        </button>
        <button onClick={() => clearAll()} class="sm:mx-10 mx-2 bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-gray-400">
          Clear all
        </button>
      </div>
      <DiffOutput diffContent={diff}/>
      <script type="text/javascript" src="./diff_match_patch.js"></script>
    </div>
    </Fragment>
  );
}