import type { InjectedWalletInfo, WalletConfig } from "./types.js";
import type { Wallet } from "@reactive-dot/core/wallets.js";

export const polkadotJs: WalletConfig<InjectedWalletInfo> = {
  selector: (wallet: Wallet) => wallet.id === "injected/polkadot-js",
  name: "Polkadot{.js}",
  platforms: ["chrome", "firefox"],
  logo: new URL("../../assets/imgs/polkadot-js.svg", import.meta.url),
  downloadUrl: {
    chrome:
      "https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd",
    firefox: "https://addons.mozilla.org/firefox/addon/polkadot-js-extension",
    default: "https://polkadot.js.org/extension",
  },
};
