import { Button, Form, Modal } from "antd";
import useTranslation from "../../models/translation";

const AppFormModal = ({
  open,
  onOpen,
  onClose,
  title,
  onFinish,
  onFinishFailed,
  children,
  loading,
  btnType = "primary",
  initialValues = {},
  buttonIcon = null,
  submitBtnTxt,
  width = "80%"
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <>
      <Button type={btnType} onClick={onOpen}>
        {buttonIcon ?? title}
      </Button>
      <Modal
        title={title}
        open={open}
        onCancel={onClose}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => {
              form
                .validateFields()
                .then(() => {
                  form.submit();
                })
                .catch((info) => {
                  console.log("Validate Failed:", info);
                });
            }}
          >
            {submitBtnTxt}
          </Button>,
          <Button key="back" onClick={onClose} disabled={loading}>
            {t("cancel")}
          </Button>,
        ]}
        width={width}
      >
        <Form
          initialValues={initialValues}
          form={form}
          onFinish={(values) => {
            onFinish(values);
            form.resetFields();
          }}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          {children}
        </Form>
      </Modal>
    </>
  );
};
export default AppFormModal;
