import { identifyBrowser, urlFromSvg } from "../utils.js";
import type { InjectedWalletInfo, WalletConfig } from "./types.js";
import type { Wallet } from "@reactive-dot/core/wallets.js";
import { html } from "lit";

export const nova: WalletConfig<InjectedWalletInfo> = {
  selector: (wallet: Wallet) =>
    wallet.id === "injected/polkadot-js" &&
    // TODO: remove once Nova is fixed
    ["ios", "android"].includes(identifyBrowser()!),
  name: "Nova Wallet",
  platforms: ["ios", "android"],
  logo: urlFromSvg(
    html`<svg
      x="0px"
      y="0px"
      viewBox="0 0 324 324"
      style="enable-background:new 0 0 324 324;"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style type="text/css">
        .st0 {
          fill: url(#SVGID_1_);
        }
        .st1 {
          fill: #ffffff;
        }
      </style>
      <radialGradient
        id="SVGID_1_"
        cx="8.15"
        cy="19.93"
        r="372.6356"
        gradientTransform="matrix(1 0 0 -1 0 326)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="5.331913e-02" style="stop-color:#D7D3E9" />
        <stop offset="0.1933" style="stop-color:#A19CDE" />
        <stop offset="0.3834" style="stop-color:#696BD9" />
        <stop offset="0.54" style="stop-color:#3A5AE7" />
        <stop offset="0.7735" style="stop-color:#225FE7" />
        <stop offset="1" style="stop-color:#0883D1" />
      </radialGradient>
      <path
        class="st0"
        d="M84.1,0h155.8C286.3,0,324,37.7,324,84.1v155.8c0,46.5-37.7,84.1-84.1,84.1H84.1C37.7,324,0,286.3,0,239.9V84.1  C0,37.7,37.7,0,84.1,0z"
      />
      <path
        class="st1"
        d="M275,166.7v3c-18.4,2.9-58,9.8-77.5,17.2c-7,2.7-12.5,8.1-15.2,15.1c-7.4,19.4-14.4,59.2-17.3,77.7h-6  c-2.9-18.5-9.9-58.4-17.3-77.7c-2.7-6.9-8.2-12.4-15.2-15.1c-19.5-7.5-59-14.3-77.5-17.2v-6c18.4-2.9,58-9.8,77.5-17.2  c7-2.7,12.5-8.1,15.2-15.1c7.5-19.4,14.4-59.2,17.3-77.7h6c2.9,18.5,9.9,58.3,17.3,77.7c2.7,6.9,8.2,12.4,15.2,15.1  c19.5,7.4,59.1,14.3,77.5,17.2L275,166.7z"
      />
    </svg>`,
  ),
  recommended: true,
  downloadUrl: {
    ios: "https://apps.apple.com/us/app/nova-polkadot-wallet/id1597119355",
    android:
      "https://play.google.com/store/apps/details?id=io.novafoundation.nova.market",
  },
};
