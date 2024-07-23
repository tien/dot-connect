import "./dc-circular-progress-indicator.js";
import { DotConnectElement } from "./dc-element.js";
import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";

@customElement("dc-list-item")
export class ListItem extends DotConnectElement {
  static override readonly styles = [
    super.styles,
    css`
      li {
        display: grid;
        grid-template-areas:
          "leading headline   trailing"
          "leading supporting trailing";
        grid-template-columns: min-content 1fr min-content;
        align-items: center;
        gap: 0 0.75rem;

        border-radius: min(1rem, var(--max-border-radius));
        padding: 0.5rem;

        transition: backdrop-filter 0.125s;

        &.clickable {
          cursor: pointer;

          &:hover {
            backdrop-filter: invert(8%);

            @starting-style {
              backdrop-filter: invert(0);
            }
          }
        }
      }

      #headline {
        grid-area: headline;
        font-weight: 500;
      }

      #leading {
        grid-area: leading;
        width: 2rem;
        height: 2rem;
      }

      #supporting {
        grid-area: supporting;
        font-size: 0.75em;
      }

      #trailing {
        grid-area: trailing;

        width: 1.25rem;
        height: 1.25rem;

        opacity: 0;
        transition: opacity 0.125s;
      }

      li:hover #trailing {
        opacity: 1;

        @starting-style {
          opacity: 0;
        }
      }
    `,
  ];

  @property({ type: Boolean })
  clickable = false;

  @property({ type: Boolean })
  pending = false;

  protected override render() {
    return html`<li
      class=${classMap({ clickable: this.clickable })}
      role="button"
    >
      <header id="headline"><slot name="headline"></slot></header>
      <div id="leading"><slot name="leading"></slot></div>
      <div id="supporting"><slot name="supporting"></slot></div>
      <div
        id="trailing"
        style=${styleMap({ opacity: this.pending ? 1 : undefined })}
      >
        ${this.pending
          ? html`<dc-circular-progress-indicator
              size="100%"
            ></dc-circular-progress-indicator>`
          : html`<slot name="trailing"></slot>`}
      </div>
    </li>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dc-list-item": ListItem;
  }
}
