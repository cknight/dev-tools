import InputOutput from "../components/encoding-decoding/inputOutput.tsx";
import { linkStyles } from "../util/styles.ts";

export default function UrlDecode() {

  return (
    <div>
      Decode a URL containing <a class={linkStyles} target="_blank" href="https://en.wikipedia.org/wiki/URL_encoding">percent encoded</a> characters into the original string. See also <a class={linkStyles} href="/url-decode">URL Decode</a>.
      <InputOutput encodingType={"url-encode"}/>
    </div>
  );
}