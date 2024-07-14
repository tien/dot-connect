# Getting started

## Installation

### First setup a Reactive DOT application

Follow the guide [here](https://reactivedot.dev/docs/getting-started/setup).

### Then add DOT Connect as a dependencies

::: code-group

```sh [npm]
npm add dot-connect
```

```sh [yarn]
yarn add dot-connect
```

```sh [pnpm]
pnpm add dot-connect
```

:::

### Finally add any optional dependencies

Install any optional dependencies depending on the wallet types you want to support by following this [documentation](https://reactivedot.dev/docs/getting-started/connect-wallets#install-optional-dependencies).

## Setup

```ts
import type { Config } from "@reactive-dot/core";
import {
  InjectedWalletAggregator,
  WalletConnect,
} from "@reactive-dot/core/wallets.js";
import { registerDotConnect } from "dot-connect";

// ...

// More information on how to set up your config: https://reactivedot.dev/docs/getting-started/setup#create-config
const config = {
  // ...
  wallets: [
    new InjectedWalletAggregator(),
    new WalletConnect({
      projectId: "WALLET_CONNECT_PROJECT_ID",
      providerOptions: {
        metadata: {
          name: "APP_NAME",
          description: "APP_DESCRIPTION",
          url: "APP_URL",
          icons: ["APP_ICON"],
        },
      },
      chainIds: [
        // https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-13.md
        "polkadot:91b171bb158e2d3848fa23a9f1c25182", // Polkadot
      ],
    }),
  ],
} as const satisfies Config;

// Register dot-connect custom elements & configure supported wallets
registerDotConnect({
  wallets: config.wallets,
});

export default config;
```

## Usage

With web component, the connection button can be added directly into any HTML markup.

## As part of JSX

```tsx
const App = () => (
  <div>
    <dc-connection-button />
  </div>
);
```

## As part of plain HTML

```html
<!-- ... -->
<body>
  <dc-connection-button></dc-connection-button>
</body>
```

## Account management

Accounts can then be accessed via Reactive DOT API, an example on how to do this can be found [here](https://reactivedot.dev/docs/getting-started/connect-wallets#display-available-accounts).
