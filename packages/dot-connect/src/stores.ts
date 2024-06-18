import type {
  SupportedWallet,
  SupportedWalletAggregator,
  SupportedWalletOrAggregator,
} from "./types.js";
import { wallets as rawWalletConfigs } from "./wallets/index.js";
import { computed, signal } from "@lit-labs/preact-signals";
import {
  InjectedAggregator,
  Wallet,
  WalletAggregator,
  WalletConnect,
} from "@reactive-dot/core/wallets.js";
import { Observable, combineLatest } from "rxjs";
import { map, switchMap } from "rxjs/operators";

export const walletsOrAggregators = signal<SupportedWalletOrAggregator[]>([
  new InjectedAggregator(),
  new WalletConnect({
    projectId: "68f5b7e972a51cf379b127f51a791c34",
    providerOptions: {
      metadata: {
        name: "DOT Connect example",
        description: "Simple App showcasing DOT Connect",
        url: globalThis.location.origin,
        icons: ["https://walletconnect.com/walletconnect-logo.png"],
      },
    },
    chainIds: [
      "polkadot:91b171bb158e2d3848fa23a9f1c25182", // Polkadot
    ],
  }),
]);

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

const aggregatorWallets$ = aggregators$
  .pipe(
    switchMap((aggregators) =>
      Promise.all(
        aggregators.map(async (aggregator) => {
          await aggregator.scan();
          return aggregator;
        }),
      ),
    ),
  )
  .pipe(
    switchMap((aggregators) =>
      combineLatest(aggregators.map((aggregator) => aggregator.wallets$)),
    ),
  )
  .pipe(map((wallets) => wallets.flat()));

export const wallets$ = combineLatest([
  directWallets$,
  aggregatorWallets$,
]).pipe(
  map(([directWallets, aggregatorWallets]) => [
    ...directWallets,
    ...aggregatorWallets,
  ]),
);

export const connectedWallets$ = wallets$
  .pipe(
    switchMap((wallets) =>
      combineLatest(
        wallets.map((wallet) =>
          wallet.connected$.pipe(
            map((connected) => [wallet, connected] as const),
          ),
        ),
      ),
    ),
  )
  .pipe(
    map((wallets) =>
      wallets.filter(([_, connected]) => connected).map(([wallet]) => wallet),
    ),
  );

export const walletConfigs = signal(rawWalletConfigs);
