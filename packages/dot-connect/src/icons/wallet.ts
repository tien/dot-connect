import type { IconProps } from "./types.js";
import { html } from "lit";

export function wallet({ size = 24 }: IconProps) {
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
      <path d="M26.7599 3.24988H1.23975V24.7496H26.7599V3.24988Z"></path>
      <path
        d="M26.7742 8.98047H17.7689C14.9968 8.98047 12.7495 11.2277 12.7495 13.9999C12.7495 16.772 14.9968 19.0192 17.7689 19.0192H26.7742V8.98047Z"
      ></path>
      <circle cx="18" cy="14" r="1"></circle>
    </g>
  </svg>`;
}
