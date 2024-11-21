import {
  copy as copyIcon,
  users as usersIcon,
  wallet as walletIcon,
} from "../icons/index.js";
import {
  observableSignal,
  type ObservableSignal,
} from "../observable-signal.js";
import { connectedWallets$, walletConfigs, wallets$ } from "../stores.js";
import { getDownloadUrl } from "../utils.js";
import type { InjectedWalletInfo, WalletConfig } from "../wallets/types.js";
import "./components/dialog.js";
import { DotConnectElement } from "./components/element.js";
import "./components/list-item.js";
import "./components/qr-code.js";
import "./ledger/connected-ledger-accounts-dialog.js";
import "./ledger/ledger-dialog.js";
import { computed, effect, signal } from "@lit-labs/preact-signals";
import { connectWallet, disconnectWallet } from "@reactive-dot/core";
import {
  DeepLinkWallet,
  type PolkadotSignerAccount,
  type Wallet,
} from "@reactive-dot/core/wallets.js";
import type { LedgerWallet } from "@reactive-dot/wallet-ledger";
import { css, html, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { join } from "lit/directives/join.js";
import { when } from "lit/directives/when.js";

declare global {
  interface HTMLElementTagNameMap {
    "dc-connection-dialog": ConnectionDialog;
  }
}

@customElement("dc-connection-dialog")
export class ConnectionDialog extends DotConnectElement {
  @property({ type: Boolean })
  open = false;

  readonly #availableWallets = observableSignal(this, wallets$, []);

  readonly #installedWallets = computed(() =>
    this.#availableWallets.value.filter(
      (wallet) =>
        !this.#deepLinkWallets.value.includes(wallet as DeepLinkWallet) &&
        !this.#hardwareWallets.value.includes(wallet),
    ),
  );

  readonly #deepLinkWallets = computed(() =>
    this.#availableWallets.value.filter(
      (wallet) => wallet instanceof DeepLinkWallet,
    ),
  );

  readonly #hardwareWallets = computed(() =>
    this.#availableWallets.value.filter((wallet) =>
      ["ledger"].includes(wallet.id),
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
          font-size: 0.8em;
          margin: 1rem 0.5rem 0.5rem 0.5rem;
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
        ${when(
          this.#installedWallets.value.length > 0,
          () =>
            html`<section>
              <header><h3>Installed</h3></header>
              <ul>
                ${join(
                  this.#installedWallets.value.map(
                    (wallet) => html`<dc-wallet .wallet=${wallet}></dc-wallet>`,
                  ),
                  html`<hr />`,
                )}
              </ul>
            </section>`,
        )}
        ${when(
          "USB" in globalThis && this.#hardwareWallets.value.length > 0,
          () =>
            html`<section>
              <header><h3>Hardware</h3></header>
              <ul>
                ${join(
                  this.#hardwareWallets.value.map(
                    (wallet) =>
                      html`<dc-hardware-wallet
                        .wallet=${wallet}
                      ></dc-hardware-wallet>`,
                  ),
                  html`<hr />`,
                )}
              </ul>
            </section>`,
        )}
        ${when(
          this.#deepLinkWallets.value.length > 0,
          () =>
            html`<section>
              <header><h3>Remote</h3></header>
              <ul>
                ${join(
                  this.#deepLinkWallets.value.map(
                    (wallet) =>
                      html`<dc-deep-link-wallet
                        .wallet=${wallet}
                      ></dc-deep-link-wallet>`,
                  ),
                  html`<hr />`,
                )}
              </ul>
            </section>`,
        )}
        ${when(
          this.#nonInstalledWallets.value.length > 0,
          () =>
            html`<section>
              <header><h3>Popular</h3></header>
              <ul>
                ${join(
                  this.#nonInstalledWallets.value
                    .filter(DownloadableWallet.shouldRender)
                    .map(
                      (wallet) =>
                        html`<dc-downloadable-wallet
                          .wallet=${wallet}
                        ></dc-downloadable-wallet>`,
                    ),
                  html`<hr />`,
                )}
              </ul>
            </section>`,
        )}
      </div>
    </dc-dialog>`;
  }
}

abstract class BaseWalletConnection<
  TWallet extends Wallet = Wallet,
> extends DotConnectElement {
  @property({ attribute: false })
  wallet!: TWallet;

  protected get walletInfo() {
    return walletConfigs.value.find((config) => config.selector(this.wallet));
  }

  readonly #connectedWallets = observableSignal(this, connectedWallets$, []);

  protected accounts!: ObservableSignal<PolkadotSignerAccount[], never[]>;

  protected readonly connected = computed(() =>
    this.#connectedWallets.value.includes(this.wallet),
  );

  protected readonly pending = signal(false);

  protected override updated(changedProperties: PropertyValues) {
    if (changedProperties.has("wallet")) {
      this.accounts = observableSignal(this, this.wallet.accounts$, []);
    }
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
    return html`<dc-list-item ?pending=${this.pending.value}>
      <div slot="leading" class="icon">
        ${this.walletInfo === undefined
          ? walletIcon({ size: "100%" })
          : html`<img src=${this.walletInfo.logo.href} />`}
      </div>
      <span slot="headline">${this.walletInfo?.name ?? this.wallet.name}</span>
      <span
        id="connection-status"
        slot="supporting"
        class=${classMap({ connected: this.connected.value })}
        >${this.connected.value
          ? html`Connected | ${this.accounts.value.length}
              <span class="icon">${usersIcon({ size: "1em" })}</span>`
          : "Not connected"}</span
      >
      ${this.trailing()}
    </dc-list-item>`;
  }

  protected trailing() {
    return html``;
  }
}

@customElement("dc-wallet")
export class WalletConnection extends BaseWalletConnection {
  protected override trailing() {
    return html`<button
      slot="trailing"
      class=${classMap({
        success: !this.connected.value,
        error: this.connected.value,
        sm: true,
      })}
      @click=${async () => {
        if (this.pending.value) {
          return;
        }

        try {
          this.pending.value = true;
          if (this.connected.value) {
            await disconnectWallet(this.wallet);
          } else {
            await connectWallet(this.wallet);
          }
        } catch (error) {
          console.error(error);
        } finally {
          this.pending.value = false;
        }
      }}
    >
      ${this.connected.value ? "Disconnect" : "Connect"}
    </button>`;
  }
}

@customElement("dc-deep-link-wallet")
export class DeepLinkWalletConnection extends BaseWalletConnection<DeepLinkWallet> {
  readonly #uri = signal<string | undefined>(undefined);

  constructor() {
    super();

    effect(() => {
      if (this.connected.value) {
        this.#uri.value = undefined;
      }
    });
  }

  protected override trailing() {
    return html`<button
      slot="trailing"
      class=${classMap({
        success: !this.connected.value,
        error: this.connected.value,
        sm: true,
      })}
      @click=${async () => {
        if (this.pending.value) {
          return;
        }

        try {
          this.pending.value = true;
          if (this.connected.value) {
            await disconnectWallet(this.wallet);
          } else {
            const { uri } = await this.wallet.initiateConnectionHandshake();
            this.#uri.value = uri;
          }
        } catch (error) {
          console.error(error);
        } finally {
          this.pending.value = false;
        }
      }}
    >
      ${this.connected.value ? "Disconnect" : "Connect"}
    </button>`;
  }

  static override styles = [
    super.styles,
    css`
      #url-container {
        display: flex;
        justify-content: center;

        button {
          padding: 0;
          cursor: copy;

          svg {
            vertical-align: -0.125em;
          }
        }
      }
    `,
  ];

  protected override render() {
    return html`<div style="display: content;">
      ${super.render()}
      ${this.#uri.value === undefined
        ? nothing
        : html`<dc-dialog
            ?open=${true}
            @close=${() => (this.#uri.value = undefined)}
          >
            <span slot="title">Scan QR code</span>
            <div slot="content">
              <dc-qr-code
                .uri=${this.#uri.value}
                .logoSrc=${this.walletInfo?.logo.href}
              ></dc-qr-code>
              <div id="url-container">
                <button
                  class="text info"
                  @click=${() =>
                    globalThis.navigator.clipboard.writeText(this.#uri.value!)}
                >
                  Copy link ${copyIcon({ size: "1em" })}
                </button>
              </div>
            </div>
          </dc-dialog>`}
    </div>`;
  }
}

@customElement("dc-hardware-wallet")
export class HardwareWalletConnection extends BaseWalletConnection<LedgerWallet> {
  @state()
  open: false | "manage" | "connect" = false;

  protected override trailing() {
    return html`<button
      slot="trailing"
      class=${classMap({
        success: !this.connected.value,
        info: this.connected.value,
        sm: true,
      })}
      @click=${() => (this.open = this.connected.value ? "manage" : "connect")}
    >
      ${this.connected.value ? "Manage" : "Connect"}
    </button>`;
  }

  protected override render() {
    return html`<div style="display: contents">
      ${super.render()}
      ${when(
        this.open === "manage",
        () =>
          html`<dc-ledger-dialog
            open
            @close=${() => (this.open = false)}
            .wallet=${this.wallet}
          ></dc-ledger-dialog>`,
      )}
      ${when(
        this.open === "connect",
        () =>
          html`<dc-connected-ledger-accounts-dialog
            open
            @close=${() => (this.open = false)}
            .wallet=${this.wallet}
          ></dc-connected-ledger-accounts-dialog>`,
      )}
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

    return html`<dc-list-item>
      <div slot="leading" class="icon">
        <img src=${this.wallet.logo.href} />
      </div>
      <span slot="headline">${this.wallet.name}</span>
      <!-- No way to detect wether or not wallet is installed on mobile browser -->
      ${isMobile ? nothing : html`<span slot="supporting">Not installed</span>`}
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
