import { Form, Input, Select } from "antd";
import useTranslation from "../../models/translation";
import AppFormModal from "../modals/formModal";
import { useState } from "react";
import { serialize } from "object-to-formdata";
import myFetch from "../../models/fetch";

const PaymentTypeModal = ({ fetchFn }) => {
  const { t } = useTranslation();
  const [dataStatus, setDataStatus] = useState(null);
  const [open, setOpen] = useState(false);

  const sendData = async (values) => {
    var fd = serialize(values);
    setDataStatus("loading");
    myFetch("/admin/accounting/payments/types/add", {
      body: fd,
      onLoad: (res, data) => {
        if (!res.ok) {
          setDataStatus("error");
          return;
        }
        if (data.status != 200) {
          setDataStatus("error");
          return;
        }
        setDataStatus("fetched");
        fetchFn();
        setOpen(false);
      },
    });
  };

  const onFinish = (values) => {
    sendData(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <AppFormModal
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      title={t("add-payment-type")}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      loading={dataStatus === "loading"}
    >
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
        <Input />
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
    </AppFormModal>
  );
};

export default PaymentTypeModal;
