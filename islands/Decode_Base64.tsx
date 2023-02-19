import { linkStyles } from "../util/styles.ts";
import InputOutput from "../components/encoding-decoding/inputOutput.tsx";

export default function Base64Decode() {

  return (
    <div>
      Decode <a class={linkStyles} target="_blank" href="https://en.wikipedia.org/wiki/Base64">Base64</a> into UTF-8 text.  See also <a class={linkStyles} href="/base64-encode">Base64 Encode</a>.
      <InputOutput encodingType={"base64-decode"}/>
    </div>
  );
}