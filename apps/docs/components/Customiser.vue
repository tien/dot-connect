<script lang="ts" setup>
import WalletConnectionButton from "./WalletConnectionButton.vue";
import { ref, computed } from "vue";

const colourScheme = ref<"inherit" | "light" | "dark">("inherit");

const primary = ref("#ff2670");
const onPrimary = ref("#ffffff");

const surface = ref("#ffffff");
const surfaceDark = ref("#1e1e1e");

const onSurface = ref("#000000");
const onSurfaceDark = ref("#ffffff");

const info = ref("#007aff");
const infoDark = ref("#0a84ff");

const success = ref("#34c759");
const successDark = ref("#30d158");

const error = ref("#ff3b30");
const errorDark = ref("#ff453a");

const maxBorderRadius = ref(25);

const style = computed(() => ({
  colorScheme: colourScheme.value,
  "--dc-primary-color": primary.value,
  "--dc-on-primary-color": onPrimary.value,
  "--dc-surface-color": `light-dark(${surface.value}, ${surfaceDark.value})`,
  "--dc-on-surface-color": `light-dark(${onSurface.value}, ${onSurfaceDark.value})`,
  "--dc-info-color": `light-dark(${info.value}, ${infoDark.value})`,
  "--dc-success-color": `light-dark(${success.value}, ${successDark.value})`,
  "--dc-error-color": `light-dark(${error.value}, ${errorDark.value})`,
  "--dc-max-border-radius": maxBorderRadius.value + "px",
  "--dc-headline-font-family": "Unbounded, sans-serif",
  "--dc-body-font-family": "Manrope, sans-serif",
}));

function toCss(style: Record<string, any>) {
  const styles = Object.entries(style)
    .filter(([_, value]) => value !== "inherit")
    .reduce((acc, [key, value]) => {
      const convertedKey = key.replace(/[A-Z]/g, (match) => {
        return `-${match.toLowerCase()}`;
      });

      acc.push(`${convertedKey}: ${value}`);

      return acc;
    }, [] as string[])
    .map((style) => `${style};`)
    .join("\n  ");

  return `:root {
  ${styles}
}`;
}
</script>

<template>
  <section>
    <form @submit.prevent="">
      <fieldset>
        <legend>Preview</legend>
        <div id="button-container" :style="style">
          <WalletConnectionButton />
        </div>
      </fieldset>
      <div id="options">
        <fieldset>
          <legend>Colour scheme</legend>
          <label
            ><input type="radio" value="inherit" v-model="colourScheme" />
            Inherit
          </label>
          <label
            ><input type="radio" value="light" v-model="colourScheme" />
            Light</label
          >
          <label
            ><input type="radio" value="dark" v-model="colourScheme" />
            Dark</label
          >
        </fieldset>
        <fieldset id="colours-fieldset">
          <legend>Colours</legend>
          <div id="colour-sections">
            <section>
              <label><input type="color" v-model="primary" /> Primary</label>
              <label
                ><input type="color" v-model="onPrimary" /> On-primary</label
              >
            </section>
            <section>
              <label><input type="color" v-model="surface" /> Surface</label>
              <label
                ><input type="color" v-model="surfaceDark" /> Surface
                (Dark)</label
              >
              <label
                ><input type="color" v-model="onSurface" /> On-surface</label
              >
              <label
                ><input type="color" v-model="onSurfaceDark" /> On-surface
                (Dark)</label
              >
            </section>
            <section>
              <label><input type="color" v-model="info" /> Info</label>
              <label
                ><input type="color" v-model="infoDark" /> Info (Dark)</label
              >
              <label><input type="color" v-model="success" /> Success</label>
              <label
                ><input type="color" v-model="successDark" /> Success
                (Dark)</label
              >
              <label><input type="color" v-model="error" /> Error</label>
              <label
                ><input type="color" v-model="errorDark" /> Error (Dark)</label
              >
            </section>
          </div>
        </fieldset>
        <fieldset>
          <legend>Radius</legend>
          <label for="max-border-radius">Maximum border radius</label>
          <input
            id="max-border-radius"
            type="range"
            min="0"
            max="25"
            v-model="maxBorderRadius"
          />
          <div>
            Value:
            <output for="max-border-radius">{{ maxBorderRadius }}px</output>
          </div>
        </fieldset>
      </div>
      <fieldset>
        <legend>CSS</legend>
        <div class="language-css vp-adaptive-theme">
          <pre><code>{{ toCss(style) }}</code></pre>
        </div>
      </fieldset>
    </form>
  </section>
</template>

<style>
form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

fieldset {
  border: 1px solid var(--vp-c-divider);
  border-radius: 1rem;

  /* Bug with Vue or VitePress */
  padding: 1rem !important;

  @container (max-width: 60rem) {
    flex-basis: 100%;
  }
}

legend {
  font-weight: bold;
}

label {
  display: flex;
  align-items: center;

  input {
    margin-right: 0.75em;
  }

  input[type="color"] {
    margin-right: 0.75em;
  }
}

label + label {
  margin-top: 0.5rem;
}

input[type="color"] {
  all: revert;
}

#button-container {
  padding: 1rem 0;
}

#options {
  container-type: inline-size;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

#colours-fieldset {
  flex: 1;
}

#colour-sections {
  display: flex;
  gap: 1rem;
}
</style>
