import "./elements/connection-button.js";
import "./elements/connection-dialog.js";
import { walletsOrAggregators } from "./stores.js";
import type { SupportedWalletOrAggregator } from "./types.js";

export type Options = {
  wallets: Array<SupportedWalletOrAggregator>;
};

export function registerDotConnect(options: Options) {
  walletsOrAggregators.value = options.wallets;
}
