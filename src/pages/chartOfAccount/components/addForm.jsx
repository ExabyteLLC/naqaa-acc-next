import useTranslation from "../../../models/translation";
import AppFormModal from "../../../assets/modals/formModal";
import { useState } from "react";
import MyGrid from "../../../assets/modals/grid";
import CodeSection from "./formComponents/codeSection";
import DescriptionSection from "./formComponents/descriptionSection";
import AccountSettingSection from "./formComponents/accountSettingSection";
import AccountReportsSection from "./formComponents/accountReportsSection";
import AdditionalInfoSection from "./formComponents/additionalInfoSection";
import useCoaModel from "../model";

const AddForm = () => {
  const { t } = useTranslation();
  const { fetchingData: fetchFn,dataStatus,sendData } = useCoaModel();

  const [open, setOpen] = useState(false);

  

  const onFinish = (values) => {
    sendData(values);
    fetchFn();
    setOpen(false);
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

export default AddForm;
