import { ConnectionButton as ConnectionButtonElement } from "../elements/connection-button.js";
import { ConnectionDialog as ConnectionDialogElement } from "../elements/connection-dialog.js";
import { createComponent } from "@lit/react";
import React from "react";

export const ConnectionButton = createComponent({
  tagName: "dc-connection-button",
  elementClass: ConnectionButtonElement,
  react: React,
});

export const ConnectionDialog = createComponent({
  tagName: "dc-connection-dialog",
  elementClass: ConnectionDialogElement,
  react: React,
  events: {
    onClose: "close",
  },
});
