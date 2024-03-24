import { Form, Input } from "antd";
import useTranslation from "../../../models/translation";
import AppFormModal from "../../../assets/modals/formModal";
import useDataPageModel from "../../../models/dataPageModel";

const PageForm = () => {
  const { t } = useTranslation();
  const { dataStatus, currForm, formKey, closeForm, formInitData, editDataApi } =
    useDataPageModel();

  return (
    <AppFormModal
      key={formKey}
      open={currForm("main")}
      onClose={closeForm}
      initialValues={formInitData}
      loading={dataStatus === "loading"}
      onFinish={(values) => editDataApi(values, formInitData.id)}
      onFinishFailed={(errorInfo) => console.log("Failed:", errorInfo)}
      title={t("edit")}
      submitBtnTxt={t("update")}
    >
      <Form.Item
        label={t("before")}
        name="before"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={t("after")}
        name="after"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t("digits")}
        name="digits"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label={t("initial")}
        name="initial"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
    </AppFormModal>
  );
};

export default PageForm;
