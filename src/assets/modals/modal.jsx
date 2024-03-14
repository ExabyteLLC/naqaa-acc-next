import { useState } from "react";
import { Button, Modal } from "antd";
import useTranslation from "../../models/translation";
const AppModal = ({ title, fetchFn, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    fetchFn ? fetchFn() : null;
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
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" htmlType="submit" form="" type="primary" onClick={handleOk}>
            {t("add")}
          </Button>,
          <Button key="back" onClick={handleCancel}>
            {t("cancel")}
          </Button>,
        ]}
      >
        {children}
      </Modal>
    </>
  );
};
export default AppModal;
