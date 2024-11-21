import type { InjectedWalletInfo, WalletConfig } from "./types.js";
import type { Wallet } from "@reactive-dot/core/wallets.js";

export const nova: WalletConfig<InjectedWalletInfo> = {
  selector: (_wallet: Wallet) => false,
  name: "Nova Wallet",
  platforms: ["ios", "android"],
  logo: new URL("../../assets/imgs/nova.svg", import.meta.url),
  downloadUrl: {
    ios: "https://apps.apple.com/us/app/nova-polkadot-wallet/id1597119355",
    android:
      "https://play.google.com/store/apps/details?id=io.novafoundation.nova.market",
  },
};
