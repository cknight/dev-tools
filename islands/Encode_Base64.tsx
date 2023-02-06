import InputOutput from "../components/encoding-decoding/inputOutput.tsx";
import { linkStyles } from "../util/styles.ts";

export default function Base64Encode() {

  return (
    <div>
      Encode UTF-8 text into <a class={linkStyles} target="_blank" href="https://en.wikipedia.org/wiki/Base64">Base64</a>. See also <a class={linkStyles} href="/base64-decode">Base64 Decode</a>.
      <InputOutput encodingType={"base64-encode"}/>
    </div>
  );
}