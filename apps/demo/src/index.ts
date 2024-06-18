import "./index.css";
import {
  InjectedAggregator,
  WalletConnect,
  initializeWallets,
} from "@reactive-dot/core/wallets.js";
import { registerDotConnect } from "dot-connect";
import "dot-connect/font.css";

const wallets = [
  new InjectedAggregator(),
  new WalletConnect({
    projectId: "6089356d0a4448aeda421a025cc286c9",
    providerOptions: {
      metadata: {
        name: "DOT Connect demo",
        description: "Simple App showcasing DOT Connect",
        url: globalThis.location.origin,
        icons: ["https://walletconnect.com/walletconnect-logo.png"],
      },
    },
    chainIds: [
      "polkadot:91b171bb158e2d3848fa23a9f1c25182", // Polkadot
    ],
  }),
];

registerDotConnect({
  wallets,
});

await initializeWallets(wallets);
