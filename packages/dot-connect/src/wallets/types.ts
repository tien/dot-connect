import type { Wallet } from "@reactive-dot/core/wallets.js";
import type { HTMLTemplateResult } from "lit";

export type BaseWalletInfo = {
  name: string;
  logo: HTMLTemplateResult;
};

export type Platform = "chrome" | "firefox" | "ios" | "android";

export type InjectedWalletInfo = BaseWalletInfo & {
  platforms: Platform[];
  downloadUrl:
    | string
    | {
        chrome?: string;
        firefox?: string;
        default?: string;
      }
    | {
        ios?: string;
        android?: string;
      };
};

export type WalletInfo = BaseWalletInfo | InjectedWalletInfo;

export type WalletConfig<TWalletInfo extends BaseWalletInfo> = TWalletInfo & {
  selector: (wallet: Wallet) => boolean;
};
