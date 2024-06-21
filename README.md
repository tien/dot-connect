# DOT Connect

UI components for managing Polkadot wallet connections.

- Customisable
- FE framework agnostic, work with React, Vue, or any other FE applications
- Built on top of [`reactive-dot`](https://reactivedot.dev/) and [`polkadot-api`](https://polkadot-api.github.io/polkadot-api-docs/)

## Quick start

### Installation

#### First setup a Reactive DOT application

Follow the guide [here](https://reactivedot.dev/docs/getting-started/setup).

#### Then add DOT Connect as a dependencies

```sh
npm add dot-connect
# Or
yarn add dot-connect
# Or
pnpm add dot-connect
```

#### Finally add any optional dependencies

Install any optional dependencies depending on the wallet types you want to support by following this [documentation](https://reactivedot.dev/docs/getting-started/connect-wallets#install-optional-dependencies).

### Setup

```ts
import type { Config } from "@reactive-dot/core";
import {
  InjectedAggregator,
  WalletConnect,
} from "@reactive-dot/core/wallets.js";
import { registerDotConnect } from "dot-connect";

// ...

// More information on how to set up your config: https://reactivedot.dev/docs/getting-started/setup#create-config
const config: Config = {
  // ...
  wallets: [
    new InjectedAggregator(),
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
};

// Register dot-connect custom elements & configure supported wallets
registerDotConnect({
  wallets: config.wallets,
});

export default config;
```

### Usage

With web component, the connection button can be added directly into any HTML markup.

### As part of JSX

```tsx
const App = () => (
  <div>
    <dc-connection-button />
  </div>
);
```

### As part of plain HTML

```html
<!-- ... -->
<body>
  <dc-connection-button></dc-connection-button>
</body>
```

### Account management

Accounts can then be accessed via Reactive DOT API, an example on how to do this can be found [here](https://reactivedot.dev/docs/getting-started/connect-wallets#display-available-accounts).

### Theming

By default the theme will match user system settings 'light' or 'dark'. But you can override it by using the [`color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme) CSS property.

Further customization can be done via setting CSS variables directly, which can be found [here](./packages/dot-connect/src/elements/components/dc-element.ts#L9-L23).
