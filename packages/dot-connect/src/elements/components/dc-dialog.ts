import { close as closeIcon } from "../../icons/index.js";
import DotConnectElement from "./dc-element.js";
import { effect, signal } from "@lit-labs/preact-signals";
import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref } from "lit/directives/ref.js";

@customElement("dc-dialog")
export default class Dialog extends DotConnectElement {
  static override get styles() {
    return [
      super.styles,
      css`
        dialog {
          width: 100dvw;

          @media (min-width: 20rem) {
            width: revert;
            min-width: 20rem;
          }

          box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.32);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1.5rem;
          background-color: var(--surface-color);
          padding: 1.2rem;

          opacity: 0;
          translate: 0 2rem;

          transition:
            opacity 0.25s,
            translate 0.25s,
            overlay 0.25s allow-discrete,
            display 0.25s allow-discrete;

          &[open] {
            opacity: 1;
            translate: 0 0;

            @starting-style {
              opacity: 0;
              translate: 0 2rem;
            }
          }
        }

        dialog::backdrop {
          background-color: rgba(0, 0, 0, 0);
          backdrop-filter: blur(0px);
          transition:
            background-color 0.25s,
            backdrop-filter 0.25s,
            overlay 0.25s allow-discrete,
            display 0.25s allow-discrete;
        }

        dialog[open]::backdrop {
          background-color: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(16px);

          @starting-style {
            background-color: rgba(0, 0, 0, 0);
            backdrop-filter: blur(0px);
          }
        }

        header {
          display: flex;
          align-items: center;
          gap: 1rem;

          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--on-surface-color);

          h2 {
            flex: 1;
            font-size: 1em;
            text-align: center;
            margin-inline-start: 2rem;
          }

          #close-button {
            cursor: pointer;
          }
        }
      `,
    ];
  }

  @property({ type: Boolean })
  set open(open: boolean) {
    this.#open.value = open;
  }

  readonly #dialogRef = signal<HTMLDialogElement | undefined>(undefined);

  readonly #open = signal(false);

  constructor() {
    super();

    effect(() => {
      const dialog = this.#dialogRef.value;

      if (dialog === undefined) {
        return;
      }

      if (dialog.open && !this.#open.value) {
        dialog.close();
      }

      if (!dialog.open && this.#open.value) {
        dialog.showModal();
      }
    });
  }

  override render() {
    return html`<dialog
      ${ref(
        (element) => (this.#dialogRef.value = element as HTMLDialogElement),
      )}
      @close=${(event: Event) =>
        this.dispatchEvent(new Event(event.type, event))}
    >
      <header>
        <h2><slot name="title"></slot></h2>
        <div
          id="close-button"
          role="button"
          @click=${() => this.#dialogRef.value?.close()}
        >
          ${closeIcon({ size: "1rem" })}
        </div>
      </header>
      <slot name="content"></slot>
    </dialog>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dc-dialog": Dialog;
  }
}
