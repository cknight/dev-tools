import FormatInputOutput from "../components/format-validate/inputOutput.tsx";
import { Fragment } from "preact/jsx-runtime";
import { Head } from "$fresh/runtime.ts";
import { linkStyles } from "../util/styles.ts";

export default function LessFormatValidate() {

  return (
    <Fragment>
      <Head>
        <script defer src="/prettier/parser-postcss.js"></script>
      </Head>
      <div class="h-full">
        Format and validate <a class={linkStyles} target="_blank" href="https://lesscss.org/">Less</a>.
        <FormatInputOutput prettierParser="less" aceMode="less" downloadExtension="less" mimeType="text/plain"/>
      </div>
    </Fragment>
  );
}