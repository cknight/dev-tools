import { useRef, useState } from "preact/hooks";

export interface SeparatorProps {
  start: string,
  onUpdate: (separators: string) => void;
}

export function SeparatorInput(props: SeparatorProps) {
  const [value, setValue] = useState(props.start);
  const inputRef = useRef(null);
  function updateValue() {
    //@ts-ignore - value DOES exist on element
    const newValue = inputRef.current ? inputRef.current.value : "";
    setValue(newValue || "");
    props.onUpdate(newValue || "");
  }

  return <div class="h-20 mt-5">
  <label class="w-full text-gray-700 text-sm font-semibold">Separator(s)</label>
  <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
  <input class="form-input 
                                    h-full 
                                    w-[50px]
                                    pl-2
                                    font-semibold 
                                    border-2 
                                    border-gray-300 
                                    rounded-sm 
                                    bg-white 
                                    focus:border-yellow-600
                                    focus:outline-none 
                                    cursor-pointer"
              type="input" ref={inputRef} value={value} id="separators" onInput={() => updateValue()}/>
  </div>
</div>;
}