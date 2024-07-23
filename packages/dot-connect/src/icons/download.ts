import type { IconProps } from "./types.js";
import { html } from "lit";

export function download({ size = 24 }: IconProps) {
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
    <path d="M6 23.5V26L22.706 26V23.5" fill="none" data-nofill="true"></path>
    <path
      d="M14.4865 2L14.4865 20.5M20.0165 15.921L14.4865 21.4482L8.95172 15.9227"
      fill="none"
      data-nofill="true"
    ></path>
  </svg>`;
}
