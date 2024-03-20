import { Form, Input, TreeSelect } from "antd";
import MyGrid from "../../../../assets/modals/grid";
import useCoaModel from "../../model";

export default function CodeSection({ t }) {
  const { optionsTree } = useCoaModel();
  console.log(optionsTree);
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
        <Input type="number" placeholder={t("code")} />
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
          treeData={optionsTree}
        />
      </Form.Item>
    </MyGrid>
  );
}
