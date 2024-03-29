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
      <div class={background + " " + primaryText}>
        <div class="p-4 mx-auto flex flex-col h-full">
          <Menu title="" page=""/>
          <p class="mt-10 font-semibold mx-auto text(xl sm:3xl md:[2.75rem])">Your Developer Toolbox</p>
        </div>
        <div class="w-max m-auto pt-5">
          <svg version="1.1" id="Layer_1" viewBox="0 0 512 512" width="256px" height="256px">
            <rect x="11.77" y="281.823" style="fill:#2969B0;" width="488.46" height="64.736"/>
            <rect x="44.138" y="346.559" style="fill:#BFDEFF;" width="423.724" height="153.011"/>
            <rect x="203.034" y="346.559" style="fill:#EBEBEB;" width="105.931" height="52.966"/>
            <path style="fill:#A8A8A8;" d="M463.439,179.715c-58.328-33.675-116.656-67.351-174.984-101.026
              c12.751-22.085,25.501-44.171,38.253-66.256c61.094,26.728,110.93,79.308,157.329,131.606
              C477.171,155.932,470.306,167.824,463.439,179.715z"/>
            <polygon style="fill:#FFAC3D;" points="389.202,136.849 345.429,212.66 305.505,281.821 237.544,281.821 253.54,254.126 
              338.238,107.423 "/>
            <g>
              <polygon style="fill:#EBEBEB;" points="253.54,254.126 237.544,281.821 215.428,281.821 123.527,145.582 106.343,135.872 
                76.506,91.64 130.166,55.446 160.003,99.679 162.557,119.252 	"/>
              <polygon style="fill:#EBEBEB;" points="413.92,212.66 413.92,281.821 305.505,281.821 345.429,212.66 	"/>
            </g>
            <g>
              <path style="fill:#231F20;" d="M500.23,270.051h-74.54V212.66c0-6.501-5.271-11.77-11.77-11.77h-48.1l27.688-47.959l64.046,36.977
                c1.804,1.043,3.837,1.577,5.885,1.577c1.019,0,2.044-0.133,3.046-0.401c3.017-0.809,5.586-2.78,7.147-5.484l20.598-35.678
                c2.533-4.388,1.975-9.906-1.389-13.696C445.913,83.333,394.793,29.371,331.424,1.649c-5.491-2.402-11.913-0.294-14.91,4.899
                l-38.253,66.256c-3.251,5.63-1.322,12.828,4.308,16.078l39.586,22.855l-69.394,120.189l-78.893-116.953l-2.194-16.818
                c-0.237-1.813-0.892-3.544-1.914-5.059l-29.837-44.232c-3.636-5.39-10.952-6.81-16.339-3.176l-53.66,36.193
                c-2.588,1.746-4.377,4.448-4.973,7.512c-0.596,3.064,0.051,6.241,1.796,8.828l29.837,44.232c1.02,1.512,2.379,2.767,3.968,3.665
                l14.769,8.345l77.97,115.587H147.67l-46.458-95.485c-2.845-5.845-9.89-8.277-15.733-5.434c-5.845,2.845-8.278,9.888-5.434,15.733
                l41.447,85.186H91.712l-18.556-42.205c-2.618-5.951-9.566-8.653-15.512-6.037c-5.951,2.617-8.655,9.561-6.038,15.512l14.39,32.732
                H11.77c-6.499,0-11.77,5.27-11.77,11.77v64.736c0,6.501,5.271,11.77,11.77,11.77h20.598v141.241c0,6.501,5.271,11.77,11.77,11.77
                h423.724c6.499,0,11.77-5.269,11.77-11.77V358.328h20.598c6.499,0,11.77-5.269,11.77-11.77v-64.736
                C512,275.32,506.729,270.051,500.23,270.051z M402.15,224.43v45.621h-76.259l26.338-45.621H402.15z M331.515,27.647
                c52.385,25.827,96.918,71.78,138.08,117.868l-10.464,18.122L304.533,74.381L331.515,27.647z M373.122,141.161l-74.412,128.89
                h-40.774l5.798-10.038c0.005-0.008,0.007-0.016,0.012-0.025l78.799-136.482L373.122,141.161z M133.285,139
                c-1.02-1.512-2.379-2.767-3.968-3.665l-14.769-8.345L92.846,94.815l34.144-23.029l21.702,32.171l2.194,16.818
                c0.237,1.813,0.892,3.544,1.914,5.059l86.868,128.772l-8.917,15.444h-9.063L133.285,139z M456.092,438.952h-48.846
                c-6.499,0-11.77,5.269-11.77,11.77c0,6.501,5.271,11.77,11.77,11.77h48.846v25.306H55.908v-25.306h48.846
                c6.499,0,11.77-5.269,11.77-11.77c0-6.501-5.271-11.77-11.77-11.77H55.908v-80.625h135.356v41.195c0,6.501,5.271,11.77,11.77,11.77
                h105.931c6.499,0,11.77-5.269,11.77-11.77v-41.195h135.356V438.952z M214.805,358.327h82.391v29.425h-82.391V358.327z
                M488.46,334.787H23.54v-41.195h464.92V334.787z"/>
              <path style="fill:#231F20;" d="M149.677,438.952H148.5c-6.499,0-11.77,5.269-11.77,11.77c0,6.501,5.271,11.77,11.77,11.77h1.177
                c6.499,0,11.77-5.269,11.77-11.77C161.447,444.222,156.176,438.952,149.677,438.952z"/>
              <path style="fill:#231F20;" d="M362.323,462.492h1.177c6.499,0,11.77-5.269,11.77-11.77c0-6.501-5.271-11.77-11.77-11.77h-1.177
                c-6.499,0-11.77,5.269-11.77,11.77C350.553,457.223,355.824,462.492,362.323,462.492z"/>
            </g>
          </svg>
        </div>
        <div class="flex justify-center">
          <div class="mt-10">
            <p class="mt-2 mb-2 text(xl sm:2xl)">✅ No ads, trackers or cookies</p>
            <p class="mt-2 mb-2 text(xl sm:2xl)">✅ No data submitted</p>
            <p class="mt-2 mb-2 text(xl sm:2xl)">✅ Minimalist UI</p>
            <p class="mt-2 mb-2 text(xl sm:2xl)">✅ Fast, responsive, accessible</p>
          </div>
        </div>
        <div class="mt-8 p-4 flex justify-center">
          <p class="mt-2 mb-2 text(xl sm:2xl)">Get started with your tool of choice from the menu.</p>
        </div>
      </div>
    </Fragment>
  );
}
