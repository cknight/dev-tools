import { Fragment } from "preact/jsx-runtime";
import { IS_BROWSER, Head } from "$fresh/runtime.ts";
import InputOutput from "../components/encoding-decoding/inputOutput.tsx";
import { labelStyle, linkStyles } from "../util/styles.ts";
import { Checkbox } from "../components/checkbox.tsx";
import { Signal, useSignal } from "@preact/signals";
import { getLocalStorageValue, HTML_ENTITIES_IS_ATTRIBUTE_VALUE_KEY } from "../util/htmlEntities.ts";

export default function HtmlEntityDecode() {
  const isAttributeValue = useSignal(false);
  
  if (IS_BROWSER) {
    isAttributeValue.value = getLocalStorageValue(HTML_ENTITIES_IS_ATTRIBUTE_VALUE_KEY, false);
  }

  function onUpdateIsAttributeValue(value: boolean) {
    update(isAttributeValue, HTML_ENTITIES_IS_ATTRIBUTE_VALUE_KEY, value);
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
        Convert encoded <a class={linkStyles} href="https://developer.mozilla.org/en-US/docs/Glossary/Entity">entities</a> within a string back into plain text. See also <a class={linkStyles} target="_blank" href="/html-entity-encode">HTML Entity Encode</a>.
        <label for="options" class={labelStyle + " mt-5"}>Options</label>
        <div id="options" class="mt-3">
          <div>
            <Checkbox label="Text is an HTML attribute value" id="isAttributeValue" defaultState={isAttributeValue.value} onUpdate={onUpdateIsAttributeValue}/>
          </div>
        </div>
        <InputOutput encodingType={"HTML-entity-decode"}/>
      </div>
    </Fragment>
  );
}