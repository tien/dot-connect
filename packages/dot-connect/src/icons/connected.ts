import type { IconProps } from "./types.js";
import { html } from "lit";

const connected = ({ size = 24 }: IconProps) =>
  html`<svg
    width=${size}
    height=${size}
    viewBox="0 0 29 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke="currentcolor"
  >
    <g>
      <path
        d="M17.4675 18.6279L22.241 18.6279C24.8532 18.6279 26.9708 16.5103 26.9708 13.8981V13.8981C26.9708 11.2859 24.8532 9.16832 22.241 9.16832L17.4675 9.16832"
        fill="none"
        data-nofill="true"
      ></path>
      <path
        d="M12.4206 9.13085L7.70051 9.13085C5.08831 9.13085 2.9707 11.2485 2.9707 13.8607V13.8607C2.9707 16.4728 5.08831 18.5905 7.70051 18.5905L12.4206 18.5905"
        fill="none"
        data-nofill="true"
      ></path>
      <path
        d="M21.079 13.8675L8.83264 13.8675"
        fill="none"
        data-nofill="true"
      ></path>
    </g>
  </svg>`;

export default connected;
