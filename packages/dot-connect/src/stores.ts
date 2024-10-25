import { genericChainSpec } from "./const.js";
import { wallets as rawWalletConfigs } from "./wallets/index.js";
import { computed, signal } from "@lit-labs/preact-signals";
import {
  aggregateWallets,
  getAccounts,
  getConnectedWallets,
} from "@reactive-dot/core";
import { Wallet, WalletProvider } from "@reactive-dot/core/wallets.js";
import { Observable, combineLatest } from "rxjs";
import { map } from "rxjs/operators";

export const walletsOrProviders = signal<
  ReadonlyArray<Wallet | WalletProvider>
>([]);

const directWallets = computed(() =>
  walletsOrProviders.value.filter(
    (walletOrProvider) => walletOrProvider instanceof Wallet,
  ),
);

const directWallets$ = new Observable<Wallet[]>((subscriber) =>
  directWallets.subscribe(subscriber.next.bind(subscriber)),
);

const providers = computed(() =>
  walletsOrProviders.value.filter(
    (walletOrProvider) => walletOrProvider instanceof WalletProvider,
  ),
);

const providers$ = new Observable<WalletProvider[]>((subscriber) =>
  providers.subscribe(subscriber.next.bind(subscriber)),
);

const providerWallets$ = aggregateWallets(providers$);

export const wallets$ = combineLatest([directWallets$, providerWallets$]).pipe(
  map(([directWallets, providerWallets]) => [
    ...directWallets,
    ...providerWallets,
  ]),
);

export const connectedWallets$ = getConnectedWallets(wallets$);

export const accounts$ = getAccounts(wallets$, genericChainSpec);

export const walletConfigs = signal(rawWalletConfigs);
