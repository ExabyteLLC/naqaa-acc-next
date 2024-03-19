import { Button, Form, Modal, Typography } from "antd";
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
  width = "70%",
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const customizeRequiredMark = (label, { required }) => (
    <p style={{marginTop:0, marginBottom:0}}>
      <Typography.Text>{label}</Typography.Text>{" "}
      {required ? (
        <Typography.Text strong type="danger">
          *
        </Typography.Text>
      ) : (
        <Typography.Text italic type="secondary">
          (optional)
        </Typography.Text>
      )}
    </p>
  );

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
        centered
      >
        <Form
          initialValues={initialValues}
          requiredMark={customizeRequiredMark}
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
