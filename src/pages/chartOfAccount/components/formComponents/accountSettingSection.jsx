import { Divider, Form, Select } from "antd";
import MyGrid from "../../../../assets/modals/grid";
import SelectOptionGenerator from "../../../../models/selectOptionGenerator";
import useTranslation from "../../../../models/translation";

export default function AccountSettingSection() {
  const { t } = useTranslation();
  return (
    <MyGrid>
      <Divider orientation="left" orientationMargin={10} fullspan="true">
        {t("account-setting")}
      </Divider>

      <Form.Item
        label={t("nature")}
        name="nature"
        rules={[
          {
            required: true,
            message: "Please enter account nature!",
          },
        ]}
      >
        <Select placeholder={t("choose")}>
          {SelectOptionGenerator([
            { title: "credit-key", key: "creditor" },
            { title: "debit-key", key: "debitor" },
          ])}
        </Select>
      </Form.Item>
      <Form.Item
        label={t("account-route")}
        name="route"
        rules={[
          {
            required: true,
            message: "Please enter account entity!",
          },
        ]}
      >
        <Select placeholder={t("choose")}>
          {SelectOptionGenerator([
            "assets",
            "liabilities",
            "equity",
            "revenue",
            "expenses",
          ])}
        </Select>
      </Form.Item>
      <Form.Item
        label={t("account-type")}
        name="master"
        rules={[
          {
            required: true,
            message: "Please enter account type!",
          },
        ]}
      >
        <Select placeholder={t("choose")}>
          {SelectOptionGenerator([
            { title: "master-1", key: 1 },
            { title: "master-0", key: 0 },
          ])}
        </Select>
      </Form.Item>
    </MyGrid>
  );
}
