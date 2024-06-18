import type { WalletConfig, InjectedWalletInfo } from "./types.js";
import type { Wallet } from "@reactive-dot/core/wallets.js";
import { html } from "lit";

export const polkadotJs: WalletConfig<InjectedWalletInfo> = {
  selector: (wallet: Wallet) => wallet.id === "injected/polkadot-js",
  name: "Polkadot{.js}",
  platforms: ["chrome", "firefox"],
  logo: html` <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none">
    <mask
      id="mask0_16261_2383"
      style="mask-type:alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="40"
      height="40"
    >
      <path
        d="M20 0C35.1658 0 40 4.83421 40 20C40 35.1658 35.1658 40 20 40C4.83421 40 0 35.1658 0 20C0 4.83421 4.83421 0 20 0Z"
        fill="#004BFF"
      />
    </mask>
    <g mask="url(#mask0_16261_2383)">
      <rect width="40" height="40" fill="#FF8C00" />
    </g>
    <path
      d="M20.1266 8.71466C15.4176 8.71466 11.5689 12.5407 11.5689 17.2723C11.5689 18.2232 11.7274 19.1514 12.0217 20.0569C12.2254 20.6682 12.9046 21.0078 13.5385 20.804C14.1498 20.6003 14.4894 19.9211 14.2856 19.2872C14.0366 18.5854 13.9234 17.8383 13.946 17.0912C14.0366 13.8991 16.6175 11.2729 19.8096 11.1144C23.364 10.9333 26.3071 13.7632 26.3071 17.2723C26.3071 20.555 23.7262 23.2491 20.4888 23.4302C20.4888 23.4302 19.2889 23.4981 18.7003 23.5887C18.406 23.634 18.1796 23.6792 18.0211 23.7019C17.9532 23.7245 17.8853 23.6566 17.9079 23.5887L18.1117 22.5925L19.221 17.4761C19.3568 16.8422 18.9493 16.2083 18.3154 16.0724C17.6815 15.9366 17.0476 16.3441 16.9118 16.978C16.9118 16.978 14.2403 29.4296 14.2177 29.5654C14.0819 30.1993 14.4894 30.8332 15.1233 30.9691C15.7572 31.1049 16.3911 30.6974 16.5269 30.0635C16.5496 29.9277 16.9118 28.275 16.9118 28.275C17.1835 27.0072 18.2249 26.079 19.4474 25.9205C19.7191 25.8752 20.7831 25.8073 20.7831 25.8073C25.1978 25.4677 28.6842 21.7775 28.6842 17.2723C28.6842 12.5407 24.8355 8.71466 20.1266 8.71466ZM20.7378 28.4108C19.9681 28.2524 19.1983 28.7278 19.0399 29.5202C18.8814 30.2899 19.3568 31.0596 20.1492 31.2181C20.9189 31.3766 21.6887 30.9012 21.8471 30.1088C22.0056 29.3164 21.5302 28.5693 20.7378 28.4108Z"
      fill="white"
    />
  </svg>`,
  downloadUrl: {
    chrome:
      "https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd",
    firefox: "https://addons.mozilla.org/firefox/addon/polkadot-js-extension",
    default: "https://polkadot.js.org/extension",
  },
};
