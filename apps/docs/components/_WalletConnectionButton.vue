<script lang="ts" type="module">
import {
  InjectedWalletAggregator,
  initializeWallets,
} from "@reactive-dot/core/wallets.js";
import { WalletConnect } from "@reactive-dot/wallet-walletconnect";
import { registerDotConnect } from "dot-connect";

const wallets = [
  new InjectedWalletAggregator(),
  new WalletConnect({
    projectId: "6089356d0a4448aeda421a025cc286c9",
    providerOptions: {
      metadata: {
        name: "DOTConnect demo",
        description: "Simple App showcasing DOTConnect",
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

initializeWallets(wallets);

export default {
  setup() {},
};
</script>

<template>
  <dc-connection-button></dc-connection-button>
</template>
