import type { InjectedWalletInfo, WalletConfig } from "./types.js";
import type { Wallet } from "@reactive-dot/core/wallets.js";

export const subWallet: WalletConfig<InjectedWalletInfo> = {
  selector: (wallet: Wallet) => wallet.id === "injected/subwallet-js",
  name: "SubWallet",
  platforms: ["chrome", "firefox", "ios", "android"],
  logo: new URL("../../assets/imgs/subwallet.svg", import.meta.url),
  downloadUrl: {
    chrome:
      "https://chrome.google.com/webstore/detail/subwallet-polkadot-extens/onhogfjeacnfoofkfgppdlbmlmnplgbn",
    firefox: "https://addons.mozilla.org/firefox/addon/subwallet",
    default: "https://www.subwallet.app/download.html",
  },
};
