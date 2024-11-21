import type { BaseWalletInfo, WalletConfig } from "./types.js";

export const walletConnect: WalletConfig<BaseWalletInfo> = {
  selector: (wallet) => wallet.id === "wallet-connect",
  name: "WalletConnect",
  logo: new URL("../../assets/imgs/walletconnect.svg", import.meta.url),
};
