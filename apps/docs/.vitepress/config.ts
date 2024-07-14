import { defineConfig } from "vitepress";

export default defineConfig({
  title: "DOT Connect",
  description: "Wallets connector for Substrate DApps",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    logo: { src: "/purse.png", alt: "DOT Connect" },
    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", link: "/getting-started" },
    ],
    sidebar: [
      { text: "Getting started", link: "/getting-started" },
      { text: "Theming", link: "/theming" },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/tien/dot-connect" },
    ],
  },
});
