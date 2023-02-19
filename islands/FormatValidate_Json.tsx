import FormatInputOutput from "../components/format-validate/inputOutput.tsx";
import { Fragment } from "preact/jsx-runtime";
import { Head } from "$fresh/runtime.ts";
import { linkStyles } from "../util/styles.ts";

export default function JsonFormatValidate() {

  return (
    <Fragment>
      <Head>
        <script defer src="/prettier/parser-babel.js"></script>
      </Head>
      <div class="h-full">
        Format and validate <a class={linkStyles} target="_blank" href="https://www.json.org/json-en.html">JSON</a>.
        <FormatInputOutput prettierParser="json5" aceMode="json5" downloadExtension="json" mimeType="application/json"/>
      </div>
    </Fragment>
  );
}