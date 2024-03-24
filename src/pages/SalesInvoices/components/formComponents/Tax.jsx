import { Divider } from "antd";
import FormTable from "../../../../assets/modals/formTable";
import useTranslation from "../../../../models/translation";
import MyGrid from "../../../../assets/modals/grid";

export default function Tax() {
  const { t } = useTranslation();
  return (
    <MyGrid>
      <Divider orientation="left" orientationMargin={10} fullspan="true">
        {t("tax")}
      </Divider>
      <FormTable fullspan="true"></FormTable>
    </MyGrid>
  );
}
