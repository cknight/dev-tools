import { useSignal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { DiffTableRowResult } from "../util/diffModel.ts";
import { InlineDiff } from "./inlineDiff.tsx";
import { SideBySideDiff } from "./sideBySideDiff.tsx";

export interface DiffProps {
  diffContent: DiffTableRowResult[] | undefined;
}

export type DiffType = "inline" | "sideBySide";

export function DiffOutput(props: DiffProps) {
  const diffType = useSignal<DiffType>('sideBySide');
  const initComplete = useSignal(false);

  function switchTab(): void {
    const inlineTab = document.getElementById('inlineTab')!;
    const sideBySideTab = document.getElementById('sideBySideTab')!;
    if (diffType.value == "sideBySide") {
      inlineTab.classList.add('bg-white', 'font-semibold', 'shadow');
      sideBySideTab.classList.add('font-medium');
      sideBySideTab.classList.remove('bg-white', 'font-semibold', 'shadow');
      diffType.value = "inline";
    } else if (diffType.value == "inline") {
      sideBySideTab.classList.add('bg-white', 'font-semibold', 'shadow');
      inlineTab.classList.add('font-medium');
      inlineTab.classList.remove('bg-white', 'font-semibold', 'shadow');
      diffType.value = "sideBySide";
    }
  }

  if (IS_BROWSER) {
    //After rendering, switch to inline output if the screen is small
    setTimeout(() => {
      if (!initComplete.value) {
        initComplete.value = true;
        if (document.documentElement.clientWidth  < 700) {
          switchTab();
        }
      }
    }, 0);
  }

  let diffCount = -1;
  
  if (props.diffContent) {
    diffCount = props.diffContent.reduce((acc, curr) => acc += curr.numDiffs, 0);
  }
  
  if (diffCount == 0) {
    return (
      <div id="diffContainer" class={`(${(props.diffContent && props.diffContent.length > 0 && initComplete.value) ? '' : 'hidden'}) flex flex-col`}>
        <p class="text-center mt-7 font-bold text-green-600 text-xl">Texts are identical</p>
      </div>
    );
  }

  return (
    <div id="diffContainer" class={`(${(props.diffContent && props.diffContent.length > 0 && initComplete.value) ? '' : 'hidden'}) flex flex-col`}>
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
        <SideBySideDiff diffContent={props.diffContent} diffType={diffType.value}/>
        <InlineDiff diffContent={props.diffContent} diffType={diffType.value}/>
      </div>
    </div>
  );
}