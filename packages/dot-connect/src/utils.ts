import type { InjectedWalletInfo, Platform } from "./wallets/types.js";

export const identifyBrowser = (): Platform | undefined => {
  const userAgent = globalThis.navigator.userAgent;

  const isFirefox = /Firefox/i.test(userAgent);
  const isChrome =
    /Chrome|Chromium/i.test(userAgent) && !/Edg/i.test(userAgent);
  const isAndroid = /Android/i.test(userAgent);
  const isIOS =
    /iPad|iPhone|iPod/i.test(userAgent) ||
    (navigator.userAgent.includes("Mac") && "ontouchend" in document);

  if (isAndroid) {
    return "android" as const;
  } else if (isIOS) {
    return "ios" as const;
  } else if (isFirefox) {
    return "firefox" as const;
  } else if (isChrome) {
    return "chrome" as const;
  } else {
    return undefined;
  }
};

export const getDownloadUrl = (walletInfo: InjectedWalletInfo) => {
  const platform = identifyBrowser();

  if (platform === undefined) {
    return undefined;
  }

  if (!walletInfo.platforms.includes(platform)) {
    return undefined;
  }

  if (typeof walletInfo.downloadUrl === "string") {
    return { platform: undefined, url: walletInfo.downloadUrl };
  }

  const urls = walletInfo.downloadUrl;

  const exactUrl: string | undefined =
    platform in urls
      ? // @ts-expect-error TODO
        urls[platform]
      : undefined;

  const url = exactUrl ?? ("default" in urls ? urls.default : undefined);

  if (url === undefined) {
    return undefined;
  }

  return { platform, url };
};
