import FormatInputOutput from "../components/format-validate/inputOutput.tsx";
import { Fragment } from "preact/jsx-runtime";
import { Head } from "$fresh/runtime.ts";
import { linkStyles } from "../util/styles.ts";

export default function HtmlFormatValidate() {

  return (
    <Fragment>
      <Head>
        <script defer src="/prettier/parser-html.js"></script>
      </Head>
      <div class="h-full">
        Format and validate <a class={linkStyles} target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/HTML">HTML</a>.
        <FormatInputOutput prettierParser="html" aceMode="html" downloadExtension="html" mimeType="text/html"/>
      </div>
    </Fragment>
  );
}