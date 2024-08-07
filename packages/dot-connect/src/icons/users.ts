import type { IconProps } from "./types.js";
import { html } from "lit";

export function users({ size = 24 }: IconProps) {
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
      <path
        d="M10.9523 11.4719L9.92866 10.2412C8.18155 8.14076 8.32148 5.05539 10.2515 3.12174C12.318 1.05141 15.6726 1.05141 17.7391 3.12174C19.6691 5.05539 19.8091 8.14076 18.062 10.2412L17.0385 11.4716C16.3847 12.2576 16.7593 13.4563 17.7443 13.7303L19.1309 14.1159C22.9276 15.1717 25.5547 18.6291 25.5547 22.5698V26.371H2.44531V22.5633C2.44531 18.6259 5.06981 15.1713 8.86305 14.1156L10.2468 13.7306C11.2316 13.4565 11.6061 12.2578 10.9523 11.4719Z"
      ></path>
    </g>
  </svg>`;
}
