import { genericChainSpec } from "../../const.js";
import {
  observableSignal,
  type ObservableSignal,
} from "../../observable-signal.js";
import { logAndThrow } from "../../utils.js";
import { DotConnectElement } from "../components/element.js";
import { Task } from "@lit/task";
import { getAccounts } from "@reactive-dot/core/internal/actions.js";
import type { WalletAccount } from "@reactive-dot/core/wallets.js";
import type { LedgerWallet } from "@reactive-dot/wallet-ledger";
import { css, html, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AccountId } from "polkadot-api";

const genericAccountId = AccountId();

@customElement("dc-connected-ledger-account-list-item")
export class ConnectedLedgerAccountListItem extends DotConnectElement {
  @property({ attribute: false })
  wallet!: LedgerWallet;

  @property({ type: Number })
  accountPath!: number;

  #connectedAccounts?: ObservableSignal<WalletAccount[], []>;

  readonly #accountTask = new Task(this, {
    task: async ([wallet, path]) =>
      wallet === undefined
        ? Promise.withResolvers<
            Awaited<ReturnType<LedgerWallet["getConnectedAccount"]>>
          >().promise
        : wallet.getConnectedAccount(path).catch(logAndThrow),
    args: () => [this.wallet, this.accountPath] as const,
  });

  protected override willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has("open")) {
      this.#accountTask.run();
    }
  }

  protected override updated(changedProperties: PropertyValues) {
    if (changedProperties.has("wallet")) {
      this.#connectedAccounts = observableSignal(
        this,
        getAccounts([this.wallet], genericChainSpec),
        [],
      );
    }
  }

  static override styles = [
    super.styles,
    css`
      input[type="checkbox"] {
        pointer-events: none;
      }

      #loading-container {
        min-height: 3.125rem;
      }
    `,
  ];

  protected override render() {
    return this.#accountTask.render({
      pending: () =>
        html`<div id="loading-container">
          <dc-list-item pending>
            <span slot="headline">Fetching account...</span>
          </dc-list-item>
        </div>`,
      complete: (account) => {
        const name = `Ledger account ${this.accountPath + 1}`;

        const connected = this.#connectedAccounts?.value.some(
          (connectedAccount) => connectedAccount.id === account.id,
        );

        return html`<dc-account-list-item
          .address=${genericAccountId.dec(account.publicKey)}
          name=${name}
          type="checkbox"
          clickable
          ?checked=${connected}
          @change=${() => {
            if (connected) {
              this.wallet.accountStore.delete(account);
            } else {
              this.wallet.accountStore.add({ ...account, name });
            }
          }}
        ></dc-account-list-item>`;
      },
      error: () =>
        html`<dc-list-item>
          <span slot="headline">Failed to load account</span>
          <button
            slot="trailing"
            class="xs"
            @click=${() => this.#accountTask.run()}
          >
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
