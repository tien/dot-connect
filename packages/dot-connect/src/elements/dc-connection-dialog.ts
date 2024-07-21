import {
  connected as connectedIcon,
  disconnected as disconnectedIcon,
  download as downloadIcon,
  qrCode as qrCodeIcon,
  wallet as walletIcon,
} from "../icons/index.js";
import { observableSignal } from "../observable-signal.js";
import { connectedWallets$, walletConfigs, wallets$ } from "../stores.js";
import { SupportedWallet } from "../types.js";
import { getDownloadUrl } from "../utils.js";
import { InjectedWalletInfo, WalletConfig } from "../wallets/types.js";
import "./components/dc-dialog.js";
import DotConnectElement from "./components/dc-element.js";
import "./components/dc-list-item.js";
import "./components/dc-qr-code.js";
import { computed, effect, signal } from "@lit-labs/preact-signals";
import { connectWallet, disconnectWallet } from "@reactive-dot/core";
import { DeepLinkWallet, InjectedWallet } from "@reactive-dot/core/wallets.js";
import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

@customElement("dc-injected-wallet")
export class InjectedWalletConnection extends DotConnectElement {
  static override readonly styles = [
    super.styles,
    css`
      #connection-status.connected {
        color: var(--success-color);
      }

      #hover-icon {
        &.connected {
          color: var(--error-color);
        }
      }
    `,
  ];

  @property({ attribute: false })
  wallet!: SupportedWallet;

  get walletInfo() {
    return walletConfigs.value.find((config) => config.selector(this.wallet));
  }

  readonly #connectedWallets = observableSignal(this, connectedWallets$, []);

  readonly #connected = computed(() =>
    this.#connectedWallets.value.includes(this.wallet),
  );

  readonly #pending = signal(false);

  protected override render() {
    return html`<dc-list-item
      id="list-item"
      ?clickable=${true}
      @click=${async () => {
        if (this.#pending.value) {
          return;
        }

        try {
          this.#pending.value = true;
          this.#connected.value
            ? await disconnectWallet(this.wallet)
            : await connectWallet(this.wallet);
        } finally {
          this.#pending.value = false;
        }
      }}
      ?pending=${this.#pending.value}
    >
      <div slot="leading">
        ${this.walletInfo?.logo ?? walletIcon({ size: "100%" })}
      </div>
      <span slot="headline">${this.walletInfo?.name ?? this.wallet.name}</span>
      <span
        id="connection-status"
        slot="supporting"
        class=${classMap({ connected: this.#connected.value })}
        >${this.#connected.value ? "Connected" : "Not connected"}</span
      >
      <div
        id="hover-icon"
        class=${classMap({ connected: this.#connected.value })}
        slot="trailing"
      >
        ${this.#connected.value
          ? disconnectedIcon({ size: "100%" })
          : connectedIcon({ size: "100%" })}
      </div>
    </dc-list-item>`;
  }
}

@customElement("dc-deep-link-wallet")
export class DeepLinkWalletConnection extends DotConnectElement {
  static override readonly styles = [
    super.styles,
    css`
      #connection-status.connected {
        color: var(--success-color);
      }

      #hover-icon {
        &.connected {
          color: var(--error-color);
        }
      }
    `,
  ];

  @property({ attribute: false })
  wallet!: DeepLinkWallet;

