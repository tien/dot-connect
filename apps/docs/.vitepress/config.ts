import { defineConfig } from "vitepress";

export default defineConfig({
  title: "DOTConnect",
  description: "Wallets connector for Substrate DApps",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { property: "og:image", content: "/social-card.png" }],
    ["meta", { property: "twitter:image", content: "/social-card.png" }],
  ],
  themeConfig: {
    logo: { src: "/purse.png", alt: "DOTConnect" },
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
