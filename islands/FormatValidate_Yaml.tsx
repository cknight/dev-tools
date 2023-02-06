import FormatInputOutput from "../components/format-validate/inputOutput.tsx";
import { Fragment } from "preact/jsx-runtime";
import { Head } from "$fresh/runtime.ts";
import { linkStyles } from "../util/styles.ts";

export default function YamlFormatValidate() {

  return (
    <Fragment>
      <Head>
        <script defer src="/prettier/parser-yaml.js"></script>
      </Head>
      <div class="h-full">
        Format and validate <a class={linkStyles} target="_blank" href="https://yaml.org/">YAML</a>.
        <FormatInputOutput prettierParser="yaml" aceMode="yaml" downloadExtension="yaml" mimeType="applicaiton/yaml"/>
      </div>
    </Fragment>
  );
}