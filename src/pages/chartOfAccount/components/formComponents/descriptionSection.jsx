import TextArea from "antd/es/input/TextArea";
import MyGrid from "../../../../assets/modals/grid";
import { Divider, Form, Input } from "antd";

export default function DescriptionSection({t}) {
  return (
    <MyGrid spacingY={0}>
      <Divider
        style={{ marginTop: 0}}
        orientation="left"
        orientationMargin={10}
        fullspan = "true"
      >
        {t("description")}
      </Divider>

      <Form.Item
        label={t("name") + " " + t("en")}
        name="name"
        rules={[
          {
            required: true,
            message: "Please enter the Name!",
          },
        ]}
      >
        <Input placeholder={t("name-hint") + " " + t("en")} />
      </Form.Item>

      <Form.Item
        label={t("name") + " " + t("ar")}
        name="name_alt"
        rules={[
          {
            required: true,
            message: "Please enter the Alt Name!",
          },
        ]}
      >
        <Input placeholder={t("name-hint") + " " + t("ar")} />
      </Form.Item>

      <Form.Item
        label={t("description") + " " + t("en")}
        name="description"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <TextArea
          placeholder={t("enter") + " " + t("description") + " " + t("en")}
        />
      </Form.Item>
      <Form.Item
        label={t("description") + " " + t("ar")}
        name="description"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <TextArea
          placeholder={t("enter") + " " + t("description") + " " + t("ar")}
        />
      </Form.Item>
    </MyGrid>
  );
}
