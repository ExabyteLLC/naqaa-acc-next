import { Form, Input, Select } from "antd";
import MyGrid from "../../../../assets/modals/grid";
import useDataPageModel from "../../../../models/dataPageModel";
import useTranslation from "../../../../models/translation";
import SelectOptionGenerator from "../../../../models/selectOptionGenerator";

export default function TitleSection() {
  const { t } = useTranslation();
  const { deps } = useDataPageModel();

  console.log(deps.currencies);

  return (
    <MyGrid>
      <Form.Item
        label={t("title")}
        name="id"
        rules={[
          {
            required: true,
            message: "Please enter the title!",
          },
        ]}
      >
        <Input placeholder={t("title")} />
      </Form.Item>

      <Form.Item
        label={t("currency")}
        name="currency"
        rules={[
          {
            required: true,
            message: "Please choose the currency!",
          },
        ]}
        initialValue="EGP"
      >
        <Select placeholder={t("choose")}>
          {SelectOptionGenerator(
            deps.currencies.map((curr) => {
              return { title: curr.symbol, key: curr.id };
            }),
            false
          )}
        </Select>
      </Form.Item>
    </MyGrid>
  );
}
