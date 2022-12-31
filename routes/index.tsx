import { Fragment } from "preact/jsx-runtime";
import { Head, IS_BROWSER } from "$fresh/runtime.ts";
import Menu from "../islands/Menu.tsx";
import { background, baseStyles, primaryText } from "../util/styles.ts";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Dev Tools</title>
        <meta name="description" content="Easy and powerful developer tools.  No ads, trackers or cookies.  No data submitted.  Total privacy." />
        <style>
          {`body {visibility: hidden; opacity: 0;}`}
        </style>
        <style>{baseStyles}</style>
      </Head>
      <div class={background + " h-full " + primaryText}>
        <div class="p-4 mx-auto flex flex-col h-full">
          <Menu title="" page=""/>
          <p class="mt-10 font-semibold mx-auto text(xl sm:3xl md:[2.75rem])">Your Developer Toolbox</p>
          <p class="mt-5 mb-5 text(l sm:xl center) mx-auto">No ads, trackers or cookies.  No data submitted.  Total privacy.</p>

          <div id="cards" class="max-w-4xl mx-auto flex justify-center mt-5 flex-wrap gap-5 pb-8">
              <div onKeyPress="window.location.href='/password-generator'" onClick="window.location.href='/password-generator'" tabindex="0" role="button" class="rounded overflow-hidden shadow-lg pt-5 w([300px] md:[400px]) hover:cursor-pointer bg([#dddddd] hover:[#eeeeee] dark:[#222222] hover:dark:[#171717])">
                <div class="w-1/3 m-auto flex justify-center items-center h-[120px]">
                  <svg class="h-[100px]" version="1.1" id="Layer_1" x="0px" y="0px" width="94.38px" height="122.88px" viewBox="0 0 94.38 122.88" enable-background="new 0 0 94.38 122.88" >
                    <g>
                      <path d="M8.723,45.706h2.894v-8.729c0-10.139,3.987-19.368,10.412-26.069C28.479,4.177,37.386,0,47.19,0 c9.805,0,18.711,4.177,25.163,10.907c6.424,6.701,10.411,15.931,10.411,26.069v8.729h2.894c2.401,0,4.583,0.98,6.162,2.56 s2.56,3.761,2.56,6.162v59.73c0,2.401-0.98,4.583-2.56,6.162s-3.761,2.56-6.162,2.56H8.723c-2.402,0-4.583-0.98-6.163-2.56 S0,116.56,0,114.158v-59.73c0-2.401,0.981-4.583,2.56-6.162C4.14,46.687,6.321,45.706,8.723,45.706L8.723,45.706z M44,87.301 L39.81,98.28h14.762l-3.884-11.13c2.465-1.27,4.15-3.84,4.15-6.803c0-4.223-3.425-7.647-7.647-7.647 c-4.223,0-7.648,3.425-7.648,7.647C39.542,83.432,41.369,86.091,44,87.301L44,87.301z M17.753,45.706h58.875v-8.729 c0-8.511-3.326-16.236-8.686-21.826C62.61,9.589,55.265,6.137,47.19,6.137S31.77,9.589,26.438,15.15 c-5.359,5.59-8.686,13.315-8.686,21.826V45.706L17.753,45.706z M85.658,51.843H8.723c-0.708,0-1.353,0.292-1.823,0.762 c-0.47,0.47-0.762,1.116-0.762,1.823v59.73c0,0.707,0.292,1.353,0.762,1.822c0.47,0.471,1.116,0.762,1.823,0.762h76.936 c0.708,0,1.354-0.291,1.823-0.762c0.47-0.47,0.762-1.115,0.762-1.822v-59.73c0-0.707-0.292-1.353-0.762-1.823 C87.011,52.135,86.366,51.843,85.658,51.843L85.658,51.843z"/>
                    </g>
                  </svg>
                </div>
                <div class="px-6 py-4">
                  <div class="font-bold text(2xl dark:white) mb-2">Passwords</div>
                  <p class="">
                    Securely generate robust, strong and easy to type passwords.  Generated passwords:
                  </p>
                  <ul class="list-disc ml-5 mt-2">
                  {/* <a class="underline" href="https://pages.nist.gov/800-63-3/sp800-63b.html" target="_blank">
                      <a href="https://haveibeenpwned.com/API/v3#PwnedPasswords" target="_blank"> 
                      <a href="https://xkcd.com/936/" target="_blank">*/}
                    <li>Follow latest NIST password guidelines</li> 
                    <li>Are checked against known data breaches</li>
                    <li>Are configurable with a range of options</li>
                  </ul>
                </div>
              </div>

              <div onKeyPress="window.location.href='/encoding-decoding'" onClick="window.location.href='/encoding-decoding'" tabindex="0" role="button" class="rounded overflow-hidden shadow-lg pt-5 w([300px] md:[400px]) hover:cursor-pointer bg([#dddddd] hover:[#eeeeee] dark:[#222222] hover:dark:[#171717])">
                <div class="w-1/3 m-auto flex justify-center items-center h-[120px]">
                  <svg class="h-[100px]" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 378.01">
                    <path fill-rule="nonzero" d="M287.35 173.92H151.37v59.11c0 4.51-3.66 8.17-8.17 8.17-2.25 0-4.29-.91-5.77-2.39L2.93 126.84c-3.45-2.87-3.92-8.01-1.05-11.46.34-.41.72-.78 1.12-1.11L137.99 1.88c3.46-2.87 8.6-2.4 11.47 1.05a8.144 8.144 0 0 1 1.88 5.21h.03v59.11h135.98c4.51 0 8.17 3.66 8.17 8.17v90.33c0 4.51-3.66 8.17-8.17 8.17zm-62.7 30.17h135.98v-59.11a8.173 8.173 0 0 1 13.94-5.79l134.5 111.97a8.158 8.158 0 0 1-.07 12.58L374.01 376.13a8.15 8.15 0 0 1-11.47-1.06 8.098 8.098 0 0 1-1.88-5.2h-.03v-59.11H224.65c-4.51 0-8.17-3.66-8.17-8.17v-90.33c0-4.51 3.66-8.17 8.17-8.17zm144.15 16.34H232.82v73.98H368.8c4.51 0 8.17 3.66 8.17 8.18v49.88l114.17-95.05-114.17-95.04v49.88c0 4.51-3.66 8.17-8.17 8.17zm-225.6-62.85h135.98V83.6H143.2c-4.51 0-8.17-3.67-8.17-8.18V25.54L20.86 120.59l114.17 95.04v-49.88c0-4.51 3.66-8.17 8.17-8.17z"/>
                  </svg>
                </div>
                <div class="px-6 py-4">
                  <div class="font-bold text(2xl dark:white) mb-2">Encoding/Decoding</div>
                  <p class="">
                    Encode, decode or convert text between different formats.  Examples include:
                  </p>
                  <ul class="list-disc ml-5 mt-2">
                    <li>Base64 encoding</li>
                    <li>Number conversion</li>
                    <li>HTML entity and URL encoding</li>
                    <li>JWT decoding</li>
                  </ul>
                </div>
              </div>

              <div onKeyPress="window.location.href='/format-validate'" onClick="window.location.href='/format-validate'" tabindex="0" role="button" class="rounded overflow-hidden shadow-lg pt-5 w([300px] md:[400px]) hover:cursor-pointer bg([#dddddd] hover:[#eeeeee] dark:[#222222] hover:dark:[#171717])">
                <div class="w-1/3 m-auto flex justify-center items-center h-[120px]">
                  <svg class="h-[80px]" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 386">
                    <path fill-rule="nonzero" d="M0 362.47h512V386H0v-23.53z M0 0h512v23.54H0V0zm111.22 192.4L3.88 107.07v171.86c33.4-28.62 74.84-57.14 108.17-85.82l-.83-.71zm83.41 49.25H512v23.53H194.63v-23.53zm0-120.82H512v23.53H194.63v-23.53z"/>
                  </svg>            
                </div>
                <div class="px-6 py-4">
                  <div class="font-bold text(2xl dark:white) mb-2">Formatting</div>
                  <p class="">
                    Format your data and code.  Features include:
                  </p>
                  <ul class="list-disc ml-5 mt-2">
                    <li>Formatting</li>
                    <li>Syntax highlighting</li>
                    <li>Validation</li>
                    <li>Code/data folding</li>
                  </ul>
                </div>
              </div>

              <div onKeyPress="window.location.href='/text-diff'" onClick="window.location.href='/text-diff'" tabindex="0" role="button" class="rounded overflow-hidden shadow-lg pt-5 w([300px] md:[400px]) hover:cursor-pointer bg([#dddddd] hover:[#eeeeee] dark:[#222222] hover:dark:[#171717])">
                <div class="w-1/3 m-auto flex justify-center items-center h-[120px]">
                  <svg class="h-[100px]" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99.8 122.88">
                    <title>compare file</title>
                    <path fill-rule="evenodd" d="M67.47,118.48a4.4,4.4,0,0,1-4.38,4.4H4.4a4.38,4.38,0,0,1-3.11-1.29A4.35,4.35,0,0,1,0,118.48V41.69a4.4,4.4,0,0,1,4.4-4.4H29V25.55a2.57,2.57,0,0,1,1.87-2.48L53.55,1a2.52,2.52,0,0,1,2-.95H95.18A4.63,4.63,0,0,1,99.8,4.62V85.23a4.63,4.63,0,0,1-4.62,4.62H67.48v28.63ZM34.11,37.29h8.06a2.4,2.4,0,0,1,1.88.9L65.7,59.27a2.44,2.44,0,0,1,1.78,2.36V84.69H94.64V53.82H87.08v5.84c-.11,2.52-2,3.45-4.28,2.67a1.24,1.24,0,0,1-.36-.19C76.62,57.57,72.6,53,66.77,48.42l-.08-.07c-1.77-1.62-1.25-3.46.47-4.81L81.45,30.86a6.91,6.91,0,0,1,2.11-1.18,2.45,2.45,0,0,1,3.17,1.38,5.05,5.05,0,0,1,.35,2c0,1.81,0,3.64,0,5.45h7.56V5.13H58.12V26.05a2.59,2.59,0,0,1-2.59,2.59H34.11v8.65ZM53,9,37.53,23.48H53V9Zm-40.84,65H4.91V42.18H39.7V62.1a2.47,2.47,0,0,0,2.47,2.47h20.4q0,26.7,0,53.4H4.91V88.64h7.21V94.2c.1,2.4,1.88,3.28,4.07,2.54a1,1,0,0,0,.34-.18c5.55-4.36,9.38-8.71,14.93-13.07l.07-.07c1.7-1.53,1.19-3.29-.44-4.58L17.48,66.77a6.43,6.43,0,0,0-2-1.13,2.34,2.34,0,0,0-3,1.32,4.78,4.78,0,0,0-.32,1.9c0,1.73,0,3.47,0,5.19ZM44.61,45.89l14.7,13.77H44.61V45.89Z"/>
                  </svg>
                </div>
                <div class="px-6 py-4">
                  <div class="font-bold text(2xl dark:white) mb-2">Diffs</div>
                  <p class="">
                    Produce a visual comparison of the differences between two sets of text. Features include:
                  </p>
                  <ul class="list-disc ml-5 mt-2">
                    <li>Side by side</li>
                    <li>Inline</li>
                    <li>Line numbers</li>
                  </ul>
                </div>
              </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
