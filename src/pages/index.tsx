import { Inter } from "next/font/google";
import {
  Button,
  Card,
  Col,
  Divider,
  Image,
  InputNumber,
  Modal,
  QRCode,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
  Typography,
  notification,
} from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const { Title, Text } = Typography;

export default function Home() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLinkType, setShowLinkType] = useState("qr");
  const [api, contextHolder] = notification.useNotification();
  const [sendLink, setSendLink] = useState(
    "https://localhost:3000" + router.pathname + "receive/" + 1
  );

  const showModal = () => {
    // const { hash } = await writeContract();

    setSendLink("https://localhost:3000" + router.pathname + "receive/" + 1);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChangeShowLinkType = ({ target: { value } }: RadioChangeEvent) => {
    setShowLinkType(value);
  };

  const downloadQRCode = () => {};

  const clickToCopyLink = () => {
    api.success({
      message: `Copied to clipboard!`,
      description: sendLink,
      placement: "topRight",
    });
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
        {contextHolder}
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer
        >
          <Title level={2}> Here is your PayLink!</Title>
          <Text>Share the link below to your recipient</Text>
          <br />
          <br />
          <Card>
            <Space
              direction="vertical"
              size={"large"}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Space>
                <Title level={4}> Send via : </Title>
                <Radio.Group
                  defaultValue="qr"
                  size="large"
                  buttonStyle="solid"
                  onChange={onChangeShowLinkType}
                >
                  <Radio.Button value="qr">QR Code</Radio.Button>
                  <Radio.Button value="link">Link</Radio.Button>
                  {/* <Radio.Button value="c">Beijing</Radio.Button> */}
                </Radio.Group>
              </Space>
              {showLinkType === "qr" ? (
                <div
                  id="myqrcode"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <QRCode
                    value={sendLink}
                    bgColor="#fff"
                    style={{ marginBottom: 16 }}
                    size={256}
                  />
                  <Button type="primary" onClick={downloadQRCode}>
                    Download
                  </Button>
                </div>
              ) : (
                <CopyToClipboard text={sendLink}>
                  <Button
                    type="primary"
                    size="large"
                    onClick={clickToCopyLink}
                    style={{ margin: "60px 0px" }}
                  >
                    <PaperClipOutlined /> Click to Copy Link
                  </Button>
                </CopyToClipboard>
              )}
            </Space>
          </Card>
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
          <Title>Pay Link that are money</Title>
          <Text type="secondary">
            Send crypto to anyone, even if they don&rsquo;t have a wallet.
          </Text>
          <Card style={{ width: "500px" }}>
            <Space
              direction="vertical"
              style={{ display: "flex", width: "100%" }}
            >
              <Title level={4} style={{ textAlign: "center" }}>
                Create your Pay Link
              </Title>

              <Title level={5}>Choose a chain</Title>
              <Select
                defaultValue="ETHEREUM"
                size="large"
                style={{ width: "100%" }}
                onChange={handleChangeChains}
                suffixIcon={
                  <Image
                    src={`/images/eth.png`}
                    width={20}
                    height={20}
                    alt={""}
                    style={{ borderRadius: "50%" }}
                  />
                }
                options={[
                  { value: "LINEA", label: "LINEA" },
                  { value: "TAIKO", label: "TAIKO" },
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
                PayLink&rsquo;s available ETH: 0.01 ETH ($0.01)
              </Text>

              <InputNumber<string>
                style={{ width: "100%" }}
                addonAfter={"ETH"}
                size="large"
                defaultValue="0.01"
                min="0"
                max="10"
                step="0.01"
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
                Create a PayLink
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
