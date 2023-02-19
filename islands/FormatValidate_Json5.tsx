import FormatInputOutput from "../components/format-validate/inputOutput.tsx";
import { Fragment } from "preact/jsx-runtime";
import { Head } from "$fresh/runtime.ts";
import { linkStyles } from "../util/styles.ts";

export default function Json5FormatValidate() {

  return (
    <Fragment>
      <Head>
        <script defer src="/prettier/parser-babel.js"></script>
      </Head>
      <div class="h-full">
        Format and validate <a class={linkStyles} target="_blank" href="https://json5.org/">JSONC</a> (an extension of JSON).
        <FormatInputOutput prettierParser="json5" aceMode="json5" downloadExtension="json5" mimeType="application/json5"/>
      </div>
    </Fragment>
  );
}