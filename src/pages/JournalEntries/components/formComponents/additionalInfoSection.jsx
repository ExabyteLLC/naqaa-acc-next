import { Divider, Form, Select } from "antd";
import MyGrid from "../../../../assets/modals/grid";
import SelectOptionGenerator from "./selectOptionGenerator";
import useTranslation from "../../../../models/translation";

export default function AdditionalInfoSection() {
  const { t } = useTranslation();
  return (
    <MyGrid>
      <Divider orientation="left" orientationMargin={10} fullspan="true">
        {t("account-reports")}
      </Divider>

      <Form.Item
        label={t("cost-center")}
        name="reference_branch_id"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Select placeholder={t("choose")}></Select>
      </Form.Item>
      <Form.Item
        label={t("status")}
        name="active"
        rules={[
          {
            required: true,
            message: "Please input account state!",
          },
        ]}
      >
        <Select placeholder={t("choose")}>
          {SelectOptionGenerator([
            { title: "active", key: 1 },
            { title: "in-active", key: 0 },
          ])}
        </Select>
      </Form.Item>
    </MyGrid>
  );
}