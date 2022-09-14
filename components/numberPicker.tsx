import { useSignal } from "@preact/signals";
import { Ref, useRef } from "preact/hooks";

export interface NumberPickerProps {
  name: string;
  start: number;
  incrementAmount: number;
  onUpdate: (newValue: number) => void;
}

export function NumberPicker(props: NumberPickerProps) {
  const value = useSignal(props.start);
  const left = useRef<HTMLButtonElement>(null);
  const right = useRef<HTMLButtonElement>(null);

  const buttonStyle = `flex 
                          border-1
                          justify-center 
                          font-semibold 
                          bg-gray-300 
                          text-gray-600 
                          hover:text-gray-700 
                          hover:bg-gray-400 
                          focus:outline-none 
                          focus:border-yellow-600
                          focus:border-2
                          h-full 
                          w-20 
                          pr-1 
                          cursor-pointer 
                          outline-5`;

  function updateValue(newValue: number, el: Ref<HTMLElement>) {
    if (newValue >= 0) {
      value.value = newValue;
      props.onUpdate(newValue);
    }
    setTimeout(() => {
      el.current!.blur();
    }, 300);
  }

  return <div class="h-20 w-32 mt-5 mx-1">
      <label class="w-full text-gray-700 text-sm font-semibold">{props.name}</label>
      <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
        <button ref={left} onClick={() => updateValue(value.value - props.incrementAmount, left)} class={`${buttonStyle} rounded-l`} tabIndex={0}>
          <span class="m-auto text-2xl font-bold">−</span>
        </button>
        <span class="border-1 flex justify-center items-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default text-gray-700"> {value}</span>
        <button ref={right} onClick={() => updateValue(value.value + props.incrementAmount, right)} class={`${buttonStyle} rounded-r`} tabIndex={0}>
          <span class="m-auto text-2xl font-bold">+</span>
        </button>
      </div>
    </div>;
}