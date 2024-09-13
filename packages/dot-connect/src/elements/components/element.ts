import { SignalWatcher } from "@lit-labs/preact-signals";
import { LitElement, css, type CSSResultGroup } from "lit";

export abstract class DotConnectElement extends SignalWatcher(LitElement) {
  static override readonly styles: CSSResultGroup = css`
    * {
      --headline-font-family: var(--dc-headline-font-family, Unbounded);
      --body-font-family: var(--dc-body-font-family, Inter);

      --primary-color: var(--dc-primary-color, #e6007a);
      --on-primary-color: var(--dc-on-primary-color, white);

      --surface-color: var(--dc-surface-color, light-dark(white, #1a1b1f));
      --on-surface-color: var(--dc-on-surface-color, light-dark(black, white));

      --info-color: var(--dc-info-color, #0e76fd);
      --success-color: var(--dc-success-color, #1db847);
      --error-color: var(--dc-error-color, #ff494a);

      --max-border-radius: var(--dc-max-border-radius, 999px);
    }

    :host {
      all: initial;
      color-scheme: inherit;
      font-family: var(--body-font-family), sans-serif;
      color: var(--on-surface-color);
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: var(--headline-font-family), sans-serif;
      margin: 0;
    }

    button {
      color: var(--on-primary-color);
      font-weight: 600;
      border: none;
      border-radius: min(999px, var(--max-border-radius));
      background-color: var(--primary-color);
      padding: 0.8em 1.25rem;
      cursor: pointer;
      transition: scale 0.25s;

      &:hover {
        scale: 1.04;
      }
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  `;
}
