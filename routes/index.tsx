/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Counter from "../islands/Counter.tsx";
import FunctionSelector from "../islands/Selector.tsx";
import Countdown from "../islands/Counter.tsx";

export default function Home() {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <FunctionSelector name="Tools"/>
    </div>
  );
}
