import { useSignal } from "@preact/signals";
import { Ref, useRef } from "preact/hooks";

export interface NumberPickerProps {
  name: string;
  start: number;
  minVal: number;
  incrementAmount: number;
  onUpdate: (newValue: number) => void;
}

export function NumberPicker(props: NumberPickerProps) {
  const value = useSignal(props.start);
  const left = useRef<HTMLButtonElement>(null);
  const right = useRef<HTMLButtonElement>(null);

  const buttonStyle = `flex 
                          border-0
                          justify-center 
                          font-semibold 
                          bg(gray-300 hover:gray-400 dark:[#505050] dark:hover:[#606060])
                          text(gray-600 dark:[#eee] hover:gray-700 dark:hover:[#fff])
                          focus:(outline-1)
                          h-full 
                          w-20 
                          pr-1 
                          cursor-pointer 
                          outline-0`;

  function updateValue(newValue: number, el: Ref<HTMLElement>) {
    if (newValue >= props.minVal) {
      value.value = newValue;
      props.onUpdate(newValue);
    }
    setTimeout(() => {
      el.current!.blur();
    }, 300);
  }

  return <div class="h-20 w-32 mt-5 mx-1">
      <label class="w-full text(gray-700 sm dark:white) font-semibold">{props.name}</label>
      <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
        <button aria-label={`Decrement ${props.name}`} ref={left} onClick={() => updateValue(value.value - props.incrementAmount, left)} class={`${buttonStyle} rounded-l`} tabIndex={0}>
          <span class="m-auto text-2xl font-bold">−</span>
        </button>
        <span aria-label={`Value of ${props.name}`} class="border-0 ml-0.5 mr-0.5 flex justify-center items-center w-full bg(gray-300 dark:[#505050]) text(gray-700 dark:[#eee] hover:black focus:black md md:basecursor-default) font-semibold"> {value}</span>
        <button aria-label={`Increment ${props.name}`} ref={right} onClick={() => updateValue(value.value + props.incrementAmount, right)} class={`${buttonStyle} rounded-r`} tabIndex={0}>
          <span class="m-auto text-2xl font-bold">+</span>
        </button>
      </div>
    </div>;
}