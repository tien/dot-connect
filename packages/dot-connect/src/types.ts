import type {
  DeepLinkWallet,
  InjectedAggregator,
  InjectedWallet,
} from "@reactive-dot/core/wallets.js";

export type SupportedWallet = InjectedWallet | DeepLinkWallet;

export type SupportedWalletAggregator = InjectedAggregator;

export type SupportedWalletOrAggregator =
  | SupportedWallet
  | SupportedWalletAggregator;
