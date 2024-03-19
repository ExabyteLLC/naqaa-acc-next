import { Divider, Form, Select } from "antd";
import MyGrid from "../../../../assets/modals/grid";
import SelectOptionGenerator from "./selectOptionGenerator";

export default function AccountReportsSection({ t }) {
  return (
    <MyGrid>
      <Divider orientation="left" orientationMargin={10} fullspan="true">
        {t("account-reports")}
      </Divider>

      <Form.Item
        label={t("balance-sheet")}
        name="report_balance_sheet"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Select placeholder={t("choose")}>
          {SelectOptionGenerator([{ title: "balance-sheet", key: 1 }])}
        </Select>
      </Form.Item>
      <Form.Item
        label={t("report-income-statement")}
        name="report_income_statement"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Select placeholder={t("choose")}>
          {SelectOptionGenerator(["revenue", "expenses"])}
        </Select>
      </Form.Item>
      <Form.Item
        label={t("report-cash-flow")}
        name="report_cash_flow"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Select placeholder={t("choose")}>
          {SelectOptionGenerator([1, 2, 3])}
        </Select>
      </Form.Item>
    </MyGrid>
  );
}
