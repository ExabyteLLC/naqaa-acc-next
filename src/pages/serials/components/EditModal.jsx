import { Form, Input } from "antd";
import useTranslation from "../../../models/translation";
import AppFormModal from "../../../assets/modals/formModal";
import { useState } from "react";
import { serialize } from "object-to-formdata";
import myFetch from "../../../models/fetch";

const EditModal = ({ fetchFn, initialValues, buttonIcon, butonType }) => {
  const { t } = useTranslation();
  const [dataStatus, setDataStatus] = useState(null);
  const [open, setOpen] = useState(false);

  const sendData = async (values) => {
    var fd = serialize({ ...values, serial_id: initialValues.id });

    setDataStatus("loading");
    myFetch("/admin/accounting/serials/update", {
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
        label={t("before")}
        name="before"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={t("after")}
        name="after"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t("digits")}
        name="digits"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label={t("initial")}
        name="initial"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
    </AppFormModal>
  );
};

export default EditModal;
