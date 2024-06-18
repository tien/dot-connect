import { walletsOrAggregators } from "./stores.js";
import { SupportedWalletOrAggregator } from "./types.js";

export type Options = {
  wallets: Array<SupportedWalletOrAggregator>;
};

export const registerDotConnect = async (options: Options) => {
  walletsOrAggregators.value = options.wallets;

  await Promise.all([
    import("./elements/dc-connection-button.js"),
    import("./elements/dc-connection-dialog.js"),
  ]);
};
