import {
  DeepLinkWallet,
  InjectedWallet,
  InjectedWalletAggregator,
} from "@reactive-dot/core/wallets.js";

export const supportedWallets = [InjectedWallet, DeepLinkWallet] as const;

export type SupportedWallet = InstanceType<(typeof supportedWallets)[number]>;

export const supportedWalletAggregators = [InjectedWalletAggregator] as const;

export type SupportedWalletAggregator = InstanceType<
  (typeof supportedWalletAggregators)[number]
>;

export const supportedWalletsOrAggregators = [
  ...supportedWallets,
  ...supportedWalletAggregators,
] as const;

export type SupportedWalletOrAggregator = InstanceType<
  (typeof supportedWalletsOrAggregators)[number]
>;
