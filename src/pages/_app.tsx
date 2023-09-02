import LayoutProvider from "@/components/layout/layoutProvider";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import type { AppProps } from "next/app";

// const options = {
//   dappMetadata: { name: "Pay Link", url: "https://mydapp.com" },
// };

// const MMSDK = new MetaMaskSDK(options as any);

// const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum
// ethereum.request({ method: "eth_requestAccounts", params: [] });

export default function App({ Component, pageProps }: AppProps) {
  return (
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
  );
}
