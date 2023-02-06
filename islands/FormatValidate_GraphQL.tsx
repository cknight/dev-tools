import FormatInputOutput from "../components/format-validate/inputOutput.tsx";
import { Fragment } from "preact/jsx-runtime";
import { Head } from "$fresh/runtime.ts";
import { linkStyles } from "../util/styles.ts";

export default function GraphQLFormatValidate() {

  return (
    <Fragment>
      <Head>
        <script defer src="prettier/parser-graphql.js"></script>
      </Head>
      <div class="h-full">
        Format and validate <a class={linkStyles} target="_blank" href="https://graphql.org/">GraphQL</a>.
        <FormatInputOutput prettierParser="graphql" aceMode="graphqlschema" downloadExtension="gql" mimeType="application/json"/>
      </div>
    </Fragment>
  );
}