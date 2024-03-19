import { Divider, Form, Select } from "antd";
import MyGrid from "../../../../assets/modals/grid";

export default function AccountReportsSection({ t }) {
  return (
    <MyGrid>
      <Divider orientation="left" orientationMargin={10} fullspan="true">
        {t("account-reports")}
      </Divider>

      <Form.Item
        label={t("balance-sheet")}
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
        label={t("report-income-statement")}
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
        label={t("report-cash-flow")}
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
    </MyGrid>
  );
}
