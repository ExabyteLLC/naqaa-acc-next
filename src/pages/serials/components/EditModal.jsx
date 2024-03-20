import { Form, Input } from "antd";
import useTranslation from "../../../models/translation";
import AppFormModal from "../../../assets/modals/formModal";
import useDataPageModel from "../../../models/dataPageModel";

const EditModal = ({ initialValues, buttonIcon, butonType }) => {
  const { t } = useTranslation();
  const { dataStatus, editModal, setEditModal, updDataApi } =
    useDataPageModel();

  return (
    <AppFormModal
      open={editModal}
      onOpen={() => setEditModal(true)}
      onClose={() => setEditModal(false)}
      title={t("edit")}
      onFinish={(values) => updDataApi(values, initialValues.id)}
      onFinishFailed={(errorInfo) => console.log("Failed:", errorInfo)}
      initialValues={initialValues}
      loading={dataStatus === "loading"}
      buttonIcon={buttonIcon}
      btnType={butonType}
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

export default EditModal;
