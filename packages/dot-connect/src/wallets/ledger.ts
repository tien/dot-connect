import type { BaseWalletInfo, WalletConfig } from "./types.js";

export const ledger: WalletConfig<BaseWalletInfo> = {
  selector: (wallet) => wallet.id === "ledger",
  name: "Ledger",
  logo: new URL("../../assets/imgs/ledger.svg", import.meta.url),
};
