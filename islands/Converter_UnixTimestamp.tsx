import { buttonStyle, labelStyle, secondaryButtonStyle } from "../util/styles.ts";
import { linkStyles } from "../util/styles.ts";

export default function TimestampConverter() {
  
  function maxLength(e: Event) {
    const target = e.target as HTMLInputElement;
    target.value = target.value.slice(0, target.maxLength);
  }

  function processDateTime() {
    const year = (document.getElementById('year') as HTMLInputElement).value;
    const month = (document.getElementById('month') as HTMLInputElement).value;
    const day = (document.getElementById('day') as HTMLInputElement).value;
    const hour = (document.getElementById('hour') as HTMLInputElement).value;
    const minute = (document.getElementById('minute') as HTMLInputElement).value;
    const second = (document.getElementById('second') as HTMLInputElement).value;
    const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`);

    const unixTimestampDetails = document.getElementById('unixTimestampDetails')!;
    const unixTimestampError = document.getElementById('unixTimestampError')!;
    
    //validate date
    if (!isValidNum(year, 1970, 9999) 
        || !isValidNum(month, 1, 12) 
        || !isValidNum(day, 1, 31) 
        || !isValidNum(hour, 0, 23) 
        || !isValidNum(minute, 0, 59) 
        || !isValidNum(second, 0, 59)) { 
      unixTimestampDetails.classList.add('hidden');
      unixTimestampError.classList.remove('hidden');
      return;
    }

    const unixTimestamp = date.getTime() / 1000;
    const unixTimestampSeconds = document.getElementById('unixTimestampSeconds')!;
    unixTimestampSeconds.innerHTML = unixTimestamp.toString();
    const unixTimestampMilliseconds = document.getElementById('unixTimestampMilliseconds')!;
    unixTimestampMilliseconds.innerHTML = (unixTimestamp * 1000).toString();

    const relativeTime = document.getElementById('unixTimestampRelative')!;
    relativeTime.innerHTML = getRelativeDate(date);

    unixTimestampDetails.classList.remove('hidden');
    unixTimestampError.classList.add('hidden');
  }

  function processEpoch() {
    const dateTimeDetails = document.getElementById("dateTimeDetails")!;
    const dateTimeError = document.getElementById("dateTimeError")!;
    const epoch = document.getElementById("unixTimestampInput") as HTMLInputElement;
    
    //validate epoch
    if (!isValidNum(epoch.value, -8.64e12, 8.64e12)) {
      dateTimeDetails.classList.add("hidden");
      dateTimeError.classList.remove("hidden");
      return;
    }

    const unixTimestamp = parseInt(epoch.value);
    const date = new Date(unixTimestamp * 1000);
    document.getElementById("epochAsGMTDate")!.innerHTML = date.toUTCString();
    const options = { 
      weekday: "short" as const, 
      year: 'numeric' as const, 
      month: 'short' as const, 
      day: '2-digit' as const, 
      hour: 'numeric' as const, 
      minute: 'numeric' as const, 
      second: 'numeric' as const, 
      timeZoneName: 'short' as const 
    };
    const epochAsLocalDate = new Intl.DateTimeFormat(navigator.language, options).format(date) + " " + getGMTOffset(date);
    const epochAsLocalDateParts = epochAsLocalDate.split(",");
    const epochAsLocalDateReformatted = epochAsLocalDateParts[0] + ", " + epochAsLocalDateParts.slice(1).join("");
    document.getElementById("epochAsLocalDate")!.innerHTML = epochAsLocalDateReformatted;
    document.getElementById("dateTimeRelative")!.innerHTML = getRelativeDate(date);
    dateTimeDetails.classList.remove("hidden");
    dateTimeError.classList.add("hidden");
  }

  function isValidNum(input:string, min:number, max:number): boolean {
    const num = parseInt(input);
    return !isNaN(num) && num >= min && num <= max;
  }

  function getGMTOffset(date:Date): string {
    const offset = date.getTimezoneOffset() / 60 * -1;
    if (offset > 0) {
      return `(GMT+${offset})`;
    }
    else if (offset < 0) {
      return `(GMT${offset})`;
    }
    else {
      return "";
    }
  }

  function getRelativeDate(referenceDate:Date): string {
    const now = new Date();
    const diff = now.getTime() - referenceDate.getTime();
    const diffSeconds = Math.floor(diff / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);
    if (diffYears > 0) {
      return `${diffYears} years ago`;
    }
    else if (diffMonths > 0) {
      return `${diffMonths} months ago`;
    }
    else if (diffWeeks > 0) {
      return `${diffWeeks} weeks ago`;
    }
    else if (diffDays > 0) {
      return `${diffDays} days ago`;
    }
    else if (diffHours > 0) {
      return `${diffHours} hours ago`;
    }
    else if (diffMinutes > 0) {
      return `${diffMinutes} minutes ago`;
    }
    else if (diffSeconds > 0) {
      return `${diffSeconds} seconds ago`;
    }
    else {
      return 'just now';
    }
  }

  function now() {
    const now = new Date();
    (document.getElementById('year') as HTMLInputElement).value = now.getFullYear().toString();
    (document.getElementById('month') as HTMLInputElement).value = (now.getMonth() + 1).toString().padStart(2, '0');
    (document.getElementById('day') as HTMLInputElement).value = now.getDate().toString().padStart(2, '0');
    (document.getElementById('hour') as HTMLInputElement).value = now.getHours().toString().padStart(2, '0');
    (document.getElementById('minute') as HTMLInputElement).value = now.getMinutes().toString().padStart(2, '0');
    (document.getElementById('second') as HTMLInputElement).value = now.getSeconds().toString().padStart(2, '0');
  }

  return (
    <div>
      Convert a <a class={linkStyles} href="https://en.wikipedia.org/wiki/Unix_time">UNIX timestamp</a> to a date and time or vice-versa.
      <div class="flex flex-col lg:flex-row justify-center divide-y-1 lg:divide-y-0 lg:divide-x-1 divide-gray-500 mt-8 pb-8">
        <div class="pr-10" id="epochConversion">
          <div class="flex flex-col mt-5">
            <label class={labelStyle} for="unixTimestampInput">Enter a UNIX timestamp/epoch</label>
            <input id="unixTimestampInput" aria-label="Unix timestamp input field" class="w-[200px] h-10 p-2 border(2 gray-300 dark:[#aaa]) rounded-sm bg(white dark:[#505050]) text-lg focus:border-yellow-600 focus:outline-none text-lg"/>
          </div>
          <div class="flex mt-11">
            <button onClick={processEpoch} class={buttonStyle}>
              Convert to Date/Time
            </button>
          </div>
          <div class="flex flex-col mt-8 w-[350px]">
            <div id="dateTimeDetails" class="flex flex-col mb-5 hidden">
              <div><p>This epoch translates to:</p></div>
              <div class="mt-5 text-sm">Date/time GMT:</div>
              <div class="mt-1 font-semibold text-base"><span id="epochAsGMTDate"></span></div>
              <div class="mt-5 text-sm">Date/time Local:</div>
              <div class="mt-1 font-semibold text-base"><span id="epochAsLocalDate"></span></div>
              <div class="mt-5 text-sm">Relative time:</div>
              <div class="mt-1 font-semibold text-base"><span id="dateTimeRelative"></span></div>
            </div>
            <div id="dateTimeError" class="flex flex-col mt-4 hidden">
              <p class="text-red-600 dark:text-red-400">Please enter a valid unix timestamp</p>
              <p class="text-red-600 dark:text-red-400">(e.g. {new Date().getTime()})</p>
            </div>
          </div>
        </div>
        <div class="lg:pl-10" id="dateTimeConversion">
          <div class="flex mt-5">
            <div class="flex flex-col">
              <label class={labelStyle} for="dateInputs">Enter a Date/Time</label>
              <div id="dateInputs" class="flex flex-col sm:flex-row">
                <div class="flex">
                  <div class="flex flex-col items-center">  
                    <input id="year" maxLength={4} onInput={maxLength} aria-label="Year input field" class="w-[58px] h-10 font-semibold border(2 gray-300 dark:[#aaa]) rounded-sm bg(white dark:[#606060]) focus:border-yellow-600 focus:outline-none text-lg text-center"/>
                    <label for="year" class="text-sm mt-1">Year</label>
                  </div>
                  <div>
                    <p class="px-2 text-lg mt-1">/</p>
                  </div>
                  <div class="flex flex-col items-center">  
                    <input id="month" maxLength={2} onInput={maxLength} aria-label="Month input field" class="w-[45px] h-10 font-semibold border(2 gray-300 dark:[#aaa]) rounded-sm bg(white dark:[#606060]) focus:border-yellow-600 focus:outline-none text-lg text-center"/>
                    <label for="month" class="text-sm mt-1">Mon</label>
                  </div>
                  <div>
                    <p class="px-2 text-lg mt-1">/</p>
                  </div>
                  <div class="flex flex-col items-center">  
                    <input id="day" maxLength={2} onInput={maxLength} aria-label="Day input field" class="w-[45px] h-10 font-semibold border(2 gray-300 dark:[#aaa]) rounded-sm bg(white dark:[#606060]) focus:border-yellow-600 focus:outline-none text-lg text-center"/>
                    <label for="day" class="text-sm mt-1">Day</label>
                  </div>
                </div>
                <div class="flex">
                  <div class="flex sm:ml-10 mt-5 sm:mt-0">
                    <div class="flex flex-col items-center">  
                      <input id="hour" maxLength={2} onInput={maxLength} aria-label="Hour input field" class="w-[45px] h-10 font-semibold border(2 gray-300 dark:[#aaa]) rounded-sm bg(white dark:[#606060]) focus:border-yellow-600 focus:outline-none text-lg text-center"/>
                      <label for="hour" class="text-sm mt-1">Hour</label>
                    </div>
                    <div>
                      <p class="px-2 text-lg mt-1">:</p>
                    </div>
                    <div class="flex flex-col items-center">  
                      <input id="minute" maxLength={2} onInput={maxLength} aria-label="Minute input field" class="w-[45px] h-10 font-semibold border(2 gray-300 dark:[#aaa]) rounded-sm bg(white dark:[#606060]) focus:border-yellow-600 focus:outline-none text-lg text-center"/>
                      <label for="minute" class="text-sm mt-1">Min</label>
                    </div>
                    <div>
                      <p class="px-2 text-lg mt-1">:</p>
                    </div>
                    <div class="flex flex-col items-center">  
                      <input id="second" maxLength={2} onInput={maxLength} aria-label="Second input field" class="w-[45px] h-10 font-semibold border(2 gray-300 dark:[#aaa]) rounded-sm bg(white dark:[#606060]) focus:border-yellow-600 focus:outline-none text-lg text-center"/>
                      <label for="second" class="text-sm mt-1">Sec</label>
                    </div>
                    <div>
                      <button onClick={now} class={`ml-8 ` + secondaryButtonStyle}>Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col items-start">
            <button onClick={processDateTime} class={`mt-5 ` + buttonStyle}>
              Convert to Unix Timestamp
            </button>
          </div>
          <div class="flex flex-col">
            <div id="unixTimestampDetails" class="flex flex-col mt-8 hidden">
              <div><p>This date translates to:</p></div>
              <div class="mt-5 text-sm">Epoch timestamp (seconds):</div>
              <div class="mt-1 text-base font-semibold"><span id="unixTimestampSeconds"></span></div>
              <div class="mt-5 text-sm ">Epoch timestamp (milliseconds):</div>
              <div class="mt-1 text-base font-semibold"><span id="unixTimestampMilliseconds"></span></div>
              <div class="mt-5 text-sm">Relative time:</div>
              <div class="mt-1 text-base font-semibold"><span id="unixTimestampRelative"></span></div>
            </div>
            <div id="unixTimestampError" class="flex flex-col mt-4 hidden">
              <p class="text-red-600 dark:text-red-400">Please enter a valid date</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}