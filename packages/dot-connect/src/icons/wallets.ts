import type { IconProps } from "./types.js";
import { html } from "lit";

export function wallets({ size = 24 }: IconProps) {
  return html`<svg
    width=${size}
    height=${size}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke="currentcolor"
  >
    <g>
      <path d="M6.11719 7V2.86328H26.4695V20.0093H22.8445"></path>
      <path d="M22.4695 7.49976H2.11719V24.6457H22.4695V7.49976Z"></path>
      <path
        d="M21.4808 12.0699H15.2991C13.0883 12.0699 11.2961 13.8621 11.2961 16.0729C11.2961 18.2837 13.0883 20.0758 15.2991 20.0758H21.4808C22.0331 20.0758 22.4808 19.6281 22.4808 19.0758V13.0699C22.4808 12.5177 22.0331 12.0699 21.4808 12.0699Z"
      ></path>
      <path d="M15.0181 16.0181L15 16" stroke-miterlimit="10"></path>
    </g>
  </svg>`;
}