  get #walletInfo() {
    return walletConfigs.value.find((config) => config.selector(this.wallet));
  }

  readonly #connectedWallets = observableSignal(this, connectedWallets$, []);

  readonly #connected = computed(() =>
    this.#connectedWallets.value.includes(this.wallet),
  );

  readonly #uri = signal<string | undefined>(undefined);

  readonly #pending = signal(false);

  constructor() {
    super();

    effect(() => {
      if (this.#connected.value) {
        this.#uri.value = undefined;
      }
    });
  }

  protected override render() {
    return html`<div style="display: content;">
      <dc-list-item
        id="list-item"
        ?clickable=${true}
        @click=${async () => {
          if (this.#pending.value) {
            return;
          }

          try {
            this.#pending.value = true;
            if (this.#connected.value) {
              disconnectWallet(this.wallet);
            } else {
              const { uri } = await this.wallet.initiateConnectionHandshake();
              this.#uri.value = uri;
            }
          } finally {
            this.#pending.value = false;
          }
        }}
        ?pending=${this.#pending.value}
      >
        <div slot="leading">
          ${this.#walletInfo?.logo ?? walletIcon({ size: "100%" })}
        </div>
        <span slot="headline"
          >${this.#walletInfo?.name ?? this.wallet.name}</span
        >
        <span
          id="connection-status"
          slot="supporting"
          class=${classMap({ connected: this.#connected.value })}
          >${this.#connected.value ? "Connected" : "Not connected"}</span
        >
        <div
          id="hover-icon"
          class=${classMap({ connected: this.#connected.value })}
          slot="trailing"
        >
          ${this.#connected.value
            ? disconnectedIcon({ size: "100%" })
            : qrCodeIcon({ size: "100%" })}
        </div>
      </dc-list-item>
      ${this.#uri.value === undefined
        ? ""
        : html`<dc-dialog
            ?open=${true}
            @close=${() => (this.#uri.value = undefined)}
          >
            <span slot="title">Scan QR code</span>
            <div slot="content">
              <dc-qr-code
                .uri=${this.#uri.value}
                .logoSrc=${(() => {
                  const svg = this.#walletInfo?.logo.strings.join("");

                  if (svg === undefined) {
                    return;
                  }

                  return `data:image/svg+xml;base64,${globalThis.btoa(svg)}`;
                })()}
              ></dc-qr-code>
            </div>
          </dc-dialog>`}
    </div>`;
  }
}

@customElement("dc-downloadable-wallet")
export class DownloadableWallet extends DotConnectElement {
  static override readonly styles = [
    super.styles,
    css`
      #hover-icon {
        color: var(--info-color);
      }
    `,
  ];

  @property({ attribute: false })
  wallet!: InjectedWalletInfo;

  get #downloadUrl() {
    return getDownloadUrl(this.wallet);
  }

  protected override render() {
    if (this.#downloadUrl === undefined) {
      return;
    }

    const isMobile =
      this.#downloadUrl.platform === "android" ||
      this.#downloadUrl.platform === "ios";

    return html`<a
      style="display: content; text-decoration: none;"
      href=${this.#downloadUrl.url}
      target="_blank"
      ><dc-list-item id="list-item" .clickable=${true}>
        <div slot="leading">${this.wallet.logo}</div>
        <span slot="headline">${this.wallet.name}</span>
        <!-- No way to detect wether or not wallet is installed on mobile browser -->
        ${isMobile ? "" : html`<span slot="supporting">Not installed</span>`}
        <div id="hover-icon" slot="trailing">
          ${downloadIcon({ size: "100%" })}
        </div>
      </dc-list-item></a
    >`;
  }
}

@customElement("dc-connection-dialog")
export default class ConnectionDialog extends DotConnectElement {
  static override get styles() {
    return [
      super.styles,
      css`
        h3 {
          font-size: 0.75em;
          margin: 0.5rem 0.5rem;
        }

        #wallet-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
      `,
    ];
  }

  @property({ type: Boolean })
  open = false;

  readonly #availableWallets = observableSignal(this, wallets$, []);

  readonly #installedWallets = computed(() =>
    this.#availableWallets.value.filter(
      (wallet) => wallet instanceof InjectedWallet,
    ),
  );

  readonly #deepLinkWallets = computed(() =>
    this.#availableWallets.value.filter(
      (wallet) => wallet instanceof DeepLinkWallet,
    ),
  );

  readonly #nonInstalledWallets = computed(() =>
    walletConfigs.value.filter(
      (config): config is WalletConfig<InjectedWalletInfo> =>
        "downloadUrl" in config &&
        !this.#installedWallets.value.some((wallet) => config.selector(wallet)),
    ),
  );

  override render() {
    return html`<dc-dialog
      ?open=${this.open}
      @close=${(event: Event) =>
        this.dispatchEvent(new Event(event.type, event))}
    >
      <span slot="title">Connect wallet</span>
      <div slot="content">
        ${this.#installedWallets.value.length <= 0
          ? ""
          : html`<section>
              <header><h3>Installed</h3></header>
              <ul id="wallet-list">
                ${this.#installedWallets.value.map(
                  (wallet) =>
                    html`<dc-injected-wallet
                      .wallet=${wallet}
                    ></dc-injected-wallet>`,
                )}
              </ul>
            </section>`}
        <section>
          <header><h3>Popular</h3></header>
          <ul>
            ${this.#nonInstalledWallets.value.map(
              (wallet) =>
                html`<dc-downloadable-wallet
                  .wallet=${wallet}
                ></dc-downloadable-wallet>`,
            )}
            ${this.#deepLinkWallets.value.map(
              (wallet) =>
                html`<dc-deep-link-wallet
                  .wallet=${wallet}
                ></dc-deep-link-wallet>`,
            )}
          </ul>
        </section>
      </div>
    </dc-dialog>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dc-connection-dialog": ConnectionDialog;
  }

  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      "dc-connection-dialog": any;
    }
  }
}
