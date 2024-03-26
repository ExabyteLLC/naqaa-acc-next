import { Divider, Form } from "antd";
import FormTable from "../../../../assets/modals/formTable";
import useTranslation from "../../../../models/translation";
import MyGrid from "../../../../assets/modals/grid";
import useDataPageModel from "../../../../models/dataPageModel";

export default function Services() {
  const { t } = useTranslation();
  const form = Form.useFormInstance();
  const { deps, formData, formInitData } = useDataPageModel();

  return (
    <MyGrid defaultSpan={24}>
      <Divider orientation="left" orientationMargin={10}>
        {t("services")}
      </Divider>
      <FormTable
        name={"services"}
        onChange={(data) => {
          console.log(data);
        }}
        columns={[
          {
            key: "service_group_id",
            title: "group",
            options: deps.service_groups.filter(
              (o) => o.organization_id === formData.ins
            ),
            onChange: ({ index, option }) => {
              form.setFieldValue([index, "group_name"], option?.name_alt);
            },
            required: false,
            width: 200,
          },
          {
            title: "service",
            key:'service_id',
            options: deps.clinic_services,
            onChange: ({ index, option }) => {
              form.setFieldValue(`service_name[${index}]`, option?.name_alt);
            },
            onCellInput: ({ record }) => {
              if (record?.group_id) {
                return {
                  options: deps.clinic_services.filter((o) =>
                    deps.servicesInGroups?.[record?.group_id]?.includes(o.id)
                  ),
                };
              }
            },
            required: true,
            width: 200,
          },
          {
            title: "group",
            key: "group_name",
            required: false,
          },
          {
            title: "service",
            required: true,
          },
          {
            title: "amount",
            type: "int",
            required: true,
          },
        ]}
        initData={formInitData.invoice_services ?? []}
      />
    </MyGrid>
  );
}
