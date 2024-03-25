import { Divider } from "antd";
import FormTable from "../../../../assets/modals/formTable";
import useTranslation from "../../../../models/translation";
import MyGrid from "../../../../assets/modals/grid";
import useDataPageModel from "../../../../models/dataPageModel";

export default function Tax() {
  const { t } = useTranslation();
  const { deps } = useDataPageModel();

  return (
    <MyGrid defaultSpan={24}>
      <Divider orientation="left" orientationMargin={10}>
        {t("tax")}
      </Divider>
      <FormTable
        name={"taxes"}
        addRowAction={false}
        removeRowAction={false}
        columns={[
          {
            key: "id",
            title: "tax",
            required: true,
            width: 250,
            disabled: true,
            options: deps.taxes,
          },
          {
            title: "value",
            type: "int",
            required: true,
          },
          {
            title: "amount",
            type: "int",
            required: true,
          },
        ]}
        initData={deps.taxes}
      />
    </MyGrid>
  );
}
