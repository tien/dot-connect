import { PolkadotIdenticon as PolkadotIdenticonElement } from "../polkadot-identicon.js";
import { createComponent } from "@lit/react";
import React from "react";

export const PolkadotIdenticon = createComponent({
  tagName: "polkadot-identicon",
  elementClass: PolkadotIdenticonElement,
  react: React,
});
