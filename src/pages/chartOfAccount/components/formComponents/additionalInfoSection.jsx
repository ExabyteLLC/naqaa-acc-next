import { Divider, Form, Select } from "antd";
import MyGrid from "../../../../assets/modals/grid";

export default function AdditionalInfoSection({ t }) {
  return (
    <MyGrid>
      <Divider orientation="left" orientationMargin={10} fullspan="true">
        {t("account-reports")}
      </Divider>

      <Form.Item
        label={t("cost-center")}
        name="nature"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Select placeholder={t("choose")}>
          <Select.Option>text</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label={t("status")}
        name="nature"
        rules={[
          {
            required: true,
            message: "Please input account state!",
          },
        ]}
      >
        <Select placeholder={t("choose")}>
          <Select.Option>text</Select.Option>
        </Select>
      </Form.Item>
    </MyGrid>
  );
}
