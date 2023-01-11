import { Fragment } from "preact/jsx-runtime";
import { Head, IS_BROWSER } from "$fresh/runtime.ts";
import DarkMode from "./DarkMode.tsx";
import { MenuItem } from "../components/menuItem.tsx";
import { MenuHeader } from "../components/menuHeader.tsx";

interface MenuProps {
  title: string;
  page: string;
}

export default function Menu(props:MenuProps) {

  const menuHeaderStyle="p-4 border(b-[3px] [#d43900] dark:[#FE9F2A] opacity-0 dark:opacity-0 hover:opacity-100) duration-200 cursor-pointer active hover:dark:bg-[#525252]";

  if (IS_BROWSER) {
    const menuItems: HTMLCollectionOf<Element> = document.getElementsByClassName(props.page);
    for (let i=0; i < menuItems.length; i++) {
      setTimeout(() => {
        setActiveMenuItem(menuItems[i]);
      }, 0);
    }

    setTimeout(() => {toggleMenu()}, 0);

  }

  function setActiveMenuItem(menuItem: Element) {
    menuItem.classList.add('dark:text-[#FE9F2A]', 'border-opacity-100', 'dark:border-opacity-100');
    menuItem.classList.remove('border-opacity-0', 'dark:border-opacity-0');
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

  function goTo(location:string) {
    window.location.href=location; 
  }

  return (
    <Fragment>
      <Head>
        <style>{`

        #menu {
          width: 30px;
          height: 15px;
          padding-bottom: 22px;
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

        .dark #menu span{
          background: #cccccc;
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
      {/* Add this hidden div to allow css classes to be included */}
      <div class="hidden dark:text-[#FE9F2A]"></div>
      <div class="flex flex-col">
        <header id="logoAndName" class="bg(white dark:[#454545]) shadow(md) dark:text-[#ffffff] flex items-center px-2 py-02 h-[59px]">
          <div id="hamburger_menu">
            <div id="menu" class="mb-4" tabIndex={0} onKeyPress={toggleMenu} onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            <nav id="popupMenu" class="hidden w-[250px] bg(white dark:[#454545]) text(base left) z-50 absolute top-0 left-0 mt-20 list-none rounded shadow-lg min-w-48 ml-4">
                  <MenuHeader text="Text Utils" icon={
                    <svg width="25px" height="25px" viewBox="0 0 512 512">
                      <g>
                        <path class="st0" d="M471.46,212.99l-42.07-7.92c-3.63-12.37-8.58-24.3-14.79-35.64l24.16-35.37c4.34-6.35,3.54-14.9-1.9-20.34    l-38.58-38.58c-5.44-5.44-13.99-6.24-20.34-1.9L342.57,97.4c-11.34-6.21-23.27-11.16-35.64-14.78l-7.92-42.07    c-1.42-7.56-8.03-13.04-15.72-13.04h-54.57c-7.69,0-14.3,5.48-15.72,13.04l-7.92,42.07c-12.37,3.63-24.3,8.58-35.64,14.78    l-35.37-24.16c-6.35-4.34-14.9-3.54-20.34,1.9l-38.58,38.58c-5.44,5.44-6.24,13.98-1.9,20.34l24.16,35.37    c-6.21,11.34-11.16,23.27-14.79,35.64l-42.07,7.92c-7.56,1.42-13.04,8.03-13.04,15.72v54.57c0,7.69,5.48,14.3,13.04,15.72    l42.07,7.92c3.63,12.37,8.58,24.3,14.79,35.64l-24.16,35.37c-4.34,6.35-3.54,14.9,1.9,20.34l38.58,38.58    c5.44,5.44,13.99,6.24,20.34,1.9l35.37-24.16c11.34,6.21,23.27,11.16,35.64,14.79l7.92,42.07c1.42,7.56,8.03,13.04,15.72,13.04    h54.57c7.69,0,14.3-5.48,15.72-13.04l7.92-42.07c12.37-3.63,24.3-8.58,35.64-14.79l35.37,24.16c6.35,4.34,14.9,3.54,20.34-1.9    l38.58-38.58c5.44-5.44,6.24-13.98,1.9-20.34l-24.16-35.37c6.21-11.34,11.16-23.27,14.79-35.64l42.07-7.92    c7.56-1.42,13.04-8.03,13.04-15.72v-54.57C484.5,221.02,479.02,214.42,471.46,212.99z M452.5,270.01l-38.98,7.34    c-6.25,1.18-11.21,5.94-12.63,12.14c-3.69,16.02-10,31.25-18.77,45.25c-3.37,5.39-3.24,12.26,0.35,17.51l22.39,32.78l-19.82,19.82    l-32.78-22.39c-5.25-3.59-12.12-3.73-17.51-0.35c-14.01,8.77-29.24,15.08-45.25,18.77c-6.2,1.43-10.96,6.38-12.14,12.63    l-7.34,38.98h-28.03l-7.34-38.98c-1.18-6.25-5.94-11.21-12.14-12.63c-16.02-3.69-31.24-10-45.25-18.77    c-5.39-3.37-12.26-3.24-17.51,0.35l-32.78,22.39l-19.82-19.82l22.39-32.78c3.59-5.25,3.72-12.12,0.35-17.51    c-8.77-14.01-15.08-29.24-18.77-45.25c-1.43-6.2-6.38-10.96-12.63-12.14l-38.98-7.34v-28.03l38.98-7.34    c6.25-1.18,11.21-5.94,12.63-12.14c3.69-16.02,10-31.25,18.77-45.25c3.37-5.39,3.24-12.26-0.35-17.51l-22.39-32.78l19.82-19.82    l32.78,22.39c5.25,3.58,12.12,3.72,17.51,0.35c14.01-8.77,29.24-15.08,45.25-18.77c6.2-1.43,10.96-6.38,12.14-12.63l7.34-38.98    h28.03l7.34,38.98c1.18,6.25,5.94,11.21,12.14,12.63c16.02,3.69,31.24,10,45.25,18.77c5.39,3.37,12.26,3.24,17.51-0.35    l32.78-22.39l19.82,19.82l-22.39,32.78c-3.59,5.25-3.72,12.12-0.35,17.51c8.77,14.01,15.08,29.24,18.77,45.25    c1.43,6.2,6.38,10.96,12.63,12.14l38.98,7.34V270.01z"/>
                        <path class="st0" d="M256,148.26c-59.41,0-107.74,48.33-107.74,107.74c0,59.41,48.33,107.74,107.74,107.74    S363.74,315.41,363.74,256C363.74,196.59,315.41,148.26,256,148.26z M256,331.74c-41.76,0-75.74-33.98-75.74-75.74    c0-41.76,33.98-75.74,75.74-75.74s75.74,33.98,75.74,75.74C331.74,297.76,297.76,331.74,256,331.74z"/>
                      </g>
                    </svg>
                  }/>
                  <MenuItem href="/text-diff" text="Text Diff" />
                  <div class="block md:hidden h-0 mx-4 my-2 border(b-[1px] solid blueGray-100 dark:black)"></div>

                  <MenuHeader text="Cryptography/Security" icon={
                    <svg  width="25px" height="25px" viewBox="0 0 125 125">
                      <g>
                        <path d="M8.723,45.706h2.894v-8.729c0-10.139,3.987-19.368,10.412-26.069C28.479,4.177,37.386,0,47.19,0 c9.805,0,18.711,4.177,25.163,10.907c6.424,6.701,10.411,15.931,10.411,26.069v8.729h2.894c2.401,0,4.583,0.98,6.162,2.56 s2.56,3.761,2.56,6.162v59.73c0,2.401-0.98,4.583-2.56,6.162s-3.761,2.56-6.162,2.56H8.723c-2.402,0-4.583-0.98-6.163-2.56 S0,116.56,0,114.158v-59.73c0-2.401,0.981-4.583,2.56-6.162C4.14,46.687,6.321,45.706,8.723,45.706L8.723,45.706z M44,87.301 L39.81,98.28h14.762l-3.884-11.13c2.465-1.27,4.15-3.84,4.15-6.803c0-4.223-3.425-7.647-7.647-7.647 c-4.223,0-7.648,3.425-7.648,7.647C39.542,83.432,41.369,86.091,44,87.301L44,87.301z M17.753,45.706h58.875v-8.729 c0-8.511-3.326-16.236-8.686-21.826C62.61,9.589,55.265,6.137,47.19,6.137S31.77,9.589,26.438,15.15 c-5.359,5.59-8.686,13.315-8.686,21.826V45.706L17.753,45.706z M85.658,51.843H8.723c-0.708,0-1.353,0.292-1.823,0.762 c-0.47,0.47-0.762,1.116-0.762,1.823v59.73c0,0.707,0.292,1.353,0.762,1.822c0.47,0.471,1.116,0.762,1.823,0.762h76.936 c0.708,0,1.354-0.291,1.823-0.762c0.47-0.47,0.762-1.115,0.762-1.822v-59.73c0-0.707-0.292-1.353-0.762-1.823 C87.011,52.135,86.366,51.843,85.658,51.843L85.658,51.843z"/>
                      </g>
                    </svg>
                  }/>
                  <MenuItem href="/password-generator" text="Password Generator" />
                  <div class="block md:hidden h-0 mx-4 my-2 border(b-[1px] solid blueGray-100 dark:black)"></div>

                  <MenuHeader text="Encode/Decode" icon={
                    <svg width="25px" height="25px" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 378.01">
                      <path fill-rule="nonzero" d="M287.35 173.92H151.37v59.11c0 4.51-3.66 8.17-8.17 8.17-2.25 0-4.29-.91-5.77-2.39L2.93 126.84c-3.45-2.87-3.92-8.01-1.05-11.46.34-.41.72-.78 1.12-1.11L137.99 1.88c3.46-2.87 8.6-2.4 11.47 1.05a8.144 8.144 0 0 1 1.88 5.21h.03v59.11h135.98c4.51 0 8.17 3.66 8.17 8.17v90.33c0 4.51-3.66 8.17-8.17 8.17zm-62.7 30.17h135.98v-59.11a8.173 8.173 0 0 1 13.94-5.79l134.5 111.97a8.158 8.158 0 0 1-.07 12.58L374.01 376.13a8.15 8.15 0 0 1-11.47-1.06 8.098 8.098 0 0 1-1.88-5.2h-.03v-59.11H224.65c-4.51 0-8.17-3.66-8.17-8.17v-90.33c0-4.51 3.66-8.17 8.17-8.17zm144.15 16.34H232.82v73.98H368.8c4.51 0 8.17 3.66 8.17 8.18v49.88l114.17-95.05-114.17-95.04v49.88c0 4.51-3.66 8.17-8.17 8.17zm-225.6-62.85h135.98V83.6H143.2c-4.51 0-8.17-3.67-8.17-8.18V25.54L20.86 120.59l114.17 95.04v-49.88c0-4.51 3.66-8.17 8.17-8.17z"/>
                    </svg>
                  }/>
                  <MenuItem href="/base64-encode-decdode" text="Base64" />
                  <MenuItem href="/html-entity-encode-decdode" text="HTML entity" />
                  <MenuItem href="/jwt-decdode" text="JWT" />
                  <MenuItem href="/uri-encode-decdode" text="URI" />
                  <div class="block md:hidden h-0 mx-4 my-2 border(b-[1px] solid blueGray-100 dark:black)"></div>

                  <MenuHeader text="Format/Validate" icon={
                    <svg width="25px" height="25px" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 386">
                      <path fill-rule="nonzero" d="M0 362.47h512V386H0v-23.53z M0 0h512v23.54H0V0zm111.22 192.4L3.88 107.07v171.86c33.4-28.62 74.84-57.14 108.17-85.82l-.83-.71zm83.41 49.25H512v23.53H194.63v-23.53zm0-120.82H512v23.53H194.63v-23.53z"/>
                    </svg>            
                  }/>
                  <MenuItem href="/css-format-validate" text="CSS" />
                  <MenuItem href="/graphql-format-validate" text="Graphql" />
                  <MenuItem href="/html-format-validate" text="HTML" />
                  <MenuItem href="/javascript-format-validate" text="Javascript/JSX" />
                  <MenuItem href="/json-format-validate" text="JSON" />
                  <MenuItem href="/less-format-validate" text="Less" />
                  <MenuItem href="/markdown-format-validate" text="Markdown" />
                  <MenuItem href="/scss-format-validate" text="SCSS" />
                  <MenuItem href="/typescript-format-validate" text="Typescript/TSX" />
                  <MenuItem href="/xml-format-validate" text="XML" />
                  <MenuItem href="/yaml-format-validate" text="YAML" />
                  <div class="block md:hidden h-0 mx-4 my-2 border(b-[1px] solid blueGray-100 dark:black)"></div>

                  <a href="./about" onKeyPress={() => goTo('/about')} class="flex items-end p-4 border(r-8 [#d43900] opacity-0 hover:opacity-100) text(hover:[#d43900] hover:dark:white) duration-200 cursor-pointer active hover:dark:bg-[#525252]">
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
                  <a href="https://github.com/cknight/dev-tools" onKeyPress={() => goTo('https://github.com/cknight/dev-tools')} class="flex p-4 border(r-8 [#d43900] opacity-0 hover:opacity-100) text(hover:[#d43900] hover:dark:white) duration-200 cursor-pointer active hover:dark:bg-[#525252]">
                    <div class="w-[20px] mr-2 flex justify-center items-center">
                      <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="#d43900" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    <div>
                      Contribute
                    </div>
                  </a>
              </nav>
          </div>
          <div class="flex justify-between items-center w-full ml-5">
            <h1>
                <a href="/" class="flex items-center">
                  <svg class="h-[30px]" viewBox="0 0 998.37738 995.2413">
                    <g id="layer1" transform="translate(679.96 312.86)">
                      <path d="m-304-312.85c-28.306-0.63933-56.295 30.095-45.384 59.051 9.941 22.046-31.466 33.404-48.035 43.762-58.499 22.387-97.839 72.838-142.39 114.23-38.547 38.99-83.599 74.322-105.06 126.5-15.246 34.535-21.84 72.362-21.159 109.4 0.51501 40.715 8.594 81.016 20.584 119.82 0.91034-19.377-6.3635-39.9-0.0439-59.758 12.549-58.196 44.93-115.47 96.469-147.31 22.629-13.759 52.31-16.008 75.365-1.9712 10.951 3.4994 22.108 2.6065 32.188-1.3423l620.29 620.29c16.449 16.449 42.933 16.449 59.382 0l38.545-38.545c16.449-16.449 16.449-42.933 0-59.382l-619.31-619.32c12.348-19.881 5.6153-44.305 3.584-66.219 4.2-31.366 34.975-47.752 56.677-66.655 12.179 15.186 31.661 27.07 51.477 18.768 30.238-8.7764 44.873-53.124 18.545-74.178-24.347-23.567-47.181-48.885-72.541-71.284-6.0915-3.8965-12.639-5.7153-19.171-5.8628zm454.8 31.312c-2.096 0.001-4.1918 0.0416-6.2889 0.12172-73.419 2.806-136.45 53.111-155.46 124.08-7.7631 29.243-7.464 60.042 0.86556 89.129l-159.33 159.33 97.928 97.93 151.31-151.32c8.9202 4.1964 18.193 7.5974 27.711 10.164 89.396 23.954 181.28-29.098 205.24-118.49 3.7618-14.135 5.6566-28.702 5.6363-43.329l-121.21 69.982-83.787-145.12 121.08-69.904c-12.613-7.3469-26.133-13.014-40.215-16.858-14.189-3.8024-28.809-5.7198-43.481-5.7107zm-452.76 505.21-190.74 190.74c-4.256-1.6559-8.5914-3.1003-12.99-4.3278-73.879-19.795-149.82 24.048-169.61 97.927-3.1093 11.682-4.6756 23.721-4.6592 35.809l100.17-57.834 69.245 119.94-100.07 57.773c10.426 6.0714 21.6 10.754 33.24 13.93 73.88 19.795 149.82-24.05 169.61-97.93 4.9726-18.689 5.9758-38.213 2.9449-57.313l200.79-200.79-97.927-97.927z"/>
                    </g>
                  </svg>
                  <p class="block ml-2 font-semibold text-lg">Dev&nbsp;Tools</p>
                </a>
            </h1>
            <div id="pageTitle" class="font-semibold text-lg">{props.title}</div>
            <div class="ml-2 flex items-center">
              <DarkMode />
            </div>
          </div>
        </header>
      </div>
    </Fragment>
  );
}