import { genericChainSpec } from "./const.js";
import { wallets as rawWalletConfigs } from "./wallets/index.js";
import { signal } from "@lit-labs/signals";
import {
  aggregateWallets,
  getAccounts,
  getConnectedWallets,
  initializeWallets,
} from "@reactive-dot/core/internal/actions.js";
import type { Wallet, WalletProvider } from "@reactive-dot/core/wallets.js";
import { BehaviorSubject } from "rxjs";
import { switchMap, tap } from "rxjs/operators";

export const walletsOrProviders$ = new BehaviorSubject<
  ReadonlyArray<Wallet | WalletProvider>
>([]);

export const wallets$ = walletsOrProviders$.pipe(
  switchMap(aggregateWallets),
  tap((wallets) => initializeWallets(wallets)),
);

export const connectedWallets$ = getConnectedWallets(wallets$);

export const accounts$ = getAccounts(wallets$, genericChainSpec);

export const walletConfigs = signal(rawWalletConfigs);
