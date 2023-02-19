import FormatInputOutput from "../components/format-validate/inputOutput.tsx";
import { Fragment } from "preact/jsx-runtime";
import { Head } from "$fresh/runtime.ts";
import { linkStyles } from "../util/styles.ts";

export default function CssFormatValidate() {

  return (
    <Fragment>
      <Head>
        <script defer src="/prettier/parser-postcss.js"></script>
      </Head>
      <div class="h-full">
        Format and validate <a class={linkStyles} target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS">CSS</a>.
        <FormatInputOutput prettierParser="css" aceMode="css" downloadExtension="css" mimeType="text/css"/>
      </div>
    </Fragment>
  );
}