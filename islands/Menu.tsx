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
      console.log('updating', menuItems[i].innerHTML)
      setTimeout(() => {
        (menuItems[i] as HTMLElement).style.color = "#b36205";
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
          height: 3px;
          width: 100%;
          background: #d3531a;
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
        <a href="/password-generator" class={PASSWORD_GENERATOR + " block p-4 border-b-2 border-yellow-600 border-opacity-0 hover:border-opacity-100 hover:text-yellow-600 duration-200 cursor-pointer active"}>
          Passwords
        </a>
        <a href="/encoding-decoding" class={ENCODER_DECODER + " block p-4 border-b-2 border-yellow-600 border-opacity-0 hover:border-opacity-100 hover:text-yellow-600 duration-200 cursor-pointer active"}>
          Encoding
        </a>
        <a href="/format-validate" class={FORMATTER + " block p-4 border-b-2 border-yellow-600 border-opacity-0 hover:border-opacity-100 hover:text-yellow-600 duration-200 cursor-pointer active"}>
          Formatting
        </a>
        <a href="/text-diff" class={TEXT_DIFF + " block p-4 border-b-2 border-yellow-600 border-opacity-0 hover:border-opacity-100 hover:text-yellow-600 duration-200 cursor-pointer active"}>
          Diffs
        </a>
        <div class="h-0 mx-4 my-2 border border-solid border-blueGray-100"></div>
        <a href="./login.html" class="block p-4 border-b-2 border-yellow-600 border-opacity-0 hover:border-opacity-100 hover:text-yellow-600 duration-200 cursor-pointer active">
          About
        </a>
        <a href="https://github.com/cknight/dev-tools" class="block p-4 border-b-2 border-yellow-600 border-opacity-0 hover:border-opacity-100 hover:text-yellow-600 duration-200 cursor-pointer active">
          Contribute
        </a>
      </div>
      <div class="flex flex-col">
        <header class="bg-white shadow-md flex items-center justify-between px-8 py-02 h-[59px]">
            <h1>
                <a href="" class="flex items-center">
                  <img alt="Crossed tools logo" src="/CrossedTools_orange.png"/>
                  <p class="block ml-2 font-semibold text-lg">Dev&nbsp;Tools</p>
                </a>
            </h1>
            <nav class="hidden md:block font-semibold text-m">
                <ul class="flex items-center">
                    <li class={PASSWORD_GENERATOR + " p-4 border-b-[3px] border-yellow-600 border-opacity-0 hover:border-opacity-100 hover:text-yellow-600 duration-200 cursor-pointer active"}>
                      <a href="/password-generator">Passwords</a>
                    </li>
                    <li class={ENCODER_DECODER + " p-4 border-b-[3px] border-yellow-600 border-opacity-0 hover:border-opacity-100 hover:text-yellow-600 duration-200 cursor-pointer"}>
                      <a href="/encoding-decoding">Encoding</a>
                    </li>
                    <li class={FORMATTER + " p-4 border-b-[3px] border-yellow-600 border-opacity-0 hover:border-opacity-100 hover:text-yellow-600 duration-200 cursor-pointer"}>
                      <a href="/format-validate">Formatting</a>
                    </li>
                    <li class={TEXT_DIFF + " p-4 border-b-[3px] border-yellow-600 border-opacity-0 hover:border-opacity-100 hover:text-yellow-600 duration-200 cursor-pointer"}>
                      <a href="/text-diff">Diffs</a>
                    </li>
                </ul>
            </nav>
            <div class="hidden md:flex items-center">
              <div>
                <a href="/about">
                  <svg width="25px" height="25px" viewBox="0 0 330 330" style="color:red">
                    <g>
                      <path fill="#555555" d="M165,0.008C74.019,0.008,0,74.024,0,164.999c0,90.977,74.019,164.992,165,164.992s165-74.015,165-164.992
                        C330,74.024,255.981,0.008,165,0.008z M165,299.992c-74.439,0-135-60.557-135-134.992S90.561,30.008,165,30.008
                        s135,60.557,135,134.991C300,239.436,239.439,299.992,165,299.992z"/>
                      <path fill="#555555" d="M165,130.008c-8.284,0-15,6.716-15,15v99.983c0,8.284,6.716,15,15,15s15-6.716,15-15v-99.983
                        C180,136.725,173.284,130.008,165,130.008z"/>
                      <path fill="#555555" d="M165,70.011c-3.95,0-7.811,1.6-10.61,4.39c-2.79,2.79-4.39,6.66-4.39,10.61s1.6,7.81,4.39,10.61
                        c2.79,2.79,6.66,4.39,10.61,4.39s7.81-1.6,10.609-4.39c2.79-2.8,4.391-6.66,4.391-10.61s-1.601-7.82-4.391-10.61
                        C172.81,71.61,168.95,70.011,165,70.011z"/>
                    </g>
                  </svg>
                </a>
              </div>
              <div class="ml-3">
                <a href="https://github.com/cknight/dev-tools" target="_">
                  <img alt="GitHub logo" width="25px" height="25px" src="/GitHub-Mark-32px.png" style="opacity: 0.9"/>
                </a>
              </div>
            </div>
            <div class="ml-2 md:hidden">
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