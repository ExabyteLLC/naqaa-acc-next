import { Form, Input } from "antd";
import useTranslation from "../../../../models/translation";

export default function SumSection() {
  const { t } = useTranslation();
  return (
    <Form.Item label={t("sum")} name="sum" required>
      <Input type="number" placeholder={t("code")} readOnly />
    </Form.Item>
  );
}
