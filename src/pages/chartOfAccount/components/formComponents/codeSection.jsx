import { Form, Input, TreeSelect } from "antd";
import MyGrid from "../../../../assets/modals/grid";
import useDataPageModel from "../../../../models/dataPageModel";
import useTranslation from "../../../../models/translation";

export default function CodeSection() {
  const { t } = useTranslation();
  const { treeOptions, formType } = useDataPageModel();
  return (
    <MyGrid>
      <Form.Item
        label={t("code")}
        name="id"
        rules={[
          {
            required: true,
            message: "Please enter the code!",
          },
        ]}
      >
        <Input
          type="number"
          placeholder={t("code")}
          disabled={formType === "edit"}
        />
      </Form.Item>

      <Form.Item
        label={t("parent")}
        name="parent_id"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <TreeSelect
          showSearch
          placeholder={t("choose")}
          treeDefaultExpandAll
          treeData={treeOptions}
          disabled={formType === "edit"}
          popupMatchSelectWidth={false}
        />
      </Form.Item>
    </MyGrid>
  );
}
