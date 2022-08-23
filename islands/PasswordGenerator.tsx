/** @jsx h */
import { h } from "preact";
import { apply, tw } from "@twind";
import { NumberPicker } from "../components/numberPicker.tsx";
import { Checkbox } from "../components/checkbox.tsx";
import { SeparatorInput } from "../components/separatorInput.tsx";
import { IS_BROWSER } from "https://deno.land/x/fresh@1.0.0/runtime.ts";
import { useState } from "preact/hooks";
import { getSecureRandom } from "../util/secureRandom.ts";
import shuffle from "https://deno.land/x/shuffle@v1.0.1/mod.ts";
import { Toast } from "../components/toast.tsx";

interface State {
  minLength: number;
  minWords: number;
  separators: string;
  uppercaseFirstLetters: boolean;
  addNumber: boolean;
  saveOptions: boolean;
}

export default function PasswordGenerator() {
  const [state, setState] = useState<State>({
    minLength: 20,
    minWords: 4,
    separators: "-",
    uppercaseFirstLetters: true,
    addNumber: false,
    saveOptions: true,
  });
  const [wordList, setWordList] = useState<string[]>([]);
  const [password, setPassword] = useState("");
  const [fade, setFade] = useState(false);

  function generatePassword() {
    console.log("generating password...");
    if (wordList.length == 0) return;

    let words: string[] = [];
    for (let i = 0; notLongEnough(i, words); i++) {
      const wordIndex = getSecureRandom(0, wordList.length - 1);
      words.push(wordList[wordIndex]);
    }
    if (state.uppercaseFirstLetters) {
      words = words.map((e) => (e[0].toUpperCase() + e.slice(1)));
    }
    if (state.addNumber) {
      words.push("" + getSecureRandom(0, 9));
    }
    words = shuffle(words);
    setPassword(words.join(state.separators));
  }

  function notLongEnough(i: number, words: string[]): boolean {
    return i < state.minWords ||
      words.join(state.separators).length < state.minLength;
  }

  if (IS_BROWSER) {
    if (wordList.length == 0) {
      fetch("/word-list.txt")
        .then((result) => result.text())
        .then((text) => {
          const words: string[] = text.split("\n");
          wordList.push(...words);
          setWordList(wordList);
          generatePassword();
        });
    }
  }

  function onUpdateMinLength(value: number) {
    state.minLength = value;
    setState(state);
    generatePassword();
    console.log(state);
  }

  function onUpdateMinWords(value: number) {
    state.minWords = value;
    setState(state);
    generatePassword();
    console.log(state);
  }

  function onUpdateUppercase(value: boolean) {
    state.uppercaseFirstLetters = value;
    setState(state);
    generatePassword();
    console.log(state);
  }

  function onSaveOptions(value: boolean) {
    state.saveOptions = value;
    setState(state);
    console.log(state);
  }

  function onAddNumber(value: boolean) {
    state.addNumber = value;
    setState(state);
    generatePassword();
    console.log(state);
  }

  function onUpdateSeparator(value: string) {
    state.separators = value;
    setState(state);
    generatePassword();
    console.log(state);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(password);
    showToast();
  }

  function showToast() {
    setFade(true);
    setTimeout(() => {
      setFade(false);
    }, 3000)
  }

  const buttonStyle = apply`bg-gray-300 
                            hover:bg-gray-400 
                            text-gray-800 
                            bg-gray-300 
                            text-gray-600 
                            hover:text-gray-700 
                            hover:bg-gray-400 
                            focus:outline-none 
                            focus:border-yellow-600
                            focus:border-2
                            py-2 
                            px-4 
                            rounded 
                            inline-flex 
                            items-center`;

  return (
    <div class={tw`max-w-7xl mx-auto py-6 sm:px-3 lg:px-8`}>
      <div class={tw`px-4 py-6 sm:px-0`}>
        <div class={tw`bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4`}>
          <div class={tw`flex h-18 sm:flex-row flex-col`}>
            <div class={tw`w-full relative rounded-md shadow-sm`} onClick={() => copyToClipboard()}>
              <p id="pwd" class={tw`cursor-pointer w-full bg-blue-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center font-medium text-white text-2xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
                {password}
              </p>
            </div>
            <div class={tw`flex mt-3 sm:mt-0`}>
              <button class={tw`${buttonStyle} sm:ml-2`} onClick={() => generatePassword()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z" />
                </svg>
              </button>
              <button class={tw`${buttonStyle} ml-2 font-bold`} onClick={() => copyToClipboard()}>
                <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <g stroke="none" stroke-width="30" fill="none" fill-rule="evenodd">
                    <g fill="#212121" fill-rule="nonzero">
                      <path d="M5.50280381,4.62704038 L5.5,6.75 L5.5,17.2542087 C5.5,19.0491342 6.95507456,20.5042087 8.75,20.5042087 L17.3662868,20.5044622 C17.057338,21.3782241 16.2239751,22.0042087 15.2444057,22.0042087 L8.75,22.0042087 C6.12664744,22.0042087 4,19.8775613 4,17.2542087 L4,6.75 C4,5.76928848 4.62744523,4.93512464 5.50280381,4.62704038 Z M17.75,2 C18.9926407,2 20,3.00735931 20,4.25 L20,17.25 C20,18.4926407 18.9926407,19.5 17.75,19.5 L8.75,19.5 C7.50735931,19.5 6.5,18.4926407 6.5,17.25 L6.5,4.25 C6.5,3.00735931 7.50735931,2 8.75,2 L17.75,2 Z M17.75,3.5 L8.75,3.5 C8.33578644,3.5 8,3.83578644 8,4.25 L8,17.25 C8,17.6642136 8.33578644,18 8.75,18 L17.75,18 C18.1642136,18 18.5,17.6642136 18.5,17.25 L18.5,4.25 C18.5,3.83578644 18.1642136,3.5 17.75,3.5 Z">
                      </path>
                    </g>
                  </g>
                </svg>
              </button>
            </div>
          </div>
          <div class={tw`mt-2`}>
            <p class={tw`mt-2`}>Length: {password.length}</p>
          </div>
          <div class={tw`flex center`}>
            <hr class={tw`w-full mt-5 border-1`}/>
          </div>
          <div class={tw`mt-5 mb-5 flex justify-around flex-wrap`}>
            <NumberPicker name="Min Length" start={state.minLength} incrementAmount={5} onUpdate={onUpdateMinLength}/>
            <NumberPicker name="Min Words" start={state.minWords} incrementAmount={1} onUpdate={onUpdateMinWords}/>
            <SeparatorInput start={state.separators} onUpdate={onUpdateSeparator}/>
          </div>
          <div>
            <Checkbox label="Uppercase First Letters" id="uppercaseFirst" defaultState={state.uppercaseFirstLetters} onUpdate={onUpdateUppercase}/>
          </div>
          <div class={tw`mt-5`}>
            <Checkbox label="Add Number" id="addNumber" defaultState={state.addNumber} onUpdate={onAddNumber}/>
          </div>
          <div class={tw`mt-5`}>
            <Checkbox label="Save Options" id="saveOptions" defaultState={state.saveOptions} onUpdate={onSaveOptions}/>
          </div>
        </div>
      </div>
      <Toast id="passwordCopiedToast" message="Password copied to clipboard" fade={fade} type="info"/>
    </div>
  );
}
