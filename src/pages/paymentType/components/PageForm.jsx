import { Form, Input, Select } from "antd";
import useTranslation from "../../../models/translation";
import AppFormModal from "../../../assets/modals/formModal";
import TextArea from "antd/es/input/TextArea";
import MyGrid from "../../../assets/modals/grid";
import useDataPageModel from "../../../models/dataPageModel";

const PageForm = () => {
  const { t } = useTranslation();
  const {
    formKey,
    currForm,
    formType,
    formInitData,
    closeForm,
    dataStatus,
    addDataApi,
    updDataApi,
  } = useDataPageModel();

  const onFinish = (values) => {
    switch (formType) {
      case "add":
        addDataApi(values);
        break;
      case "edit":
        updDataApi(values, formInitData.id);
        break;
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const title = (() => {
    switch (formType) {
      case "add":
        return t("add-payment-type");
      case "edit":
        return t("update");
    }
  })();
  const submitBtnTxt = (() => {
    switch (formType) {
      case "add":
        return t("add");
      case "edit":
        return t("update");
    }
  })();

  return (
    <AppFormModal
      key={formKey}
      open={currForm("main")}
      onClose={closeForm}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={formInitData}
      loading={dataStatus === "loading"}
      submitBtnTxt={submitBtnTxt}
      title={title}
    >
      <MyGrid defaultSpan={24} spacingY={24}>
        <Form.Item
          label={t("name")}
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t("description")}
          name="description"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item
          label={t("status")}
          name="active"
          rules={[
            {
              required: true,
              message: "Please input your status!",
            },
          ]}
        >
          <Select>
            <Select.Option value="1">Active</Select.Option>
            <Select.Option value="0">Inactive</Select.Option>
          </Select>
        </Form.Item>
      </MyGrid>
    </AppFormModal>
  );
};

export default PageForm;