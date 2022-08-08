/** @jsx h */
import { h } from "preact";
import { apply, tw } from "@twind";

interface ToastProperties {
  fade: boolean,
  id: string,
  message: string,
  type: 'info' | 'warn' | 'error'
}

const infoStyle = apply`text-white bg-blue-500`;
const warnStyle = apply`text-gray-600 bg-yellow-300`;
const errorStyle = apply`text-white bg-red-500`;

export function Toast(props: ToastProperties) {
  const styleType = props.type == 'info' ? infoStyle : (props.type == 'warn' ? warnStyle : errorStyle);
 return (
  <div id={props.id} class={tw`absolute top-5 right-5 transition-all duration-500 ${props.fade ? 'opacity-100' : 'opacity-0'} ${props.fade ? "translate-x-0 " : "translate-x-full"}`}>
    <div id="toast-simple" class={tw`${styleType} p-4 inline-flex rounded-lg divide-x divide-gray-200 shadow`} role="alert">
      <div class="pl-4 text-sm font-bold">{props.message}</div>
    </div>
  </div>
  );
}