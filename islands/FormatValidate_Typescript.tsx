import FormatInputOutput from "../components/format-validate/inputOutput.tsx";
import { Fragment } from "preact/jsx-runtime";
import { Head } from "$fresh/runtime.ts";
import { linkStyles } from "../util/styles.ts";

export default function TypescriptFormatValidate() {

  return (
    <Fragment>
      <Head>
        <script defer src="/prettier/parser-babel.js"></script>
      </Head>
      <div class="h-full">
        Format and validate <a class={linkStyles} target="_blank" href="https://www.typescriptlang.org/">Typescript</a> including <a class={linkStyles} href="https://www.typescriptlang.org/docs/handbook/jsx.html">TSX</a>.
        <FormatInputOutput prettierParser="babel-ts" aceMode="typescript" downloadExtension="ts" mimeType="application/typescript"/>
      </div>
    </Fragment>
  );
}