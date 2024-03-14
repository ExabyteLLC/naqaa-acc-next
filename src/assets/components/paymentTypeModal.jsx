import { Form, Input } from "antd";
import useTranslation from "../../models/translation";
import AppFormModal from "../modals/formModal";

const PaymentTypeModal = ({ fetchFn }) => {
  const { t } = useTranslation();
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <AppFormModal
      fetchFn={fetchFn}
      title={t("add-payment-type")}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
    </AppFormModal>
  );
};

export default PaymentTypeModal;
