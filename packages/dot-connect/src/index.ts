import "./elements/connection-button.js";
import "./elements/connection-dialog.js";
// TODO: for testing purpose only
import "./elements/ledger/ledger-dialog.js";
import { walletsOrAggregators } from "./stores.js";
import type { Wallet, WalletAggregator } from "@reactive-dot/core/wallets.js";

export type Options = {
  wallets: Array<Wallet | WalletAggregator>;
};

export function registerDotConnect(options: Options) {
  walletsOrAggregators.value = options.wallets;
}
