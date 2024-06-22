import type {
  DeepLinkWallet,
  InjectedWalletAggregator,
  InjectedWallet,
} from "@reactive-dot/core/wallets.js";

export type SupportedWallet = InjectedWallet | DeepLinkWallet;

export type SupportedWalletAggregator = InjectedWalletAggregator;

export type SupportedWalletOrAggregator =
  | SupportedWallet
  | SupportedWalletAggregator;
