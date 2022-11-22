import { NumberPicker } from "../components/numberPicker.tsx";
import { Checkbox } from "../components/checkbox.tsx";
import { SeparatorInput } from "../components/separatorInput.tsx";
import { Head, IS_BROWSER } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import { getSecureRandom } from "../util/secureRandom.ts";
import shuffle from "https://deno.land/x/shuffle@v1.0.1/mod.ts";
import { Toast } from "../components/toast.tsx";
import { Fragment } from "preact/jsx-runtime";

interface State {
  minLength: number;
  minWords: number;
  separators: string;
  uppercaseFirstLetters: boolean;
  addNumber: boolean;
  saveOptions: boolean;
  hibp: boolean; // Have I been pwned?
}

export default function PasswordGenerator() {
  const LOCAL_STORAGE_STATE_KEY = 'passwordGenerator_state';
  const LOCAL_STORAGE_SHOULD_STORE_KEY = 'passwordGenerator_isStore';

  const defaultState: State = {
    minLength: 20,
    minWords: 4,
    separators: "-",
    uppercaseFirstLetters: true,
    addNumber: false,
    saveOptions: true,
    hibp: true,
  };

  const state = useSignal<State>(defaultState);
  const wordList = useSignal<string[]>([]);
  const password = useSignal("");
  const fade = useSignal(false);

  if (IS_BROWSER) {
    const isStore = window.localStorage.getItem(LOCAL_STORAGE_SHOULD_STORE_KEY);
    if (isStore && isStore == "true") {
      const storageStateRaw = window.localStorage.getItem(LOCAL_STORAGE_STATE_KEY);
      if (storageStateRaw) {
        const storageState = JSON.parse(storageStateRaw) as State;
        state.value.addNumber = storageState.addNumber;
        state.value.minLength = storageState.minLength;
        state.value.minWords = storageState.minWords;
        state.value.separators = storageState.separators;
        state.value.uppercaseFirstLetters = storageState.uppercaseFirstLetters;
        state.value.hibp = storageState.hibp;
      }
    } else if (isStore && isStore == "false") {
      state.value.saveOptions = false;
    } else {
      //first visit
      window.localStorage.setItem(LOCAL_STORAGE_SHOULD_STORE_KEY, "true");
    }
  } else {
    // Default SSR rendering to all empty checkboxes to reduce screen flicker as saved options kicks in 
    // and causes some of them to be ticked/unticked
    state.value.uppercaseFirstLetters = false;
    state.value.saveOptions = false;
    state.value.hibp = false;
  }

  async function generatePassword(e?:Event) {
    if (wordList.value.length == 0) return;
    password.value = "";

    let words: string[] = [];
    for (let i = 0; notLongEnough(i, words); i++) {
      const wordIndex = getSecureRandom(0, wordList.value.length - 1);
      words.push(wordList.value[wordIndex]);
    }
    if (state.value.uppercaseFirstLetters) {
      words = words.map((e) => (e[0].toUpperCase() + e.slice(1)));
    }
    if (state.value.addNumber) {
      words.push("" + getSecureRandom(0, 9));
    }
    words = shuffle(words);

    const newPassword = words.join(state.value.separators);
    if (state.value.hibp && await isPasswordPawned(newPassword)) {
      // password is pawned (exists in data breach), try again
      generatePassword();
    } else {
      password.value = newPassword;
    }

    if (e) {
      setTimeout(() => {
        e.target!.blur();
      }, 300);
     }
  }

  async function isPasswordPawned(password: string) {
    const passwordHash = (await sha1(password)).toUpperCase();
    const [sha1Prefix, sha1Suffix] = [passwordHash.slice(0, 5), passwordHash.slice(5)];

    const response = await fetch(`https://api.pwnedpasswords.com/range/${sha1Prefix}`);
    const pwnedPasswords = await response.text();
    const pwnedPasswordsArray = pwnedPasswords.split("\n");
    const pwnedPassword = pwnedPasswordsArray.find((e) => e.startsWith(sha1Suffix));
    if (pwnedPassword) {
      const pwnedCount = pwnedPassword.split(":")[1];
      console.log(`Password has been pwned ${pwnedCount} times, regenerating`);
      return true;
    }  
    return false;
  }


  async function sha1(input:string) {
    const buffer = new TextEncoder().encode(input);
    const digest = await crypto.subtle.digest('SHA-1', buffer);
    // Convert digest to hex string
    const result = Array.from(new Uint8Array(digest)).map(x => x.toString(16).padStart(2,'0')).join('');
    return result;
  }
    
  function notLongEnough(i: number, words: string[]): boolean {
    return i < state.value.minWords ||
      words.join(state.value.separators).length < state.value.minLength;
  }

  if (IS_BROWSER) {
    if (wordList.value.length == 0) {
      fetch("/word-list.txt")
        .then((result) => result.text())
        .then((text) => {
          const words: string[] = text.split("\n");
          wordList.value.push(...words);
          generatePassword();
        });
    }
  }

  function onUpdateMinLength(value: number) {
    state.value.minLength = value;
    generatePassword();
    updateStorage();
  }

  function onUpdateMinWords(value: number) {
    state.value.minWords = value;
    generatePassword();
    updateStorage();
  }

  function onUpdateUppercase(value: boolean) {
    state.value.uppercaseFirstLetters = value;
    generatePassword();
    updateStorage();
  }

  function onSaveOptions(value: boolean) {
    state.value.saveOptions = value;
    window.localStorage.setItem(LOCAL_STORAGE_SHOULD_STORE_KEY, "" + state.value.saveOptions);

    if (!state.value.saveOptions) {
      window.localStorage.removeItem(LOCAL_STORAGE_STATE_KEY);
    } else {
      updateStorage();
    }
  }

  function onHibp(value: boolean) {
    state.value.hibp = value;
    generatePassword();
    updateStorage();
  }

  function onAddNumber(value: boolean) {
    state.value.addNumber = value;
    generatePassword();
    updateStorage();
  }

  function onUpdateSeparator(value: string) {
    state.value.separators = value;
    generatePassword();
    updateStorage();
  }

  function copyToClipboard(e:Event) {
    navigator.clipboard.writeText(password.value);
    showToast();
    setTimeout(() => {
      e.target!.blur();
    }, 300);
  }

  function showToast() {
    fade.value = true;
    setTimeout(() => {
      fade.value = false;
    }, 3000)
  }

  function updateStorage() {
    if (state.value.saveOptions) {
      window.localStorage.setItem(LOCAL_STORAGE_STATE_KEY, JSON.stringify(state.value));
    }
  }
  
  const buttonStyle = `bg(gray-300 dark:[#505050] hover:gray-400 dark:hover:[#606060])
                            focus:(outline-1 outline-pink-500)
                            py-2 
                            px-4 
                            rounded 
                            inline-flex 
                            items-center`;

  return (
    <Fragment>
      <Head>
        <title>Generate easy to remember secure passwords</title>
      </Head>
      <div class="max-w-5xl w-full mx-auto sm:px-3 lg:px-8">
        <div class="sm:px-4 py-6 px-0">
          <div class="bg(gray-100 dark:[#272727]) shadow-md rounded px-2 sm:px-4 lg:px-8 pt-6 pb-8 mb-4">
            <div class="flex h-18 sm:flex-row flex-col">
              <div class="w-full relative rounded-md shadow-sm" onClick={(e:Event) => copyToClipboard(e)}>
                <p id="pwd" class="min-h-[58px] cursor-pointer w-full bg(blue-500) border border-transparent rounded-md py-3 px-8 flex items-center justify-center font-medium text-white text-2xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  {password.value}
                </p>
              </div>
              <div class="flex mt-3 sm:mt-0">
                <button aria-label="Generate another password" title="Generate another password" class={`${buttonStyle} sm:ml-2`} onClick={(e:Event) => generatePassword(e)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z" />
                  </svg>
                </button>
                <button aria-label="Copy password to clipboard" title="Copy password to clipboard" class={`${buttonStyle} ml-2 font-bold`} onClick={(e:Event) => copyToClipboard(e)}>
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
            <div class="mt-2">
              <p class="mt-2">Length: {password.value.length}</p>
            </div>
            <div class="flex center">
              <hr class="w-full mt-5 h-px border-0 bg-gray-300 dark:bg-[#808080]"/>
            </div>
            <div class="mb-5 flex justify-around flex-wrap">
              <NumberPicker name="Min Length" start={state.value.minLength} minVal={10} incrementAmount={5} onUpdate={onUpdateMinLength}/>
              <NumberPicker name="Min Words" start={state.value.minWords} minVal={1} incrementAmount={1} onUpdate={onUpdateMinWords}/>
              <SeparatorInput start={state.value.separators} onUpdate={onUpdateSeparator}/>
            </div>
            <div>
              <Checkbox label="Uppercase First Letters" id="uppercaseFirst" defaultState={state.value.uppercaseFirstLetters} onUpdate={onUpdateUppercase}/>
            </div>
            <div class="mt-5">
              <Checkbox label="Add Number" id="addNumber" defaultState={state.value.addNumber} onUpdate={onAddNumber}/>
            </div>
            <div class="mt-5">
              <Checkbox label="Save Options" id="saveOptions" defaultState={state.value.saveOptions} onUpdate={onSaveOptions}/>
            </div>
            <div class="mt-5">
              <Checkbox label="Ensure password not found in public data breaches" id="hibp" defaultState={state.value.hibp} onUpdate={onHibp}/>
            </div>
          </div>
        </div>
        <Toast id="passwordCopiedToast" message="Password copied to clipboard" fade={fade.value} type="info"/>
      </div>
    </Fragment>
  );
}
