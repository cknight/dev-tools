import { Fragment } from "preact/jsx-runtime";
import { Head, IS_BROWSER } from "$fresh/runtime.ts";

export default function DarkMode() {

  if (IS_BROWSER) {
    // function showTheme() {
    //   if (true) {
    //     document.getElementsByTagName("html")[0].classList.add("dark");
    //   }
    // }

    // function showContent() {
    //   document.body.style.visibility = 'visible';
    //   document.body.style.opacity = "1";
    //   document.body.style.display = "block";
    // }

    // showTheme();
    // showContent();
  }


  return (
    <Fragment>
      <Head>
        <style>
          {`html {background-color: black} body {visibility: hidden; opacity: 0;}`}
        </style>
        <noscript>
          <style>
            {`body {visibility: visible; opacity: 1;}`}
          </style>
        </noscript>
        <script>
            {`
              if (true) {
                document.getElementsByTagName('html')[0].classList.add('dark');
              }
            `}
          </script>
      </Head>
      <script>
            {`
                document.body.style.visibility = 'visible';
                document.body.style.opacity = '1';
            `}
          </script>
    </Fragment>
  );
}