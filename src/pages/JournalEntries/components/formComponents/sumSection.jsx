import { Form, Input } from "antd";
import useTranslation from "../../../../models/translation";

export default function SumSection() {
  const { t } = useTranslation();

  return (
    <Form.Item value label={t("sum")} name="sum" required>
      <Input type="number" placeholder={t("sum")} readOnly />
    </Form.Item>
  );
}
