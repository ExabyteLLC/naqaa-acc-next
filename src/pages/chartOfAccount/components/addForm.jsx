import {  Divider, Form, Input, Select } from "antd";
import useTranslation from "../../../models/translation";
import AppFormModal from "../../../assets/modals/formModal";
import { useState } from "react";
import { serialize } from "object-to-formdata";
import myFetch from "../../../models/fetch";
import TextArea from "antd/es/input/TextArea";
import MyGrid from "../../../assets/modals/grid";

const AddForm = ({ fetchFn }) => {
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
      title={t("add-account")}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      loading={dataStatus === "loading"}
      submitBtnTxt={t("add")}
    >
      <MyGrid>
        <Form.Item
          label={t("code")}
          name="code"
          rules={[
            {
              required: true,
              message: "Please enter the code!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label={t("parent")}
          name="parent"
          rules={[
            {
              required: true,
              message: "Please enter the code!",
            },
          ]}
        >
          <Select placeholder={t("choose")}>
            <Select.Option value="1">Text</Select.Option>
          </Select>
        </Form.Item>

        <Divider orientation="left" orientationMargin={10} fullSpan>
          {t("description")}
        </Divider>

        <Form.Item
          label={t("code")}
          name="code"
          rules={[
            {
              required: true,
              message: "Please enter the code!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t("code")}
          name="code"
          rules={[
            {
              required: true,
              message: "Please enter the code!",
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
      </MyGrid>
    </AppFormModal>
  );
};

export default AddForm;
