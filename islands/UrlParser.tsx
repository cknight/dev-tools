import { buttonStyle, labelStyle, linkStyles } from "../util/styles.ts";
import { useSignal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Fragment } from "preact/jsx-runtime";

export default function UrlParser() {
  const isError = useSignal(false);
  const hasOutput = useSignal(false);
  const hasQueryParams = useSignal(false);
  const hash = useSignal("");
  const host = useSignal("");
  const hostname = useSignal("");
  const href = useSignal("");
  const origin = useSignal("");
  const password = useSignal("");
  const pathname = useSignal("");
  const port = useSignal("");
  const protocol = useSignal("");
  const username = useSignal("");
  const queryParams = useSignal(new Map<string, string>());

  if (IS_BROWSER) {
    const inputUrl = (document.getElementById("inputUrl") as HTMLInputElement);
    inputUrl.addEventListener("keyup", function(event) {
      if (event.key === "Enter") {
        processUrl();
        event.preventDefault();
      }
    });
  }

  function processUrl() {
    const inputUrl = (document.getElementById("inputUrl") as HTMLInputElement).value;
    try {
      const url = new URL(inputUrl);
      hash.value = url.hash;
      host.value = url.host;
      hostname.value = url.hostname;
      href.value = url.href;
      origin.value = url.origin;
      password.value = url.password;
      pathname.value = url.pathname;
      port.value = url.port;
      protocol.value = url.protocol;
      username.value = url.username;

      if (url.search.length > 0) {
        hasQueryParams.value = true;
        const queryMap = new Map<string, string>();
        url.searchParams.forEach((value, key) => {  
          queryMap.set(key, value);
        });
        queryParams.value = queryMap;
      } else {
        hasQueryParams.value = false;
        queryParams.value = new Map<string, string>();
      }

      isError.value = false;
      hasOutput.value = true;
    } catch (e) {
      console.error(e);
      isError.value = true;
      hasOutput.value = false;
      hasQueryParams.value = false;
      return;
    }
  }

  function clear() {
    hasOutput.value = false;
    isError.value = false;
    hasQueryParams.value = false;
    (document.getElementById("inputUrl") as HTMLInputElement).value = "";
  }

  return (
    <div class="mb-10">
      <a class={linkStyles} href="https://developer.mozilla.org/en-US/docs/Web/API/URL">Parse a URL</a> into its components.
      <label for="inputUrl" class="block mt-4">Input URL</label>
      <input id="inputUrl" type="text" class="w-full p-2 border border-gray-300 rounded mt-2" placeholder="https://example.com:8080/pathname/?search=test#hash"/>
      <div class="mt-5 flex justify-center flex-wrap">
        <button onClick={() => processUrl()} class={`sm:mx-10 mx-2 ` + buttonStyle}>
          Parse
        </button>
        <button onClick={() => clear()} class="sm:mx-10 mx-2 bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-gray-400">
          Clear
        </button>
      </div>
      { isError.value && 
        <div mt-5>
          <p class="dark:text-red-400 text-red-500 text-xl font-bold">URL is invalid</p>
        </div>
      }
      { hasOutput.value && 
        <Fragment>
          <div class="mt-5">
            <label for="baseUrlTable" class={labelStyle}>Base URL</label>
            <div class="inline-block shadow rounded-lg overflow-hidden">
              <table id="baseUrlTable" class="table-auto">
                <thead class="bg-gray-200">
                    <tr>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">URL component</th>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Value</th>
                    </tr>
                </thead>
                <tbody class="mt-3 bg-[#f5f5f5] dark:bg-[#454545] divide-y divide-slate-800 dark:divide-[#656565]">
                  <tr>
                    <td class="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white">href</td>
                    <td class="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white" id="href">{href.value}</td>
                  </tr>
                  <tr>
                    <td class="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white">origin</td>
                    <td class="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white" id="origin">{origin.value}</td>
                  </tr>
                  <tr>
                    <td class="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white">protocol</td>
                    <td class="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white" id="protocol">{protocol.value}</td>
                  </tr>
                  <tr>
                    <td class="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white">host</td>
                    <td class="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white" id="host">{host.value}</td>
                  </tr>
                  <tr>
                    <td class="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white">hostname</td>
                    <td class="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white" id="hostname">{hostname.value}</td>
                  </tr>
                  <tr>
                    <td class="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white">port</td>
                    <td class="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white" id="port">{port.value}</td>
                  </tr>
                  <tr>
                    <td class="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white">username</td>
                    <td class="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white" id="username">{username.value}</td>
                  </tr>
                  <tr>
                    <td class="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white">password</td>
                    <td class="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white" id="password">{password.value}</td>
                  </tr>
                  <tr>
                    <td class="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white">pathname</td>
                    <td class="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white" id="pathname">{pathname.value}</td>
                  </tr>
                  <tr>
                    <td class="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white">hash</td>
                    <td class="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white" id="hash">{hash.value}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="mt-5">
            <label for="queryParamTable" class={labelStyle}>Query Parameters</label>
            { !hasQueryParams.value &&
              <p class="dark:text-gray-400 text-gray-500 text-sm font-bold">URL did not contain query parameters</p>
            }
            { hasQueryParams.value &&
              <div class="inline-block shadow rounded-lg overflow-hidden">
                <table id="queryParamTable" class="">
                  <thead class="bg-gray-200">
                    <tr>
                      <th class="px-5 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Key</th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Value</th>
                    </tr>
                  </thead>
                  <tbody class="mt-3 bg-[#f5f5f5] dark:bg-[#454545] divide-y divide-gray-200 dark:divide-gray-700">
                    {Array.from(queryParams.value.entries()).map(([key, value]) => (
                      <tr class="">
                        <td class="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white">{key}</td>
                        <td class="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            }
          </div>      
        </Fragment>
      }
    </div>
  );
}