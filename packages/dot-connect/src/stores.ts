import type {
  SupportedWallet,
  SupportedWalletAggregator,
  SupportedWalletOrAggregator,
} from "./types.js";
import { wallets as rawWalletConfigs } from "./wallets/index.js";
import { computed, signal } from "@lit-labs/preact-signals";
import { aggregateWallets, getConnectedWallets } from "@reactive-dot/core";
import { Wallet, WalletAggregator } from "@reactive-dot/core/wallets.js";
import { Observable, combineLatest } from "rxjs";
import { map } from "rxjs/operators";

export const walletsOrAggregators = signal<SupportedWalletOrAggregator[]>([]);

const directWallets = computed(() =>
  walletsOrAggregators.value.filter(
    (walletOrAggregator): walletOrAggregator is SupportedWallet =>
      walletOrAggregator instanceof Wallet,
  ),
);

const directWallets$ = new Observable<SupportedWallet[]>((subscriber) =>
  directWallets.subscribe(subscriber.next.bind(subscriber)),
);

const aggregators = computed(() =>
  walletsOrAggregators.value.filter(
    (walletOrAggregator): walletOrAggregator is SupportedWalletAggregator =>
      walletOrAggregator instanceof WalletAggregator,
  ),
);

const aggregators$ = new Observable<SupportedWalletAggregator[]>((subscriber) =>
  aggregators.subscribe(subscriber.next.bind(subscriber)),
);

const aggregatorWallets$ = aggregateWallets(aggregators$);

export const wallets$ = combineLatest([
  directWallets$,
  aggregatorWallets$,
]).pipe(
  map(([directWallets, aggregatorWallets]) => [
    ...directWallets,
    ...aggregatorWallets,
  ]),
);

export const connectedWallets$ = getConnectedWallets(wallets$);

export const walletConfigs = signal(rawWalletConfigs);
