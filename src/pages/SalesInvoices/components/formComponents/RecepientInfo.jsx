import { Divider, Form } from "antd";
import useTranslation from "../../../../models/translation";
import MyGrid from "../../../../assets/modals/grid";
import useDataPageModel from "../../../../models/dataPageModel";
import {
  FormItemSelect,
  FormItemInput,
} from "../../../../assets/modals/formItem";

export default function RecepientInfo() {
  const { t } = useTranslation();
  const { deps, editFormData } = useDataPageModel();
  const form = Form.useFormInstance();

  return (
    <MyGrid defaultSpan={12}>
      <Divider orientation="left" orientationMargin={10} fullspan="true">
        {t("recepient-info")}
      </Divider>

      <FormItemSelect
        name="reference_insurance_id"
        label={t("insurance")}
        placeholder={t("choose") + " " + t("insurance")}
        required
        options={deps.insurances}
        optionsTitleRender={(o) => `${o.account_id} - ${o.name}`}
        onChange={(val, item) => {
          form.setFieldValue("insurance_code", item?.account_id);
          form.setFieldValue("insurance_name", item?.name_alt);
          editFormData("ins", val);
        }}
      />

      <FormItemInput
        label={t("insurance-code")}
        required
        name="insurance_code"
        placeholder={t("enter") + " " + t("insurance-code")}
      />

      <FormItemInput
        label={t("insurance-name")}
        name="insurance_name"
        required
        placeholder={t("enter") + " " + t("insurance-name")}
      />

      <FormItemSelect
        label={t("client")}
        name="reference_client_id"
        required
        placeholder={t("choose") + " " + t("insurance")}
        options={deps.clients}
        optionsTitleRender={(o) => `${o.id_num} - ${o.name}`}
        onChange={(val, item) => {
          form.setFieldValue("client_name", item?.name);
          form.setFieldValue("client_id", item?.id);
        }}
      />

      <FormItemInput
        label={t("client-name")}
        name="client_name"
        required
        placeholder={t("enter") + " " + t("client-name")}
      />

      <FormItemInput
        label={t("client-id")}
        name="client_id"
        required
        placeholder={t("enter") + " " + t("client-id")}
        type="number"
      />
    </MyGrid>
  );
}
