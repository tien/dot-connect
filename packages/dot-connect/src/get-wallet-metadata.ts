import { walletConfigs } from "./stores.js";
import type { Wallet } from "@reactive-dot/core/wallets.js";

/**
 * @experimental
 */
export function getWalletMetadata(wallet: Wallet) {
  const walletConfig = walletConfigs
    .get()
    .find((config) => config.selector(wallet));

  if (walletConfig === undefined) {
    return;
  }

  return { name: walletConfig.name, logo: walletConfig.logo };
}
