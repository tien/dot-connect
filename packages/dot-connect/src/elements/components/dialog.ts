import { close as closeIcon } from "../../icons/index.js";
import { DotConnectElement } from "./element.js";
import { css, html, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createRef, ref } from "lit/directives/ref.js";

@customElement("dc-dialog")
export class Dialog extends DotConnectElement {
  @property({ type: Boolean })
  open = false;

  readonly #dialogRef = createRef<HTMLDialogElement>();

  protected override updated(changedProperties: PropertyValues) {
    if (changedProperties.has("open")) {
      if (this.open) {
        this.#dialogRef.value?.showModal();
      } else {
        this.#dialogRef.value?.close();
      }
    }
  }

  #isBackdropClick(event: MouseEvent) {
    if (this.#dialogRef.value === undefined) {
      return false;
    }

    const boundingClientRect = this.#dialogRef.value.getBoundingClientRect();

    return (
      event.clientX < boundingClientRect.left ||
      event.clientX > boundingClientRect.right ||
      event.clientY < boundingClientRect.top ||
      event.clientY > boundingClientRect.bottom
    );
  }

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
          border-radius: min(1.5rem, var(--max-border-radius));
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

  override render() {
    return html`<dialog
      ${ref(this.#dialogRef)}
      @close=${(event: Event) =>
        this.dispatchEvent(new Event(event.type, event))}
      @pointerdown=${(event: MouseEvent) => {
        if (this.#isBackdropClick(event)) {
          this.#dialogRef.value?.addEventListener(
            "pointerup",
            (event) => {
              if (this.#isBackdropClick(event)) {
                this.#dialogRef.value?.close();
              }
            },
            { once: true },
          );
        }
      }}
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
