import { useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";

export interface SeparatorProps {
  start: string,
  onUpdate: (separators: string) => void;
}

export function SeparatorInput(props: SeparatorProps) {
  const seperator = useSignal(props.start);
  const inputRef = useRef<HTMLInputElement>(null);
  function updateValue() {
    const newValue = inputRef.current!.value;
    seperator.value = newValue || "";
    props.onUpdate(newValue || "");
  }

  return <div class="h-20 mt-5">
  <label for="separators" class="w-full text(gray-700 dark:white sm) font-semibold">Separator(s)</label>
  <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
  <input aria-label="Characters to insert between each word in password" class="form-input h-full w-[50px] pl-2 font-semibold border(2 gray-300 dark:[#aaa]) rounded-sm bg(white dark:[#606060]) focus:border-yellow-600 focus:outline-none"
        type="input" ref={inputRef} value={seperator.value} id="separators" onInput={updateValue}/>
  </div>
</div>;
}