import FormatInputOutput from "../components/format-validate/inputOutput.tsx";
import { Fragment } from "preact/jsx-runtime";
import { Head } from "$fresh/runtime.ts";
import { linkStyles } from "../util/styles.ts";

export default function ScssFormatValidate() {

  return (
    <Fragment>
      <Head>
        <script defer src="/prettier/parser-postcss.js"></script>
      </Head>
      <div class="h-full">
        Format and validate <a class={linkStyles} target="_blank" href="https://sass-lang.com/">scss</a>.
        <FormatInputOutput prettierParser="scss" aceMode="scss" downloadExtension="scss" mimeType="text/plain"/>
      </div>
    </Fragment>
  );
}