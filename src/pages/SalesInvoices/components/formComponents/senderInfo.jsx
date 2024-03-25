import { Divider, Form, Input, Select } from "antd";
import useTranslation from "../../../../models/translation";
import MyGrid from "../../../../assets/modals/grid";
import SelectOptionGenerator from "../../../../models/selectOptionGenerator";
import useDataPageModel from "../../../../models/dataPageModel";

export default function SenderInfo() {
  const { t } = useTranslation();
  const { deps } = useDataPageModel();
  return (
    <MyGrid defaultSpan={12}>
      <Divider orientation="left" orientationMargin={10} fullspan="true">
        {t("sender-info")}
      </Divider>
      <Form.Item label={t("branches")} required name='branch_id'>
        <Select placeholder={t("choose")}>
          {SelectOptionGenerator(
            deps?.branchesOptions?.map((curr) => {
              return { title: curr.label, key: curr.value };
            }),
            false
          )}
        </Select>
      </Form.Item>
      <Form.Item label={t("branch-name")} name='branch_name'>
        <Input placeholder={t("enter") + " " + t("branch-name")} />
      </Form.Item>
      <Form.Item label={t("payment-type")} name='payment_type'>
        <Input placeholder={t("enter") + " " + t("payment-type")} />
      </Form.Item>
      <Form.Item label={t("service-date")} required  name='service_date'>
        <Input type="date" />
      </Form.Item>
      <Form.Item label={t("transfer-letter-no")} name='transfer_letter_id'>
        <Input placeholder={t("enter") + " " + t("transfer-letter-no")} />
      </Form.Item>
      <Form.Item label={t("transfer-letter-date")} name='transfer_letter_date'>
        <Input type="date" />
      </Form.Item>
    </MyGrid>
  );
}
