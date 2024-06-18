import type { WalletConfig, InjectedWalletInfo } from "./types.js";
import type { Wallet } from "@reactive-dot/core/wallets.js";
import { html } from "lit";

export const subWallet: WalletConfig<InjectedWalletInfo> = {
  selector: (wallet: Wallet) => wallet.id === "injected/subwallet-js",
  name: "SubWallet",
  platforms: ["chrome", "firefox", "ios", "android"],
  logo: html`<svg
    width="100%"
    height="100%"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 0C35.1658 0 40 4.83421 40 20C40 35.1658 35.1658 40 20 40C4.83421 40 0 35.1658 0 20C0 4.83421 4.83421 0 20 0Z"
      fill="url(#paint0_linear_16261_2233)"
    />
    <g clip-path="url(#clip0_16261_2233)">
      <path
        d="M28.583 16.5052V12.9995L14.4104 7.36841L11.5789 8.79261L11.5939 19.7042L22.1971 23.933L16.5341 26.3213V24.4744L13.9342 23.429L11.5939 24.5246L11.5939 31.2074L14.4129 32.6316L28.583 26.2993V21.8076L15.8299 16.7517V13.6842L25.9482 17.6884L28.583 16.5052Z"
        fill="white"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_16261_2233"
        x1="20"
        y1="0"
        x2="20"
        y2="40"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#004BFF" />
        <stop offset="1" stop-color="#4CEAAC" />
      </linearGradient>
      <clipPath id="clip0_16261_2233">
        <rect
          width="17.004"
          height="25.2632"
          fill="white"
          transform="translate(11.5789 7.36841)"
        />
      </clipPath>
    </defs>
  </svg>`,
  downloadUrl: {
    chrome:
      "https://chrome.google.com/webstore/detail/subwallet-polkadot-extens/onhogfjeacnfoofkfgppdlbmlmnplgbn",
    firefox: "https://addons.mozilla.org/firefox/addon/subwallet",
    default: "https://www.subwallet.app/download.html",
  },
};
