import useTranslation from "../../../models/translation";
import AppFormModal from "../../../assets/modals/formModal";
import { useState } from "react";
import { serialize } from "object-to-formdata";
import myFetch from "../../../models/fetch";
import MyGrid from "../../../assets/modals/grid";
import CodeSection from "./formComponents/codeSection";
import DescriptionSection from "./formComponents/descriptionSection";
import AccountSettingSection from "./formComponents/accountSettingSection";

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
      <MyGrid spacingY={0}>
        <CodeSection t={t} fullspan = "true" />
        <DescriptionSection t={t} fullspan = "true" />
        <AccountSettingSection t={t} fullspan = "true" />
      </MyGrid>
    </AppFormModal>
  );
};

export default AddForm;
