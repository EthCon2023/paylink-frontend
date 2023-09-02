import { Button, Layout, Space, theme } from "antd";
import Image from "next/image";

const { Header, Content, Footer } = Layout;

const LayoutProvider = ({ children }: any) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout" style={{ backgroundColor: "#f0f8ff" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "transparent",
          justifyContent: "space-between",
        }}
      >
        <Image src="/images/paylink.svg" width="50" height="50" alt={""} />
        <Space>
          <Button type="primary" size="large">
            Connect Wallet
          </Button>
          <Button size="large"> Google Login</Button>
        </Space>
      </Header>
      <Content style={{ padding: "50px" }}>
        <div className="site-layout-content" style={{ height: "100vh" }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Pay Link ©2023 Created by POM Team
      </Footer>
    </Layout>
  );
};

export default LayoutProvider;
