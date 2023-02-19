import { Ref, useRef} from "preact/hooks";
import { useSignal } from "@preact/signals";
import { primaryText } from "../util/styles.ts";

export interface CheckboxProps {
  label: string;
  id: string;
  defaultState: boolean;
  onUpdate: (newState: boolean) => void;
}

export function Checkbox(props: CheckboxProps) {
  const checkbox = useSignal(props.defaultState);
  const cbRef = useRef<HTMLInputElement>(null);

  function updateValue() {
    checkbox.value = !checkbox.value;
    props.onUpdate(checkbox.value);
    setTimeout(() => {
      cbRef.current!.blur();
    }, 500);
  }

  const checkboxImg = `background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");`;
  return <div class="flex align-center">
            <input class="appearance-none 
                            h-5 
                            w-5 
                            border(gray-300 dark:[#aaa])
                            rounded-sm 
                            bg(white no-repeat center contain)
                            hover:border-2
                            focus:border-2
                            focus:border-yellow-600
                            checked:bg-blue-600 
                            dark:checked:bg-blue-500 
                            checked:border-blue-600 
                            focus:outline-none 
                            transition 
                            duration-200 
                            align-top
                            float-left 
                            mr-2 
                            cursor-pointer"
              style={checkboxImg} 
              type="checkbox" value="" id={props.id} checked={checkbox.value} ref={cbRef} onChange={updateValue}/>
            <label class={"form-check-label inline-block " + primaryText} for={props.id}>
              {props.label}
            </label>
          </div>;
}