import { Fragment } from "preact/jsx-runtime";
import { Head } from "$fresh/runtime.ts";
import Menu from "../islands/Menu.tsx";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <style>{`html, body {height: 100%}`}</style>
      </Head>
      <div class="p-4 mx-auto flex flex-col h-full">
        <Menu title="" page=""/>

      </div>
    </Fragment>
  );
}
