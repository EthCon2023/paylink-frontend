import { Button, Card, Col, Row, Space, Typography, notification } from "antd";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;
const Receive = () => {
  const [mount, setMount] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    setMount(true);
  }, []);

  const claim = () => {
    api.success({
      message: "Success Claim",
      // description: sendLink,
      placement: "topRight",
    });
  };

  return (
    <>
      {mount && (
        <Row>
          <Col span={24}>
            {contextHolder}
            <Title level={1}>Here is 0.01 ETH in Crypto!</Title>
            <Card>
              <Space
                direction="vertical"
                style={{ display: "flex", width: "100%" }}
              >
                <Text type="secondary">You will receive</Text>
                <Space>
                  <Title level={1}>0.01</Title> <Title level={3}>ETH</Title>
                </Space>
                <Button
                  type="primary"
                  size="large"
                  style={{ width: "100%" }}
                  onClick={claim}
                >
                  Claim
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Receive;
