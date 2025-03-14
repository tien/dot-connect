import { urlFromSvg } from "../utils.js";
import type { InjectedWalletInfo, WalletConfig } from "./types.js";
import type { Wallet } from "@reactive-dot/core/wallets.js";
import { html } from "lit";

export const mimir: WalletConfig<InjectedWalletInfo> = {
  selector: (wallet: Wallet) =>
    wallet.id === "mimir" || wallet.id === "injected/mimir",
  name: "Mimir",
  platforms: ["chrome", "firefox"],
  logo: urlFromSvg(
    html`<svg viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
      <g>
        <rect width="15" height="15" rx="7.5" fill="#2700FF" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.0001 5.59628L12 12.2656H10.0125L10.0126 9.02998C9.29958 9.59709 8.45981 9.89257 7.5 9.89257C6.54019 9.89257 5.70042 9.59709 4.98743 9.02998L4.9875 12.2656H3L3.00001 5.59632C3.29033 5.77239 3.63032 5.87364 3.99375 5.87364C4.35718 5.87364 4.69716 5.77239 4.98748 5.59633L4.98744 5.66363C5.61085 7.23839 6.42948 7.9258 7.5 7.9258C8.57052 7.9258 9.38915 7.23839 10.0126 5.66363L10.0125 5.59633C10.3028 5.77239 10.6428 5.87364 11.0063 5.87364C11.3697 5.87364 11.7097 5.77237 12.0001 5.59628ZM3.99375 5.11719C4.64614 5.11719 5.175 4.58378 5.175 3.92578C5.175 3.26779 4.64614 2.73438 3.99375 2.73438C3.34136 2.73438 2.8125 3.26779 2.8125 3.92578C2.8125 4.58378 3.34136 5.11719 3.99375 5.11719ZM11.0063 5.11719C11.6586 5.11719 12.1875 4.58378 12.1875 3.92578C12.1875 3.26779 11.6586 2.73438 11.0063 2.73438C10.3539 2.73438 9.825 3.26779 9.825 3.92578C9.825 4.58378 10.3539 5.11719 11.0063 5.11719Z"
          fill="white"
        />
      </g>
    </svg>`,
  ),
};
