import type { InjectedWalletInfo, WalletConfig } from "./types.js";
import type { Wallet } from "@reactive-dot/core/wallets.js";
import { html } from "lit";

export const talisman: WalletConfig<InjectedWalletInfo> = {
  selector: (wallet: Wallet) => wallet.id === "injected/talisman",
  name: "Talisman",
  platforms: ["chrome", "firefox"],
  logo: html`
    <svg fill="none" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path
        clip-rule="evenodd"
        d="m50.1161 35.6631c.6081 1.3243 2.3987 1.792 3.4291.7616l1.8897-1.8897c1.9526-1.9526 5.1184-1.9526 7.0711 0 1.9526 1.9526 1.9526 5.1185 0 7.0711l-15.2721 15.272c-3.6687 4.355-9.1626 7.1219-15.3027 7.1219-6.4029 0-12.1031-3.0089-15.7637-7.6899l-14.7031-14.7031c-1.952627-1.9526-1.952627-5.1184 0-7.071 1.95262-1.9526 5.11844-1.9526 7.07106 0l1.86104 1.861c1.0079 1.0079 2.7576.5545 3.353-.7406.1176-.2559.1815-.5305.1815-.8121v-22.8444c0-2.76139 2.2386-4.99996 5-4.99996s5 2.23857 5 4.99996v11.5565c0 .9944 1.0187 1.6694 1.9668 1.3697.6001-.1896 1.0337-.736 1.0337-1.3653v-18.56079c0-2.76142 2.2385-4.99998943 5-4.99999015 2.7614-.00000073 5 2.23857015 5 4.99999015v18.56119c0 .6292.4334 1.1754 1.0333 1.365.9479.2996 1.9663-.3752 1.9663-1.3693v-11.557c0-2.76139 2.2385-4.99996 5-4.99996 2.7614 0 4.9999 2.23857 4.9999 4.99996l.0001 22.8351c0 .2872.0652.5671.185.8281z"
        fill="#fd4848"
        fill-rule="evenodd"
      />
      <path
        d="m47.9319 45.9999s-7.1635 10-16 10c-8.8366 0-16-10-16-10s7.1634-10 16-10c8.8365 0 16 10 16 10z"
        fill="#d5ff5c"
      />
      <g stroke="#fd4848">
        <path
          d="m39.4315 46.0001c0 4.1419-3.3577 7.4996-7.4996 7.4996s-7.4996-3.3577-7.4996-7.4996 3.3577-7.4996 7.4996-7.4996 7.4996 3.3577 7.4996 7.4996z"
          stroke-width="1.00078"
        />
        <path
          d="m36.4312 46.0004c0 2.485-2.0145 4.4996-4.4996 4.4996-2.485 0-4.4996-2.0146-4.4996-4.4996 0-2.4851 2.0146-4.4997 4.4996-4.4997 2.4851 0 4.4996 2.0146 4.4996 4.4997z"
          stroke-width="1.00078"
        />
        <path
          d="m42.4312 46.0001c0 5.7987-4.7008 10.4996-10.4996 10.4996-5.7987 0-10.4996-4.7008-10.4996-10.4996s4.7009-10.4996 10.4996-10.4996c5.7988 0 10.4996 4.7008 10.4996 10.4996z"
          stroke-width="1.00078"
        />
        <path
          d="m45.4312 46c0 7.4557-6.0439 13.4996-13.4996 13.4996-7.4556 0-13.4996-6.0439-13.4996-13.4996 0-7.4556 6.044-13.4996 13.4996-13.4996 7.4557 0 13.4996 6.044 13.4996 13.4996z"
          stroke-width="1.00078"
        />
        <path
          d="m33.4315 45.9999c0 .8282-.6714 1.4996-1.4996 1.4996s-1.4996-.6714-1.4996-1.4996.6714-1.4996 1.4996-1.4996 1.4996.6714 1.4996 1.4996z"
          fill="#162beb"
          stroke-width="1.00078"
        />
      </g>
      <ellipse cx="31.9319" cy="45.9999" fill="#fd4848" rx="2" ry="2" />
      <path
        d="m16.6516 46.122c-.0342-.0439-.0657-.0846-.0944-.1221.0287-.0374.0602-.0781.0944-.122.2086-.2676.5176-.6517.9164-1.1134.798-.9241 1.9524-2.1556 3.3772-3.3858 2.8651-2.4738 6.7496-4.8784 10.9867-4.8784 4.237 0 8.1216 2.4046 10.9867 4.8784 1.4247 1.2302 2.5791 2.4617 3.3772 3.3858.3987.4617.7078.8458.9163 1.1134.0343.0438.0658.0846.0945.122-.0287.0375-.0602.0782-.0945.1221-.2085.2676-.5176.6517-.9163 1.1134-.7981.9241-1.9525 2.1556-3.3772 3.3858-2.8651 2.4738-6.7497 4.8783-10.9867 4.8783-4.2371 0-8.1216-2.4045-10.9867-4.8783-1.4248-1.2302-2.5792-2.4617-3.3772-3.3858-.3988-.4617-.7078-.8458-.9164-1.1134z"
        stroke="#d5ff5c"
        stroke-width="1.00078"
      />
    </svg>
  `,
  downloadUrl: "https://talisman.xyz/download",
};
