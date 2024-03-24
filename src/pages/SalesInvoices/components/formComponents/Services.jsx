import { Divider } from "antd";
import FormTable from "../../../../assets/modals/formTable";
import useTranslation from "../../../../models/translation";
import MyGrid from "../../../../assets/modals/grid";

export default function Services() {
  const { t } = useTranslation();
  return (
    <MyGrid>
      <Divider orientation="left" orientationMargin={10} fullspan="true">
        {t("services")}
      </Divider>
      <FormTable fullspan="true"></FormTable>
    </MyGrid>
  );
}
