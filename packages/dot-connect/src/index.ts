import "./elements/connection-button.js";
import "./elements/connection-dialog.js";
import "./elements/ledger/ledger-dialog.js";
import { walletsOrProviders$ } from "./stores.js";
import type { Wallet, WalletProvider } from "@reactive-dot/core/wallets.js";

export { getWalletMetadata } from "./get-wallet-metadata.js";

export type Options = {
  wallets: Array<Wallet | WalletProvider>;
};

export function registerDotConnect(options: Options) {
  walletsOrProviders$.next(options.wallets);
}
