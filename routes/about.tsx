import { PageProps } from "$fresh/server.ts";
import PasswordGenerator from "../islands/PasswordGenerator.tsx";
import { Fragment } from "preact/jsx-runtime";
import { Head } from "$fresh/runtime.ts";
import Menu from "../islands/Menu.tsx";


export default function About() {
  return (
    <Fragment>
      <Head>
        <style>{`html, body {height: 100%}`}</style>
      </Head>
      <div class="p-4 mx-auto flex flex-col h-full">
        <Menu title={"About"} page={"About"}/>
        <div id="contentContainer" class="max-w-4xl mx-auto">
          <div class="m-5">
            <h1 class="text-4xl font-bold mb-4">About</h1>
            Dev-tools is an open source collection of online tools for use in software development.  The goals of these tools are:
            <ul class="list-disc ml-7 mt-4">
              <li>Provide a simple, easy to use interface</li>
              <li>Be lightning fast (score 100% in Lighthouse performance)</li>
              <li>Have a strong privacy and security focus</li>
              <li>Be accessible and responsive</li>
              <li>Be useful</li>
            </ul>
          </div>
          <div class="m-5">
            <h1 class="text-4xl font-bold mb-4">Privacy and Security</h1>
            Privacy and security are a major focus.  Very often, formatting, diffing or encoding/decoding involves sensitive data, 
            and great care should be taken that this data is not sent to any other server. 
            Indeed, this is often a strict company policy or legal requirement.  
            To support this, your data will reside entirely in the browser.  To support privacy and security, this site:
            <ul class="list-disc ml-7 mt-4">
              <li>Processes all data client side (in your browser)<sup>*</sup></li>
              <li>Does not use any cookies</li>
              <li>Does not use client analytics, such as Google Analytics</li>
              <li>Does not use trackers, such as pixel trackers</li>
              <li>Does not use ads</li>
            </ul>
            <p class="text-xs mt-4 pl-2"><sup>*</sup> Generating new passwords will send the first 5 characters of the SHA1 hash 
            of the password to the <i>Have I Been Pwned API</i> to allow the generator to assist the process of determining if the new password has been published 
            in a previous data breach. For more details on the security and privacy behind this, 
            see the <a class="text-[#0000ee] visited:text-[#551A8B]" href="https://haveibeenpwned.com/API/v3#PwnedPasswords" target="_blank">API docs</a>.</p>
          </div>
          <div class="m-5">
            <h1 class="text-4xl font-bold mb-4">Contribute</h1>
            <p>This site is open source and contributions are welcome.  If you wish to contribute, have a tool you would like to see added, or have a suggestion for an improvement, please open an issue on the <a class="text-[#0000ee] visited:text-[#551A8B]" href="https://github.com/cknight/dev-tools">GitHub repository</a>.</p>
          </div>
          <div class="m-5 pb-8">
            <h1 class="text-4xl font-bold mb-4">Attributions</h1>
            This site is built on the shoulders of giants and big thanks are offered to the following:
            <ul class="list-disc ml-7 mt-4">
              <li>Google's <a class="text-[#0000ee] visited:text-[#551A8B]" href="https://github.com/google/diff-match-patch" target="_blank">diff-match-patch</a> library for text diff</li>
              <li><a class="text-[#0000ee] visited:text-[#551A8B]" href="https://github.com/ABenassi87/ngx-text-diff">ngx-text-diff</a> for diff rendering</li>
              <li>xkcd's iconic <a class="text-[#0000ee] visited:text-[#551A8B]" href="https://xkcd.com/936/">correcthorsebatterystaple comic</a> comic for password generation inspiration</li>
              <li>The excellent <a class="text-[#0000ee] visited:text-[#551A8B]" href="https://github.com/ajaxorg/ace">Ace javasript editor</a></li>
              <li><a class="text-[#0000ee] visited:text-[#551A8B]" href="https://github.com/prettier/prettier">Prettier</a>  code formatting</li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
