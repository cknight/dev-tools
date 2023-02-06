import InputOutput from "../components/encoding-decoding/inputOutput.tsx";
import { linkStyles } from "../util/styles.ts";

export default function UrlEncode() {

  return (
    <div>
      <a class={linkStyles} target="_blank" href="https://en.wikipedia.org/wiki/URL_encoding">Encode</a> characters in a string for safe use in a URL. See also <a class={linkStyles} href="/url-decode">URL Decode</a>.
      <InputOutput encodingType={"url-encode"}/>
    </div>
  );
}