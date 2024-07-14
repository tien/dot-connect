import { observableSignal } from "../observable-signal.js";
import { connectedWallets$ } from "../stores.js";
import DotConnectElement from "./components/dc-element.js";
import "./dc-connection-dialog.js";
import { signal } from "@lit-labs/preact-signals";
import { html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("dc-connection-button")
export default class ConnectionButton extends DotConnectElement {
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
          ? "Manage wallets"
          : "Connect wallets"}
      </button>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dc-connection-button": ConnectionButton;
  }
}
