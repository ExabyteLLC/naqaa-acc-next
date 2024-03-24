import { Divider, Form, Input, Select } from "antd";
import useTranslation from "../../../../models/translation";
import MyGrid from "../../../../assets/modals/grid";
import SelectOptionGenerator from "../../../../models/selectOptionGenerator";
import useDataPageModel from "../../../../models/dataPageModel";

export default function RecepientInfo() {
  const { t } = useTranslation();
  const { deps } = useDataPageModel();
  console.log(deps);
  return (
    <MyGrid defaultSpan={12}>
      <Divider orientation="left" orientationMargin={10} fullspan="true">
        {t("recepient-info")}
      </Divider>

      <Form.Item label={t("insurance")} required>
        <Select placeholder={t("choose")}></Select>
      </Form.Item>

      <Form.Item label={t("insurance-code")} required>
        <Input placeholder={t("enter") + " " + t("insurance-code")} />
      </Form.Item>
      
      <Form.Item label={t("insurance-name")} required>
        <Input placeholder={t("enter") + " " + t("insurance-name")} />
      </Form.Item>
      
      <Form.Item label={t("client")} required>
        <Select placeholder={t("choose")}></Select>
      </Form.Item>

      <Form.Item label={t("client-name")} required>
        <Input placeholder={t("enter") + " " + t("client-name")} />
      </Form.Item>
      
      <Form.Item label={t("client-id")} required>
        <Input placeholder={t("enter") + " " + t("client-id")} type="number" />
      </Form.Item>

    </MyGrid>
  );
}
