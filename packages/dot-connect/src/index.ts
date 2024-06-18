import { walletsOrAggregators } from "./stores.js";
import { SupportedWalletOrAggregator } from "./types.js";
import { initializeWallets } from "@reactive-dot/core/wallets.js";

export type Options = {
  wallets: Array<SupportedWalletOrAggregator>;
};

export const registerDotConnect = async (options: Options) => {
  walletsOrAggregators.value = options.wallets;

  await Promise.all([
    initializeWallets(options.wallets),
    import("./elements/dc-connection-button.js"),
    import("./elements/dc-connection-dialog.js"),
  ]);
};
