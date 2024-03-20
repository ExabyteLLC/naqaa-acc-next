import { DatePicker, Form, Input, Select } from "antd";
import useTranslation from "../../../models/translation";
import AppFormModal from "../../../assets/modals/formModal";
import { useState } from "react";
import { serialize } from "object-to-formdata";
import myFetch from "../../../models/fetch";
import TextArea from "antd/es/input/TextArea";
import "../../../App.css";

const EditModal = ({ fetchFn, initialValues, buttonIcon, butonType }) => {
  const { t } = useTranslation();
  const [dataStatus, setDataStatus] = useState(null);
  const [open, setOpen] = useState(false);

  const sendData = async (values) => {
    const finalData = { ...values, year_id: initialValues.id };
    console.log(finalData);
    var fd = serialize(finalData);
    setDataStatus("loading");
    myFetch("/admin/accounting/years/update", {
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
      style={{ width: "100%" }}
      key={JSON.stringify(initialValues)}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      title={t("edit")}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={initialValues}
      loading={dataStatus === "loading"}
      buttonIcon={buttonIcon}
      btnType={butonType}
      submitBtnTxt={t("update")}
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
        <TextArea />
      </Form.Item>

      <Form.Item label={t("range")} name={"range"} rules={[{ required: true }]}>
        <DatePicker.RangePicker style={{ width: "100%" }} picker="day" />
      </Form.Item>

      <Form.Item
        label={t("Status")}
        name="status"
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

export default EditModal;
