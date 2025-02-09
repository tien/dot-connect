import { urlFromSvg } from "../utils.js";
import type { BaseWalletInfo, WalletConfig } from "./types.js";
import { html } from "lit";

export const ledger: WalletConfig<BaseWalletInfo> = {
  selector: (wallet) => wallet.id === "ledger",
  name: "Ledger",
  logo: urlFromSvg(
    html`<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      fill="none"
    >
      <script xmlns="" />
      <path fill="#000" d="M0 0h28v28H0z" />
      <path
        fill="#fff"
        fill-rule="evenodd"
        d="M11.65 4.4H4.4V9h1.1V5.5l6.15-.04V4.4Zm.05 5.95v7.25h4.6v-1.1h-3.5l-.04-6.15H11.7ZM4.4 23.6h7.25v-1.06L5.5 22.5V19H4.4v4.6ZM16.35 4.4h7.25V9h-1.1V5.5l-6.15-.04V4.4Zm7.25 19.2h-7.25v-1.06l6.15-.04V19h1.1v4.6Z"
        clip-rule="evenodd"
      />
    </svg>`,
  ),
};
