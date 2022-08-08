/** @jsx h */
import { h } from "preact";
import { apply, tw } from "@twind";
import { useState } from "preact/hooks";

export interface NumberPickerProps {
  name: string;
  start: number;
  incrementAmount: number;
  onUpdate: (newValue: number) => void;
}

export function NumberPicker(props: NumberPickerProps) {
  const [value, setValue] = useState(props.start);

  const buttonStyle = apply`flex 
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

  function updateValue(newValue: number) {
    setValue(newValue);
    props.onUpdate(newValue);
  }

  return <div class={tw`h-20 w-32 mt-5`}>
      <label class={tw`w-full text-gray-700 text-sm font-semibold`}>{props.name}</label>
      <div class={tw`flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1`}>
        <button onClick={() => updateValue(value - props.incrementAmount)} class={tw`${buttonStyle} rounded-l`} tabIndex={0}>
          <span class={tw`m-auto text-2xl font-bold`}>−</span>
        </button>
        <span class={tw`flex justify-center items-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default text-gray-700`}> {value}</span>
        <button onClick={() => updateValue(value + props.incrementAmount)} class={tw`${buttonStyle} rounded-r`} tabIndex={0}>
          <span class={tw`m-auto text-2xl font-bold`}>+</span>
        </button>
      </div>
    </div>;
}