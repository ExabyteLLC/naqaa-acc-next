import { useEffect, useState } from "react";
import { Button, Form, Modal } from "antd";
import useTranslation from "../../models/translation";

const AppFormModal = ({ title, onFinish, onFinishFailed, submitted,children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(()=>{
if(submitted) setIsModalOpen(false);
  },[submitted])

  const showModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { t } = useTranslation();
  return (
    <>
      <Button type="primary" onClick={showModal}>
        {title}
      </Button>
      <Modal
        title={title}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            htmlType="submit"
            form={`form-${title}`}
            type="primary"
          >
            {t("add")}
          </Button>,
          <Button key="back" onClick={handleCancel}>
            {t("cancel")}
          </Button>,
        ]}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          id={`form-${title}`}
        >
          {children}
        </Form>
      </Modal>
    </>
  );
};
export default AppFormModal;
