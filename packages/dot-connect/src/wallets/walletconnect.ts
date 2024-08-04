import type { WalletConfig, BaseWalletInfo } from "./types.js";
import { WalletConnect } from "@reactive-dot/core/wallets/wallet-connect.js";
import { html } from "lit";

export const walletConnect: WalletConfig<BaseWalletInfo> = {
  selector: (wallet) => wallet instanceof WalletConnect,
  name: "WalletConnect",
  logo: html`
    <svg fill="none" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <clipPath id="a"><path d="m0 0h400v400h-400z" /></clipPath>
      <g clip-path="url(#a)">
        <circle cx="200" cy="200" fill="#3396ff" r="199.5" stroke="#66b1ff" />
        <path
          d="m122.519 148.965c42.791-41.729 112.171-41.729 154.962 0l5.15 5.022c2.14 2.086 2.14 5.469 0 7.555l-17.617 17.18c-1.07 1.043-2.804 1.043-3.874 0l-7.087-6.911c-29.853-29.111-78.253-29.111-108.106 0l-7.59 7.401c-1.07 1.043-2.804 1.043-3.874 0l-17.617-17.18c-2.14-2.086-2.14-5.469 0-7.555zm191.397 35.529 15.679 15.29c2.14 2.086 2.14 5.469 0 7.555l-70.7 68.944c-2.139 2.087-5.608 2.087-7.748 0l-50.178-48.931c-.535-.522-1.402-.522-1.937 0l-50.178 48.931c-2.139 2.087-5.608 2.087-7.748 0l-70.7015-68.945c-2.1396-2.086-2.1396-5.469 0-7.555l15.6795-15.29c2.1396-2.086 5.6085-2.086 7.7481 0l50.1789 48.932c.535.522 1.402.522 1.937 0l50.177-48.932c2.139-2.087 5.608-2.087 7.748 0l50.179 48.932c.535.522 1.402.522 1.937 0l50.179-48.931c2.139-2.087 5.608-2.087 7.748 0z"
          fill="#fff"
        />
      </g>
    </svg>
  `,
};
