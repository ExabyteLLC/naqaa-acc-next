import { DatePicker, Form, Input, Select } from "antd";
import useTranslation from "../../../models/translation";
import AppFormModal from "../../../assets/modals/formModal";
import { useState } from "react";
import { serialize } from "object-to-formdata";
import myFetch from "../../../models/fetch";
import TextArea from "antd/es/input/TextArea";

const AddModal = ({ fetchFn }) => {
  const { t } = useTranslation();
  const [dataStatus, setDataStatus] = useState(null);
  const [open, setOpen] = useState(false);

  const sendData = async (values) => {
    values["startstamp"] = values["range"][0].toDate();
    values["endstamp"] = values["range"][1].toDate();
    var fd = serialize(values);
    setDataStatus("loading");
    myFetch("/admin/accounting/years/add", {
      body: fd,
      onError: (err) => {
        setDataStatus("error");
      },
      onSuccess: () => {
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
      title={t("add")}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      loading={dataStatus === "loading"}
      submitBtnTxt={t("add")}
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

      <Form.Item label={t("range")} name={"range"} rules={[{ required: true }]}>
        <DatePicker.RangePicker style={{ width: "100%" }} picker="day" />
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
        label={t("name_alt")}
        name="name_alt"
        rules={[
          {
            required: true,
            message: "Please input your name_alt!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t("status")}
        name="new"
        rules={[
          {
            required: true,
            message: "Please input your status!",
          },
        ]}
      >
        <Select>
          <Select.Option value="new">new</Select.Option>
          <Select.Option value="closed">closed</Select.Option>
          <Select.Option value="current">current</Select.Option>
        </Select>
      </Form.Item>
    </AppFormModal>
  );
};

export default AddModal;
