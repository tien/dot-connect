import type { InjectedWalletInfo, WalletConfig } from "./types.js";
import type { Wallet } from "@reactive-dot/core/wallets.js";

export const talisman: WalletConfig<InjectedWalletInfo> = {
  selector: (wallet: Wallet) => wallet.id === "injected/talisman",
  name: "Talisman",
  platforms: ["chrome", "firefox"],
  logo: new URL("../../assets/imgs/talisman.svg", import.meta.url),
  downloadUrl: "https://talisman.xyz/download",
};
