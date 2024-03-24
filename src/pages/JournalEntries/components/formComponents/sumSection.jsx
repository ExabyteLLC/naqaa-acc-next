import { Form, Input } from "antd";
import useTranslation from "../../../../models/translation";

export default function SumSection() {
  const { t } = useTranslation();

  return (
    <Form.Item
      label={t("sum")}
      name="sum"
      rules={[{ pattern: new RegExp(/0/), message: "Sum must be 0!" }]}
      required
    >
      <Input type="number" placeholder={t("sum")} readOnly />
    </Form.Item>
  );
}
