# Getting started

## Installation

### Set up a Reactive DOT application

Start by setting up your Reactive DOT application. Follow the guide [here](https://reactivedot.dev/docs/getting-started/setup).

### Add DOT Connect as a dependency

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

### Install optional dependencies

Install any optional dependencies based on the wallet types you want to support by following this [documentation](https://reactivedot.dev/docs/getting-started/connect-wallets#install-optional-dependencies).

## Setup config

Configure your project by adding the following code:

```ts
import type { Config } from "@reactive-dot/core";
import { InjectedWalletAggregator } from "@reactive-dot/core/wallets.js";
import { WalletConnect } from "@reactive-dot/core/wallets/wallet-connect.js";
import { registerDotConnect } from "dot-connect";

// ...

// More information on how to set up your config: https://reactivedot.dev/docs/getting-started/setup#create-config
export const config = {
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
```

## Import required fonts

To import the necessary fonts, use one of the following methods:

```ts
import "dot-connect/font.css";
```

Or

```css
@import "dot-connect/font.css";
```

## Usage

### Add a connection button

Add a connection button to your application using a web component. You can include it in your HTML or JSX.

#### Using JSX

```tsx
const App = () => (
  <div>
    <dc-connection-button />
  </div>
);
```

#### Using HTML

```html
<!-- ... -->
<body>
  <dc-connection-button></dc-connection-button>
</body>
```

### Manually trigger the connection dialog

Use the `dc-connection-dialog` element to manually control the connection dialog.

#### Declarative approach

To open or close the dialog, use the `open` attribute:

```html
<!-- Open -->
<dc-connection-dialog open></dc-connection-dialog>
<!-- Close -->
<dc-connection-dialog></dc-connection-dialog>
```

#### Imperative approach

Invoke the `show()` and `close()` methods on the dialog element:

```html
<dc-connection-dialog id="connection-dialog"></dc-connection-dialog>
<script>
  const dialog = document.getElementById("connection-dialog");

  dialog.show();
  dialog.close();
</script>
```

## Account management

Access accounts via the Reactive DOT API. For more details and examples, refer to the documentation [here](https://reactivedot.dev/docs/getting-started/connect-wallets#display-available-accounts).
