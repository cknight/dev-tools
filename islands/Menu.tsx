import { Fragment } from "preact/jsx-runtime";
import { Head, IS_BROWSER } from "$fresh/runtime.ts";
import { ENCODER_DECODER, FORMATTER, PASSWORD_GENERATOR, TEXT_DIFF } from "../util/menuItems.ts";

interface MenuProps {
  title: string;
  page: string;
}

export default function Menu(props:MenuProps) {

  if (IS_BROWSER) {
    const menuItems: HTMLCollectionOf<Element> = document.getElementsByClassName(props.page);
    for (let i=0; i < menuItems.length; i++) {
      setTimeout(() => {
        (menuItems[i] as HTMLElement).style.color = "#d43900";
        menuItems[i].classList.add('border-opacity-100');
        menuItems[i].classList.remove('border-opacity-0');
      }, 0);
    }
  }

  function toggleMenu() {
    const menu = document.getElementById('menu');
    const popupMenu = document.getElementById('popupMenu');
    if (menu) {
      if (menu.classList.contains('open')) {
        menu.classList.remove('open');
        popupMenu?.classList.add('hidden');
      } else {
        menu.classList.add('open');
        popupMenu?.classList.remove('hidden');
      }
    }
  }

  return (
    <Fragment>
      <Head>
        <title>Dev Tools {props.title}</title>
        <style>{`

        #menu {
          width: 30px;
          height: 15px;
          position: relative;
          margin: 0px auto;
          -webkit-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          transform: rotate(0deg);
          -webkit-transition: .5s ease-in-out;
          -moz-transition: .5s ease-in-out;
          -o-transition: .5s ease-in-out;
          transition: .5s ease-in-out;
          cursor: pointer;
        }

        #menu span {
          display: block;
          position: absolute;
          height: 2px;
          width: 100%;
          background: #555555;
          border-radius: 4px;
          opacity: 1;
          left: 0;
          -webkit-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          transform: rotate(0deg);
          -webkit-transition: .25s ease-in-out;
          -moz-transition: .25s ease-in-out;
          -o-transition: .25s ease-in-out;
          transition: .25s ease-in-out;
        }

        #menu {
        }

        #menu span:nth-child(1) {
          top: 0px;
          -webkit-transform-origin: left center;
          -moz-transform-origin: left center;
          -o-transform-origin: left center;
          transform-origin: left center;
        }

        #menu span:nth-child(2) {
          top: 9px;
          -webkit-transform-origin: left center;
          -moz-transform-origin: left center;
          -o-transform-origin: left center;
          transform-origin: left center;
        }

        #menu span:nth-child(3) {
          top: 18px;
          -webkit-transform-origin: left center;
          -moz-transform-origin: left center;
          -o-transform-origin: left center;
          transform-origin: left center;
        }

        #menu.open span:nth-child(1) {
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          -o-transform: rotate(45deg);
          transform: rotate(45deg);
          top: 0px;
          left: 8px;
        }

        #menu.open span:nth-child(2) {
          width: 0%;
          opacity: 0;
        }

        #menu.open span:nth-child(3) {
          -webkit-transform: rotate(-45deg);
          -moz-transform: rotate(-45deg);
          -o-transform: rotate(-45deg);
          transform: rotate(-45deg);
          top: 21px;
          left: 8px;
        }
        `}</style>
      </Head>
      <div id="popupMenu" class="hidden w-[180px] bg-white text-base z-50 absolute top-0 right-0 mt-20 list-none text-left rounded shadow-lg min-w-48">
        <a href="/password-generator" class={PASSWORD_GENERATOR + " flex md:hidden items-end p-4 border-b-2 border-[#d43900] border-opacity-0 hover:border-opacity-100 hover:text-[#d43900] duration-200 cursor-pointer active"}>
          <div class="w-[20px] mr-2 flex justify-center items-center">
            <svg class="h-[30px]" version="1.1" id="Layer_1" x="0px" y="0px" width="94.38px" height="122.88px" viewBox="0 0 94.38 122.88" enable-background="new 0 0 94.38 122.88" >
              <g>
                <path fill="#d43900" d="M8.723,45.706h2.894v-8.729c0-10.139,3.987-19.368,10.412-26.069C28.479,4.177,37.386,0,47.19,0 c9.805,0,18.711,4.177,25.163,10.907c6.424,6.701,10.411,15.931,10.411,26.069v8.729h2.894c2.401,0,4.583,0.98,6.162,2.56 s2.56,3.761,2.56,6.162v59.73c0,2.401-0.98,4.583-2.56,6.162s-3.761,2.56-6.162,2.56H8.723c-2.402,0-4.583-0.98-6.163-2.56 S0,116.56,0,114.158v-59.73c0-2.401,0.981-4.583,2.56-6.162C4.14,46.687,6.321,45.706,8.723,45.706L8.723,45.706z M44,87.301 L39.81,98.28h14.762l-3.884-11.13c2.465-1.27,4.15-3.84,4.15-6.803c0-4.223-3.425-7.647-7.647-7.647 c-4.223,0-7.648,3.425-7.648,7.647C39.542,83.432,41.369,86.091,44,87.301L44,87.301z M17.753,45.706h58.875v-8.729 c0-8.511-3.326-16.236-8.686-21.826C62.61,9.589,55.265,6.137,47.19,6.137S31.77,9.589,26.438,15.15 c-5.359,5.59-8.686,13.315-8.686,21.826V45.706L17.753,45.706z M85.658,51.843H8.723c-0.708,0-1.353,0.292-1.823,0.762 c-0.47,0.47-0.762,1.116-0.762,1.823v59.73c0,0.707,0.292,1.353,0.762,1.822c0.47,0.471,1.116,0.762,1.823,0.762h76.936 c0.708,0,1.354-0.291,1.823-0.762c0.47-0.47,0.762-1.115,0.762-1.822v-59.73c0-0.707-0.292-1.353-0.762-1.823 C87.011,52.135,86.366,51.843,85.658,51.843L85.658,51.843z"/>
              </g>
            </svg>
          </div>
          <div class="">Passwords</div>
        </a>
        <a href="/encoding-decoding" class={ENCODER_DECODER + " flex md:hidden items-end p-4 border-b-2 border-[#d43900] border-opacity-0 hover:border-opacity-100 hover:text-[#d43900] duration-200 cursor-pointer active"}>
          <div class="w-[25px] mr-2 ml-[-4px] flex justify-center items-center">
            <svg class="h-[30px]" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 378.01">
              <path fill="#d43900" fill-rule="nonzero" d="M287.35 173.92H151.37v59.11c0 4.51-3.66 8.17-8.17 8.17-2.25 0-4.29-.91-5.77-2.39L2.93 126.84c-3.45-2.87-3.92-8.01-1.05-11.46.34-.41.72-.78 1.12-1.11L137.99 1.88c3.46-2.87 8.6-2.4 11.47 1.05a8.144 8.144 0 0 1 1.88 5.21h.03v59.11h135.98c4.51 0 8.17 3.66 8.17 8.17v90.33c0 4.51-3.66 8.17-8.17 8.17zm-62.7 30.17h135.98v-59.11a8.173 8.173 0 0 1 13.94-5.79l134.5 111.97a8.158 8.158 0 0 1-.07 12.58L374.01 376.13a8.15 8.15 0 0 1-11.47-1.06 8.098 8.098 0 0 1-1.88-5.2h-.03v-59.11H224.65c-4.51 0-8.17-3.66-8.17-8.17v-90.33c0-4.51 3.66-8.17 8.17-8.17zm144.15 16.34H232.82v73.98H368.8c4.51 0 8.17 3.66 8.17 8.18v49.88l114.17-95.05-114.17-95.04v49.88c0 4.51-3.66 8.17-8.17 8.17zm-225.6-62.85h135.98V83.6H143.2c-4.51 0-8.17-3.67-8.17-8.18V25.54L20.86 120.59l114.17 95.04v-49.88c0-4.51 3.66-8.17 8.17-8.17z"/>
            </svg>
          </div>
          <div>
            Encoding
          </div>
        </a>
        <a href="/format-validate" class={FORMATTER + " flex md:hidden items-end p-4 border-b-2 border-[#d43900] border-opacity-0 hover:border-opacity-100 hover:text-[#d43900] duration-200 cursor-pointer active"}>
          <div class="w-[20px] mr-2 flex justify-center items-center">
            <svg class="h-[30px]" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 386">
              <path fill="#d43900" fill-rule="nonzero" d="M0 362.47h512V386H0v-23.53z M0 0h512v23.54H0V0zm111.22 192.4L3.88 107.07v171.86c33.4-28.62 74.84-57.14 108.17-85.82l-.83-.71zm83.41 49.25H512v23.53H194.63v-23.53zm0-120.82H512v23.53H194.63v-23.53z"/>
            </svg>            
          </div>
          <div>
            Formatting
          </div>
        </a>
        <a href="/text-diff" class={TEXT_DIFF + " flex md:hidden items-end p-4 border-b-2 border-[#d43900] border-opacity-0 hover:border-opacity-100 hover:text-[#d43900] duration-200 cursor-pointer active"}>
          <div class="w-[20px] mr-2 flex justify-center items-center">
            <svg class="h-[30px]" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99.8 122.88">
              <title>compare file</title>
              <path fill="#d43900" fill-rule="evenodd" d="M67.47,118.48a4.4,4.4,0,0,1-4.38,4.4H4.4a4.38,4.38,0,0,1-3.11-1.29A4.35,4.35,0,0,1,0,118.48V41.69a4.4,4.4,0,0,1,4.4-4.4H29V25.55a2.57,2.57,0,0,1,1.87-2.48L53.55,1a2.52,2.52,0,0,1,2-.95H95.18A4.63,4.63,0,0,1,99.8,4.62V85.23a4.63,4.63,0,0,1-4.62,4.62H67.48v28.63ZM34.11,37.29h8.06a2.4,2.4,0,0,1,1.88.9L65.7,59.27a2.44,2.44,0,0,1,1.78,2.36V84.69H94.64V53.82H87.08v5.84c-.11,2.52-2,3.45-4.28,2.67a1.24,1.24,0,0,1-.36-.19C76.62,57.57,72.6,53,66.77,48.42l-.08-.07c-1.77-1.62-1.25-3.46.47-4.81L81.45,30.86a6.91,6.91,0,0,1,2.11-1.18,2.45,2.45,0,0,1,3.17,1.38,5.05,5.05,0,0,1,.35,2c0,1.81,0,3.64,0,5.45h7.56V5.13H58.12V26.05a2.59,2.59,0,0,1-2.59,2.59H34.11v8.65ZM53,9,37.53,23.48H53V9Zm-40.84,65H4.91V42.18H39.7V62.1a2.47,2.47,0,0,0,2.47,2.47h20.4q0,26.7,0,53.4H4.91V88.64h7.21V94.2c.1,2.4,1.88,3.28,4.07,2.54a1,1,0,0,0,.34-.18c5.55-4.36,9.38-8.71,14.93-13.07l.07-.07c1.7-1.53,1.19-3.29-.44-4.58L17.48,66.77a6.43,6.43,0,0,0-2-1.13,2.34,2.34,0,0,0-3,1.32,4.78,4.78,0,0,0-.32,1.9c0,1.73,0,3.47,0,5.19ZM44.61,45.89l14.7,13.77H44.61V45.89Z"/>
            </svg>
          </div>
          Diffs
        </a>
        <div class="block md:hidden h-0 mx-4 my-2 border border-solid border-blueGray-100"></div>
        <a href="./about" class="flex items-end p-4 border-b-2 border-[#d43900] border-opacity-0 hover:border-opacity-100 hover:text-[#d43900] duration-200 cursor-pointer active">
          <div class="w-[20px] mr-2 flex justify-center items-center">
            <svg width="25px" height="25px" viewBox="0 0 330 330">
              <g>
                <path fill="#d43900" d="M165,0.008C74.019,0.008,0,74.024,0,164.999c0,90.977,74.019,164.992,165,164.992s165-74.015,165-164.992
                  C330,74.024,255.981,0.008,165,0.008z M165,299.992c-74.439,0-135-60.557-135-134.992S90.561,30.008,165,30.008
                  s135,60.557,135,134.991C300,239.436,239.439,299.992,165,299.992z"/>
                <path fill="#d43900" d="M165,130.008c-8.284,0-15,6.716-15,15v99.983c0,8.284,6.716,15,15,15s15-6.716,15-15v-99.983
                  C180,136.725,173.284,130.008,165,130.008z"/>
                <path fill="#d43900" d="M165,70.011c-3.95,0-7.811,1.6-10.61,4.39c-2.79,2.79-4.39,6.66-4.39,10.61s1.6,7.81,4.39,10.61
                  c2.79,2.79,6.66,4.39,10.61,4.39s7.81-1.6,10.609-4.39c2.79-2.8,4.391-6.66,4.391-10.61s-1.601-7.82-4.391-10.61
                  C172.81,71.61,168.95,70.011,165,70.011z"/>
              </g>
            </svg>
          </div>
          <div>
            About
          </div>
        </a>
        <a href="https://github.com/cknight/dev-tools" class="flex p-4 border-b-2 border-[#d43900] border-opacity-0 hover:border-opacity-100 hover:text-[#d43900] duration-200 cursor-pointer active">
          <div class="w-[20px] mr-2 flex justify-center items-center">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#d43900" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          <div>
            Contribute
          </div>
        </a>
      </div>
      <div class="flex flex-col">
        <header class="bg-white shadow-md flex items-center justify-between px-8 py-02 h-[59px]">
            <h1>
                <a href="/" class="flex items-center">
                  <svg class="h-[30px]" viewBox="0 0 998.37738 995.2413">
                    <g id="layer1" transform="translate(679.96 312.86)">
                      <path fill="#f08900" d="m-304-312.85c-28.306-0.63933-56.295 30.095-45.384 59.051 9.941 22.046-31.466 33.404-48.035 43.762-58.499 22.387-97.839 72.838-142.39 114.23-38.547 38.99-83.599 74.322-105.06 126.5-15.246 34.535-21.84 72.362-21.159 109.4 0.51501 40.715 8.594 81.016 20.584 119.82 0.91034-19.377-6.3635-39.9-0.0439-59.758 12.549-58.196 44.93-115.47 96.469-147.31 22.629-13.759 52.31-16.008 75.365-1.9712 10.951 3.4994 22.108 2.6065 32.188-1.3423l620.29 620.29c16.449 16.449 42.933 16.449 59.382 0l38.545-38.545c16.449-16.449 16.449-42.933 0-59.382l-619.31-619.32c12.348-19.881 5.6153-44.305 3.584-66.219 4.2-31.366 34.975-47.752 56.677-66.655 12.179 15.186 31.661 27.07 51.477 18.768 30.238-8.7764 44.873-53.124 18.545-74.178-24.347-23.567-47.181-48.885-72.541-71.284-6.0915-3.8965-12.639-5.7153-19.171-5.8628zm454.8 31.312c-2.096 0.001-4.1918 0.0416-6.2889 0.12172-73.419 2.806-136.45 53.111-155.46 124.08-7.7631 29.243-7.464 60.042 0.86556 89.129l-159.33 159.33 97.928 97.93 151.31-151.32c8.9202 4.1964 18.193 7.5974 27.711 10.164 89.396 23.954 181.28-29.098 205.24-118.49 3.7618-14.135 5.6566-28.702 5.6363-43.329l-121.21 69.982-83.787-145.12 121.08-69.904c-12.613-7.3469-26.133-13.014-40.215-16.858-14.189-3.8024-28.809-5.7198-43.481-5.7107zm-452.76 505.21-190.74 190.74c-4.256-1.6559-8.5914-3.1003-12.99-4.3278-73.879-19.795-149.82 24.048-169.61 97.927-3.1093 11.682-4.6756 23.721-4.6592 35.809l100.17-57.834 69.245 119.94-100.07 57.773c10.426 6.0714 21.6 10.754 33.24 13.93 73.88 19.795 149.82-24.05 169.61-97.93 4.9726-18.689 5.9758-38.213 2.9449-57.313l200.79-200.79-97.927-97.927z"/>
                    </g>
                  </svg>
                  {/* <img width="30px" height="30px" alt="Crossed tools logo" src="/CrossedTools_orange.png"/> */}
                  <p class="block ml-2 font-semibold text-lg">Dev&nbsp;Tools</p>
                </a>
            </h1>
            <nav class="hidden md:block font-semibold text-m">
                <ul class="flex items-center">
                    <li class={PASSWORD_GENERATOR + " p-4 border-b-[3px] border-[#d43900] border-opacity-0 hover:border-opacity-100 hover:text-[#d43900] duration-200 cursor-pointer active"}>
                      <a href="/password-generator">Passwords</a>
                    </li>
                    <li class={ENCODER_DECODER + " p-4 border-b-[3px] border-[#d43900] border-opacity-0 hover:border-opacity-100 hover:text-[#d43900] duration-200 cursor-pointer"}>
                      <a href="/encoding-decoding">Encoding</a>
                    </li>
                    <li class={FORMATTER + " p-4 border-b-[3px] border-[#d43900] border-opacity-0 hover:border-opacity-100 hover:text-[#d43900] duration-200 cursor-pointer"}>
                      <a href="/format-validate">Formatting</a>
                    </li>
                    <li class={TEXT_DIFF + " p-4 border-b-[3px] border-[#d43900] border-opacity-0 hover:border-opacity-100 hover:text-[#d43900] duration-200 cursor-pointer"}>
                      <a href="/text-diff">Diffs</a>
                    </li>
                </ul>
            </nav>
            <div class="ml-2">
              <div id="menu" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
        </header>
      </div>
    </Fragment>
  );
}