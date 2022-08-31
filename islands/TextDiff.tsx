/** @jsx h */
import { Fragment, h } from "preact";
import { apply, tw } from "@twind";
import { Head, IS_BROWSER } from "https://deno.land/x/fresh@1.0.0/runtime.ts";
import { useRef, useState } from "preact/hooks";
import { Toast } from "../components/toast.tsx";
import { labelStyle } from "../util/styles.ts";
import { sideBySideDiff, textDiff } from "../util/textDiff.ts";
import { SideBySideDiff } from "../components/sideBySideDiff.tsx";
import { DiffTableRowResult } from "../util/diffModel.ts";

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

  return (
    <Fragment>
    <Head>
        <title>Text-diff</title>
        <link rel="stylesheet" href="./textDiff.css"></link>
    </Head>
    <div class={tw`mt-12 max-w-7xl mx-auto py-6 sm:px-3 lg:px-8 px-4 py-6 sm:px-0 bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4`}>
      <div class={tw`flex mb-3`}>
        <div class={tw`w-1/2 mr-2`}>
          <label for="left" class={tw`${labelStyle}`}>Left:</label>
          <textarea id="left" ref={leftRef} class={tw`w-full h-40 p-3`}/>
        </div>
        <div class={tw`w-1/2 ml-2`}>
          <label for="right" class={tw`${labelStyle}`}>Right:</label>
          <textarea id="right" ref={rightRef} class={tw`w-full h-40 p-3`}/>
        </div>
      </div>

      <div class={tw`flex justify-center`}>
        <button onClick={() => processDiff()} class={tw`mx-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3`}>
          Compare
        </button>
        <button onClick={() => clearAll()} class={tw`mx-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3`}>
          Clear all
        </button>
      </div>
      <SideBySideDiff diffContent={diff}/>
      <script type="text/javascript" src="./diff_match_patch.js"></script>
    </div>
    </Fragment>
  );
}