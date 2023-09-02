import { Inter } from "next/font/google";
import {
  Button,
  Card,
  Col,
  Divider,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const { Title, Text } = Typography;

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeChains = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleChangeTokens = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onChangeAmount = (value: string) => {
    console.log("changed", value);
  };

  return (
    <Row>
      <Col span={24}>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Title level={2}> Here is your PayLink!</Title>
          <Text>Share it with your intended recipient below.</Text>
          <p>Some contents...</p>
        </Modal>
        <Space
          size={"large"}
          direction="vertical"
          style={{
            justifyContent: "center",
            display: "flex",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Title>Links that are money</Title>
          <Text type="secondary">
            Send crypto & NFTs to anyone, even if they don&rsquo;t have a
            wallet. No app needed!
          </Text>
          <Card style={{ width: "500px" }}>
            <Space
              direction="vertical"
              style={{ display: "flex", width: "100%" }}
            >
              <Title level={4} style={{ textAlign: "center" }}>
                Create your TipLink
              </Title>

              <Title level={5}>Choose a chain</Title>
              <Select
                defaultValue="ETHEREUM"
                size="large"
                style={{ width: "100%" }}
                onChange={handleChangeChains}
                // suffixIcon={
                //   <Image
                //     src={`/images/eth.png`}
                //     width="20"
                //     height="20"
                //     alt={""}
                //     style={{ borderRadius: "50%" }}
                //   />
                // }
                options={[
                  { value: "LINEA", label: "LINEA" },
                  { value: "POLYGON", label: "POLYGON" },
                  { value: "ETHEREUM", label: "ETHEREUM" },
                ]}
              />

              <Title level={5}>Choose a token</Title>
              <Select
                defaultValue="WETH"
                size="large"
                style={{ width: "100%" }}
                onChange={handleChangeTokens}
                options={[{ value: "WETH", label: "WETH" }]}
              />
              <Divider />
              <Text
                type="secondary"
                style={{ textAlign: "end", justifyContent: "flex-end" }}
              >
                PayLink&rsquo;s available ETH: 0.001 ETH ($0.01)
              </Text>

              <InputNumber<string>
                style={{ width: "100%" }}
                addonAfter={"ETH"}
                size="large"
                defaultValue="1"
                min="0"
                max="10"
                step="0.00000000000001"
                onChange={() => onChangeAmount}
                stringMode
              />
              <Divider />
              <Button
                type="primary"
                size="large"
                style={{ width: "100%" }}
                onClick={showModal}
              >
                <PaperClipOutlined /> Create a PayLink
              </Button>
              <Text type="secondary">
                Your link will automatically be copied to clipboard.
              </Text>
            </Space>
          </Card>
        </Space>
      </Col>
    </Row>
  );
}
