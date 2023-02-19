import { VNode } from "https://esm.sh/v95/preact@10.11.0/src/index";

export interface MenuHeaderProps {
  icon: VNode;
  text: string;
}

export function MenuHeader(props: MenuHeaderProps) {
  return (
    <div class="flex items-end m-3">
      <div class="mr-2 mb-1">
        {props.icon}
      </div>
      <div class="text-lg font-bold">
        {props.text}
      </div>
    </div>
  );
}
