import { useState } from "preact/hooks";
import { DiffTableRowResult } from "../util/diffModel.ts";
import { InlineDiff } from "./inlineDiff.tsx";
import { SideBySideDiff } from "./sideBySideDiff.tsx";

export interface DiffProps {
  diffContent: DiffTableRowResult[] | undefined;
}

export type DiffType = "inline" | "sideBySide";

export function DiffOutput(props: DiffProps) {
  const [diffType, setDiffType] = useState<DiffType>('sideBySide');

  function switchTab(): void {
    const inlineTab = document.getElementById('inlineTab')!;
    const sideBySideTab = document.getElementById('sideBySideTab')!;
    if (diffType == "sideBySide") {
      inlineTab.classList.add('bg-white', 'font-semibold', 'shadow');
      sideBySideTab.classList.add('font-medium');
      sideBySideTab.classList.remove('bg-white', 'font-semibold', 'shadow');
      setDiffType("inline");
    } else if (diffType == "inline") {
      sideBySideTab.classList.add('bg-white', 'font-semibold', 'shadow');
      inlineTab.classList.add('font-medium');
      inlineTab.classList.remove('bg-white', 'font-semibold', 'shadow');
      setDiffType("sideBySide");
    }
  }

  return (
    <div id="diffContainer" class={`(${(props.diffContent && props.diffContent.length > 0) ? '' : 'hidden'}) flex flex-col`}>
      <div id="diffTypeTabContainer" class="flex justify-end w-full mb-2">
        <div class="flex space-x-1 rounded-lg bg-blue-100 p-0.5" role="tablist" aria-orientation="horizontal">
          <button onClick={() => {switchTab(); document.getElementById('inlineTab')!.blur();}} id="inlineTab" class="flex items-center px-3 rounded-md font-medium" role="tab" type="button" aria-selected="true" aria-controls="headlessui-tabs-panel-11">
            <span id="inlineTabSpan" class="text-xs ">Inline</span>
          </button>
          <button onClick={() => {switchTab(); document.getElementById('sideBySideTab')!.blur();}} id="sideBySideTab" class="flex items-center rounded-md px-3 py-1 bg-white font-semibold shadow" role="tab" type="button" aria-selected="false">
            <span id="sideBySideTabSpan" class="text-xs">Side by side</span>
          </button>
        </div>
      </div>
      <div>
        <SideBySideDiff diffContent={props.diffContent} diffType={diffType}/>
        <InlineDiff diffContent={props.diffContent} diffType={diffType}/>
      </div>
    </div>
  );
}