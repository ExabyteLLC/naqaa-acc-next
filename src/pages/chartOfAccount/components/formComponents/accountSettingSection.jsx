import { Divider, Form, Select } from "antd";
import MyGrid from "../../../../assets/modals/grid";

export default function AccountSettingSection({t}) {
  return (
    <MyGrid>
        <Divider
        orientation="left"
        orientationMargin={10}
        fullspan = "true"
      >
          {t("account-setting")}
        </Divider>

        <Form.Item
          label={t("nature")}
          name="nature"
          rules={[
            {
              required: true,
              message: "Please enter account nature!",
            },
          ]}
        >
          <Select placeholder={t("choose")}>
            <Select.Option>text</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={t("account-route")}
          name="nature"
          rules={[
            {
              required: true,
              message: "Please enter account entity!",
            },
          ]}
        >
          <Select placeholder={t("choose")}>
            <Select.Option>text</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={t("account-type")}
          name="nature"
          rules={[
            {
              required: true,
              message: "Please enter account type!",
            },
          ]}
        >
          <Select placeholder={t("choose")}>
            <Select.Option>text</Select.Option>
          </Select>
        </Form.Item>
    </MyGrid>
  )
}
