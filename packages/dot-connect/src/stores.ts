import { genericChainSpec } from "./const.js";
import { wallets as rawWalletConfigs } from "./wallets/index.js";
import { computed, signal } from "@lit-labs/preact-signals";
import {
  aggregateWallets,
  getAccounts,
  getConnectedWallets,
} from "@reactive-dot/core";
import { Wallet, WalletAggregator } from "@reactive-dot/core/wallets.js";
import { Observable, combineLatest } from "rxjs";
import { map } from "rxjs/operators";

export const walletsOrAggregators = signal<Array<Wallet | WalletAggregator>>(
  [],
);

const directWallets = computed(() =>
  walletsOrAggregators.value.filter(
    (walletOrAggregator) => walletOrAggregator instanceof Wallet,
  ),
);

const directWallets$ = new Observable<Wallet[]>((subscriber) =>
  directWallets.subscribe(subscriber.next.bind(subscriber)),
);

const aggregators = computed(() =>
  walletsOrAggregators.value.filter(
    (walletOrAggregator) => walletOrAggregator instanceof WalletAggregator,
  ),
);

const aggregators$ = new Observable<WalletAggregator[]>((subscriber) =>
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

export const accounts$ = getAccounts(wallets$, genericChainSpec);

export const walletConfigs = signal(rawWalletConfigs);
