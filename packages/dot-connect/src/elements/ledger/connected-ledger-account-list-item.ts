import { DotConnectElement } from "../components/element.js";
import { Task } from "@lit/task";
import { css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("dc-connected-ledger-account-list-item")
export class ConnectedLedgerAccountListItem extends DotConnectElement {
  @property({ type: Number })
  accountIndex!: number;

  @state()
  checked = false;

  @state()
  retryCount = 0;

  #accountTask = new Task(this, {
    task: async ([accountIndex]) => {
      if (Math.random() < 0.5) {
        throw 0;
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
      return {
        address: "5CLwQ5xmYfBshb9cwndyybRwbc673Rhh4f6s3i3qXbfDebXJ",
        path: `m/44'/354'/${accountIndex}'/0/0`,
      };
    },
    args: () => [this.accountIndex, this.retryCount] as const,
  });

  static override styles = [
    super.styles,
    css`
      input[type="checkbox"] {
        pointer-events: none;
      }
    `,
  ];

  protected override render() {
    return this.#accountTask.render({
      pending: () =>
        html`<dc-list-item pending>
          <span slot="headline">Fetching account...</span>
        </dc-list-item>`,
      complete: (account) =>
        html`<dc-account-list-item
          address=${account.address}
          name="Account ${this.accountIndex + 1}"
          type="checkbox"
          clickable
          ?checked=${this.checked}
          @change=${() => (this.checked = !this.checked)}
        ></dc-account-list-item>`,
      error: () =>
        html`<dc-list-item>
          <span slot="headline">Failed to load account</span>
          <button slot="trailing" class="xs" @click=${() => this.retryCount++}>
            Retry
          </button>
        </dc-list-item>`,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dc-connected-ledger-account-list-item": ConnectedLedgerAccountListItem;
  }
}
