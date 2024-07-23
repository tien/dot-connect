import {
  users as usersIcon,
  wallet as walletIcon,
  wallets as walletsIcon,
} from "../icons/index.js";
import { observableSignal } from "../observable-signal.js";
import { accounts$, connectedWallets$ } from "../stores.js";
import { DotConnectElement } from "./components/dc-element.js";
import "./dc-connection-dialog.js";
import { signal } from "@lit-labs/preact-signals";
import { css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("dc-connection-button")
export class ConnectionButton extends DotConnectElement {
  static override styles = [
    super.styles,
    css`
      :host {
        font-size: 1.5em;
      }

      .icon {
        display: contents;
        > * {
          vertical-align: -0.125em;
        }
      }
    `,
  ];

  readonly #dialogOpen = signal(false);

  readonly #connectedWallets = observableSignal(this, connectedWallets$, []);

  readonly #accounts = observableSignal(this, accounts$, []);

  override render() {
    return html`<div>
      <dc-connection-dialog
        ?open=${this.#dialogOpen.value}
        @close=${() => (this.#dialogOpen.value = false)}
      ></dc-connection-dialog>
      <button @click=${() => (this.#dialogOpen.value = true)}>
        ${this.#connectedWallets.value.length > 0
          ? html`Connected | ${this.#connectedWallets.value.length}
              <span class="icon"
                >${this.#connectedWallets.value.length === 1
                  ? walletIcon({ size: "1em" })
                  : walletsIcon({ size: "1em" })}</span
              >
              ${this.#accounts.value.length}
              <span class="icon">${usersIcon({ size: "1em" })}</span>`
          : html`Connect
              <span class="icon">${walletsIcon({ size: "1em" })}</span>`}
      </button>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dc-connection-button": ConnectionButton;
  }

  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      "dc-connection-button": any;
    }
  }
}
