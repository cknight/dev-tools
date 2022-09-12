import { useState } from "preact/hooks";

export interface CheckboxProps {
  label: string;
  id: string;
  defaultState: boolean;
  onUpdate: (newState: boolean) => void;
}

export function Checkbox(props: CheckboxProps) {
  const [value, setValue] = useState(props.defaultState);

  function updateValue() {
    setValue(!value);
    props.onUpdate(!value);
  }

  const checkboxImg = `background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");`;
  console.log('rendering', props.label, 'with val', value);
  return <div class="flex align-center">
            <input class="appearance-none 
                            h-7 
                            w-7 
                            border 
                            border-gray-300 
                            rounded-sm 
                            bg-white 
                            hover:border-2
                            focus:border-2
                            focus:border-yellow-600
                            checked:bg-blue-600 
                            checked:border-blue-600 
                            focus:outline-none 
                            transition 
                            duration-200 
                            align-top
                            bg-no-repeat 
                            bg-center 
                            bg-contain 
                            float-left 
                            mr-2 
                            cursor-pointer"
              style={checkboxImg} 
              type="checkbox" value="" id={props.id} checked={value} onChange={updateValue}/>
            <label class="form-check-label inline-block text-gray-800" for={props.id}>
              {props.label}
            </label>
          </div>;
}