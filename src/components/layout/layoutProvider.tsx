import { Button, Layout, Space, theme } from "antd";

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
          justifyContent: "flex-end",
        }}
      >
        <Space>
          <Button type="primary" size="large">
            Connect Wallet
          </Button>
          <Button size="large"> Google Login</Button>
        </Space>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content" style={{ height: "100vh" }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default LayoutProvider;
