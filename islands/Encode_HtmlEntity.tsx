import { Fragment } from "preact/jsx-runtime";
import { IS_BROWSER, Head } from "$fresh/runtime.ts";
import InputOutput from "../components/encoding-decoding/inputOutput.tsx";
import { labelStyle, linkStyles } from "../util/styles.ts";
import { Checkbox } from "../components/checkbox.tsx";
import { Signal, useSignal } from "@preact/signals";
import { getLocalStorageValue, HTML_ENTITIES_ENCODE_EVERYTHING_KEY, HTML_ENTITIES_ONLY_ENCODE_NON_ASCII_KEY, HTML_ENTITIES_USE_DECIMAL_ESCAPES_KEY, HTML_ENTITIES_USE_NAMED_REFERENCES_KEY } from "../util/htmlEntities.ts";

export default function HtmlEntityEncode() {
  const useNamedReferences = useSignal(false);
  const useDecimalEncoding = useSignal(false);
  const encodeEverything = useSignal(false);
  const onlyEncodeNonAscii = useSignal(false);
  
  if (IS_BROWSER) {
    useNamedReferences.value = getLocalStorageValue(HTML_ENTITIES_USE_NAMED_REFERENCES_KEY, true);
    useDecimalEncoding.value = getLocalStorageValue(HTML_ENTITIES_USE_DECIMAL_ESCAPES_KEY, false);
    encodeEverything.value = getLocalStorageValue(HTML_ENTITIES_ENCODE_EVERYTHING_KEY, false);
    onlyEncodeNonAscii.value = getLocalStorageValue(HTML_ENTITIES_ONLY_ENCODE_NON_ASCII_KEY, false);
  }

  function onUpdateEntityNames(value: boolean) {
    update(useNamedReferences, HTML_ENTITIES_USE_NAMED_REFERENCES_KEY, value);
  }

  function onUpdateDecimalEncoding(value: boolean) {
    update(useDecimalEncoding, HTML_ENTITIES_USE_DECIMAL_ESCAPES_KEY, value);
  }

  function onUpdateEncodeEverything(value: boolean) {
    update(encodeEverything, HTML_ENTITIES_ENCODE_EVERYTHING_KEY, value);
  }

  function onUpdateOnlyEncodeNonAscii(value: boolean) {
    update(onlyEncodeNonAscii, HTML_ENTITIES_ONLY_ENCODE_NON_ASCII_KEY, value);
  }

  function update(ref:Signal<boolean>, key: string, value: boolean) {
    ref.value = value;
    window.localStorage.setItem(key, value.toString());
    const input = document.getElementById('input')!;
    input.dispatchEvent(new Event('input'));
  }

  return (
    <Fragment>
      <Head>
        <script defer src="/he.min.js"></script>
      </Head>
      <div>
        Convert text within a string to <a class={linkStyles} href="https://developer.mozilla.org/en-US/docs/Glossary/Entity">entities</a> for safe use within HTML or XML by encoding special characters. See also <a class={linkStyles} target="_blank" href="/html-entity-decode">HTML Entity Decode</a>.
        <label for="options" class={labelStyle + " mt-5"}>Options</label>
        <div id="options" class="mt-3">
          <div>
            <Checkbox label="Use named references (e.g. &quot instead of &amp;#x22;)" id="useNamedReferences" defaultState={useNamedReferences.value} onUpdate={onUpdateEntityNames}/>
          </div>
          <div>
            <Checkbox label="Use decimal encoding (e.g. &amp;#169; instead of &amp;#xA9;)" id="decimalEncoding" defaultState={useDecimalEncoding.value} onUpdate={onUpdateDecimalEncoding}/>
          </div>
          <div>
            <Checkbox label="Encode everything" id="encodeEverything" defaultState={encodeEverything.value} onUpdate={onUpdateEncodeEverything}/>
          </div>
          <div>
            <Checkbox label="Only encode non-ASCII" id="onlyEncodeNonAscii" defaultState={onlyEncodeNonAscii.value} onUpdate={onUpdateOnlyEncodeNonAscii}/>
          </div>
        </div>
        <InputOutput encodingType={"HTML-entity-encode"}/>
      </div>
    </Fragment>
  );
}