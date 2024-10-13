import type { IconProps } from "./types.js";
import { html } from "lit";

export function copy({ size = 24 }: IconProps = {}) {
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
      <path d="M8.99414 8.5V2H25.9941V19H19.4941"></path>
      <path d="M18.9941 9H1.99414V26H18.9941V9Z"></path>
    </g>
  </svg>`;
}