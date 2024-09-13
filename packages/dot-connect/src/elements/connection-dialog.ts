import { users as usersIcon, wallet as walletIcon } from "../icons/index.js";
import { observableSignal } from "../observable-signal.js";
import {
  accounts$,
  connectedWallets$,
  walletConfigs,
  wallets$,
} from "../stores.js";
import type { SupportedWallet } from "../types.js";
import { getDownloadUrl } from "../utils.js";
import type { InjectedWalletInfo, WalletConfig } from "../wallets/types.js";
import "./components/dialog.js";
import { DotConnectElement } from "./components/element.js";
import "./components/list-item.js";
import "./components/qr-code.js";
import { computed, effect, signal } from "@lit-labs/preact-signals";
import { connectWallet, disconnectWallet } from "@reactive-dot/core";
import { DeepLinkWallet, InjectedWallet } from "@reactive-dot/core/wallets.js";
import { css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { join } from "lit/directives/join.js";

@customElement("dc-connection-dialog")
export class ConnectionDialog extends DotConnectElement {
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

  show() {
    this.open = true;
  }

  close() {
    this.open = false;
  }

  static override get styles() {
    return [
      super.styles,
      css`
        h3 {
          font-size: 0.75em;
          margin: 0.5rem 0.5rem;
        }

        hr {
          margin-inline-start: 3.2rem;
          margin-inline-end: 0.5rem;
          border-top: 1px solid var(--color-on-surface);
          opacity: 0.25;
        }
      `,
    ];
  }

  override render() {
    return html`<dc-dialog
      ?open=${this.open}
      @close=${(event: Event) => {
        this.close();
        this.dispatchEvent(new Event(event.type, event));
      }}
    >
      <span slot="title">Connect wallet</span>
      <div slot="content">
        ${this.#installedWallets.value.length <= 0
          ? ""
          : html`<section>
              <header><h3>Installed</h3></header>
              <ul>
                ${join(
                  this.#installedWallets.value.map(
                    (wallet) =>
                      html`<dc-injected-wallet
                        .wallet=${wallet}
                      ></dc-injected-wallet>`,
                  ),
                  html`<hr />`,
                )}
              </ul>
            </section>`}
        <section>
          <header><h3>Popular</h3></header>
          <ul>
            ${join(
              [
                ...this.#nonInstalledWallets.value
                  .filter(DownloadableWallet.shouldRender)
                  .map(
                    (wallet) =>
                      html`<dc-downloadable-wallet
                        .wallet=${wallet}
                      ></dc-downloadable-wallet>`,
                  ),
                ...this.#deepLinkWallets.value.map(
                  (wallet) =>
                    html`<dc-deep-link-wallet
                      .wallet=${wallet}
                    ></dc-deep-link-wallet>`,
                ),
              ],
              html`<hr />`,
            )}
          </ul>
        </section>
      </div>
    </dc-dialog>`;
  }
}

@customElement("dc-injected-wallet")
export class InjectedWalletConnection extends DotConnectElement {
  @property({ attribute: false })
  wallet!: SupportedWallet;

  get #walletInfo() {
    return walletConfigs.value.find((config) => config.selector(this.wallet));
  }

  readonly #connectedWallets = observableSignal(this, connectedWallets$, []);

  readonly #connectedAccounts = observableSignal(this, accounts$, []);

  readonly #accounts = computed(() =>
    this.#connectedAccounts.value.filter(
      (account) => account.wallet === this.wallet,
    ),
  );

  readonly #connected = computed(() =>
    this.#connectedWallets.value.includes(this.wallet),
  );

  readonly #pending = signal(false);

  static override readonly styles = [
    super.styles,
    css`
      button {
        min-width: 5rem;
      }

      #connection-status.connected {
        color: var(--success-color);
      }

      .icon {
        display: contents;
        > * {
          vertical-align: -0.125em;
        }
      }
    `,
  ];

  protected override render() {
    return html`<dc-list-item id="list-item" ?pending=${this.#pending.value}>
      <div slot="leading">
        ${this.#walletInfo?.logo ?? walletIcon({ size: "100%" })}
      </div>
      <span slot="headline">${this.#walletInfo?.name ?? this.wallet.name}</span>
      <span
        id="connection-status"
        slot="supporting"
        class=${classMap({ connected: this.#connected.value })}
        >${this.#connected.value
          ? html`Connected | ${this.#accounts.value.length}
              <span class="icon">${usersIcon({ size: "1em" })}</span>`
          : "Not connected"}</span
      >
      <button
        slot="trailing"
        class=${classMap({
          success: !this.#connected.value,
          error: this.#connected.value,
          sm: true,
        })}
        @click=${async () => {
          if (this.#pending.value) {
            return;
          }

          try {
            this.#pending.value = true;
            if (this.#connected.value) {
              await disconnectWallet(this.wallet);
            } else {
              await connectWallet(this.wallet);
            }
          } finally {
            this.#pending.value = false;
          }
        }}
      >
        ${this.#connected.value ? "Disconnect" : "Connect"}
      </button>
    </dc-list-item>`;
  }
}

@customElement("dc-deep-link-wallet")
export class DeepLinkWalletConnection extends DotConnectElement {
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

  static override readonly styles = [
    super.styles,
    css`
      button {
        min-width: 5rem;
      }

      #connection-status.connected {
        color: var(--success-color);
      }
    `,
  ];

  protected override render() {
    return html`<div style="display: content;">
      <dc-list-item id="list-item" ?pending=${this.#pending.value}>
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
        <button
          slot="trailing"
          class=${classMap({
            success: !this.#connected.value,
            error: this.#connected.value,
            sm: true,
          })}
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
        >
          ${this.#connected.value ? "Disconnect" : "Connect"}
        </button>
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
  @property({ attribute: false })
  wallet!: InjectedWalletInfo;

  // TODO: this is a hack
  static shouldRender(wallet: InjectedWalletInfo) {
    return getDownloadUrl(wallet) !== undefined;
  }

  get #downloadUrl() {
    return getDownloadUrl(this.wallet);
  }

  static override styles = [
    super.styles,
    css`
      button {
        min-width: 5rem;
      }
    `,
  ];

  protected override render() {
    if (this.#downloadUrl === undefined) {
      return nothing;
    }

    const isMobile =
      this.#downloadUrl.platform === "android" ||
      this.#downloadUrl.platform === "ios";

    return html`<dc-list-item id="list-item">
      <div slot="leading">${this.wallet.logo}</div>
      <span slot="headline">${this.wallet.name}</span>
      <!-- No way to detect wether or not wallet is installed on mobile browser -->
      ${isMobile ? "" : html`<span slot="supporting">Not installed</span>`}
      <a
        slot="trailing"
        style="display: content; text-decoration: none;"
        href=${this.#downloadUrl.url}
        target="_blank"
      >
        <button class="info sm">Get</button></a
      >
    </dc-list-item>`;
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
