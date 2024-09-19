import "../components/account-list-item.js";
import { DotConnectElement } from "../components/element.js";
import "./connected-ledger-accounts-dialog.js";
import "dot-identicon";
import { css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

@customElement("dc-ledger-dialog")
export class LedgerDialog extends DotConnectElement {
  @property({ type: Boolean })
  open = false;

  @state()
  protected connectedAccounts = [
    { address: "5CLwQ5xmYfBshb9cwndyybRwbc673Rhh4f6s3i3qXbfDebXJ", path: "" },
    { address: "5CLwQ5xmYfBshb9cwndyybRwbc673Rhh4f6s3i3qXbfDebXJ", path: "" },
  ] as Array<{ address: string; path: string }>;

  @state()
  protected addDialogOpen = false;

  static override styles = [
    super.styles,
    css`
      header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 0 0.5rem 0.75rem 0.5rem;

        h3 {
          font-size: 0.75em;
        }
      }

      hr {
        margin-inline-start: 3.2rem;
        margin-inline-end: 0.5rem;
        border-top: 1px solid var(--color-on-surface);
        opacity: 0.25;
      }
    `,
  ];

  protected override render() {
    return html`<dc-dialog
        ?open=${this.open}
        @close=${(event: Event) =>
          this.dispatchEvent(new Event(event.type, event))}
      >
        <span slot="title">Ledger</span>
        <section slot="content">
          <header>
            <h3>Connected accounts</h3>
            <button class="text" @click=${() => (this.addDialogOpen = true)}>
              Add more
            </button>
          </header>
          ${repeat(
            this.connectedAccounts,
            (account) => account.address,
            (account, index) =>
              html`<dc-account-list-item address=${account.address}>
                  <button slot="trailing" class="error sm">
                    Remove
                  </button></dc-account-list-item
                >${this.connectedAccounts.length <= 1 ||
                index === this.connectedAccounts.length - 1
                  ? nothing
                  : html`<hr />`}`,
          )}
        </section>
      </dc-dialog>
      <dc-connected-ledger-accounts-dialog
        ?open=${this.addDialogOpen}
        @close=${() => (this.addDialogOpen = false)}
      ></dc-connected-ledger-accounts-dialog>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dc-ledger-dialog": LedgerDialog;
  }
}
