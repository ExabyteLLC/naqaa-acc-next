import { Divider, Form, Input } from "antd";
import useTranslation from "../../../../models/translation";
import MyGrid from "../../../../assets/modals/grid";

export default function Dues() {
  const { t } = useTranslation();
  return (
    <MyGrid>
      <Divider orientation="left" orientationMargin={10} fullspan="true">
        {t("dues")}
      </Divider>
      <Form.Item label={t("sub-amount")} required>
        <Input readOnly />
      </Form.Item>
      <Form.Item label={t("total-amount")} required>
        <Input readOnly />
      </Form.Item>
    </MyGrid>
  );
}
