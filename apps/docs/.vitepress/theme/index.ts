// sort-imports-ignore
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

import "dot-connect/font.css";
import "./style.css";

export default {
  extends: DefaultTheme,
} satisfies Theme;
