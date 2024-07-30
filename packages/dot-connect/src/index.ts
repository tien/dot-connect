import "./elements/dc-connection-button.js";
import "./elements/dc-connection-dialog.js";
import { walletsOrAggregators } from "./stores.js";
import type { SupportedWalletOrAggregator } from "./types.js";

export type Options = {
  wallets: Array<SupportedWalletOrAggregator>;
};

export const registerDotConnect = (options: Options) => {
  walletsOrAggregators.value = options.wallets;
};
