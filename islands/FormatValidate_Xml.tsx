import FormatInputOutput from "../components/format-validate/inputOutput.tsx";
import { Fragment } from "preact/jsx-runtime";
import { Head } from "$fresh/runtime.ts";
import { linkStyles } from "../util/styles.ts";

export default function XmlFormatValidate() {

  return (
    <Fragment>
      <Head>
        <script defer src="/prettier/parser-html.js"></script>
      </Head>
      <div class="h-full">
        Format and validate <a class={linkStyles} target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/XML/XML_introduction">XML</a>.
        <FormatInputOutput prettierParser="html" aceMode="xml" downloadExtension="xml" mimeType="application/xml"/>
      </div>
    </Fragment>
  );
}