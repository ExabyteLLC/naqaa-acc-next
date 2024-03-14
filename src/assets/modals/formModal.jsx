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
  loading
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Button type="primary" onClick={onOpen}>
        {title}
      </Button>
      <Modal
        title={title}
        open={open}
        onCancel={onClose}
        footer={[
          <Button
            key="submit"
            htmlType="submit"
            form={`form-${title}`}
            type="primary"
            loading={loading}
          >
            {t("add")}
          </Button>,
          <Button key="back" onClick={onClose} 
          loading={loading}>
            {t("cancel")}
          </Button>,
        ]}
      >
        <Form
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          id={`form-${title}`}
          layout="vertical"
        >
          {children}
        </Form>
      </Modal>
    </>
  );
};
export default AppFormModal;
