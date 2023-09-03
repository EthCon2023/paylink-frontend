import LayoutProvider from "@/components/layout/layoutProvider";
import { SdkLayout } from "@/components/MetaMaskProvider/index";
import { MetaMaskProvider } from "@/hooks/useMetaMask";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import type { AppProps } from "next/app";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

// import { Web3AuthProvider } from "../components/SocialLoginProvider/index";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Web3AuthProvider = dynamic(
  () => import("../components/SocialLoginProvider/index") as any,
  { ssr: false }
);

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, goerli],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});
// const options = {
//   dappMetadata: { name: "Pay Link", url: "https://mydapp.com" },
// };

// const MMSDK = new MetaMaskSDK(options as any);

// const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum
// ethereum.request({ method: "eth_requestAccounts", params: [] });

export default function App({ Component, pageProps }: AppProps) {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    mount && (
      // <Web3AuthProvider>
      //   <SmartAccountProvider>
      <WagmiConfig config={config}>
        <MetaMaskProvider>
          <SdkLayout>
            <ConfigProvider
              theme={{
                token: {
                  // Seed Token
                  // colorPrimary: "#00b96b",
                  borderRadius: 16,

                  // Alias Token
                  // colorBgContainer: "#f6ffed",
                },
              }}
            >
              <LayoutProvider>
                <Component {...pageProps} />
              </LayoutProvider>
            </ConfigProvider>
          </SdkLayout>
        </MetaMaskProvider>
      </WagmiConfig>
      //   </SmartAccountProvider>
      // </Web3AuthProvider>
    )
  );
}
