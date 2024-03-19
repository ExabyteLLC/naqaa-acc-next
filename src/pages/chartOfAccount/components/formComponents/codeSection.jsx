import { Form, Input, Select } from "antd";
import MyGrid from "../../../../assets/modals/grid";

export default function CodeSection({ t }) {
  return (
    <MyGrid>
      <Form.Item
        label={t("code")}
        name="code"
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
        name="parent"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Select placeholder={t("choose")}>
          <Select.Option value="1">Text</Select.Option>
        </Select>
      </Form.Item>
    </MyGrid>
  );
}
