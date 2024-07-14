import {
  wallets as walletsIcon,
  wallet as walletIcon,
} from "../icons/index.js";
import { observableSignal } from "../observable-signal.js";
import { connectedWallets$ } from "../stores.js";
import DotConnectElement from "./components/dc-element.js";
import "./dc-connection-dialog.js";
import { signal } from "@lit-labs/preact-signals";
import { css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("dc-connection-button")
export default class ConnectionButton extends DotConnectElement {
  static override styles = [
    super.styles,
    css`
      :host {
        font-size: 1.5em;
      }

      .icon {
        vertical-align: middle;
      }
    `,
  ];

  readonly #dialogOpen = signal(false);

  readonly #connectedWallets = observableSignal(this, connectedWallets$, []);

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
              >`
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
}
