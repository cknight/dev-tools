import FormatInputOutput from "../components/format-validate/inputOutput.tsx";
import { Fragment } from "preact/jsx-runtime";
import { Head } from "$fresh/runtime.ts";
import { linkStyles } from "../util/styles.ts";

export default function MarkdownFormatValidate() {

  return (
    <Fragment>
      <Head>
        <script defer src="/prettier/parser-markdown.js"></script>
      </Head>
      <div class="h-full">
        Format and validate <a class={linkStyles} target="_blank" href="https://daringfireball.net/projects/markdown/">Markdown</a>.
        <FormatInputOutput prettierParser="markdown" aceMode="markdown" downloadExtension="md" mimeType="text/markdown"/>
      </div>
    </Fragment>
  );
}