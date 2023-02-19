import FormatInputOutput from "../components/format-validate/inputOutput.tsx";
import { Fragment } from "preact/jsx-runtime";
import { Head } from "$fresh/runtime.ts";
import { linkStyles } from "../util/styles.ts";

export default function JavascriptFormatValidate() {

  return (
    <Fragment>
      <Head>
        <script defer src="/prettier/parser-babel.js"></script>
      </Head>
      <div class="h-full">
        Format and validate <a class={linkStyles} target="_blank" href="https://javascript.info/">Javascript</a> including <a class={linkStyles} target="_blank" href="https://reactjs.org/docs/introducing-jsx.html">JSX</a>.
        <FormatInputOutput prettierParser="babel" aceMode="javascript" downloadExtension="js" mimeType="application/js"/>
      </div>
    </Fragment>
  );
}