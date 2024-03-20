import useTranslation from "../../../models/translation";
import AppFormModal from "../../../assets/modals/formModal";
import { useState } from "react";
import { serialize } from "object-to-formdata";
import myFetch from "../../../models/fetch";
import MyGrid from "../../../assets/modals/grid";
import CodeSection from "./formComponents/codeSection";
import DescriptionSection from "./formComponents/descriptionSection";
import AccountSettingSection from "./formComponents/accountSettingSection";
import AccountReportsSection from "./formComponents/accountReportsSection";
import AdditionalInfoSection from "./formComponents/additionalInfoSection";
import useCoaModel from "../model";

const EditForm = ({ initialValues, buttonIcon, butonType }) => {
  const { t } = useTranslation();
  const { fetchingData: fetchFn } = useCoaModel();

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
      <MyGrid spacingY={12}>
        <CodeSection t={t} fullspan="true" />
        <DescriptionSection t={t} fullspan="true" />
        <AccountSettingSection t={t} fullspan="true" />
        <AccountReportsSection t={t} fullspan="true" />
        <AdditionalInfoSection t={t} fullspan="true" />
      </MyGrid>
    </AppFormModal>
  );
};

export default EditForm;
