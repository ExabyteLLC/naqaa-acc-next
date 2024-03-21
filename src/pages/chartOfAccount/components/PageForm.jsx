import useTranslation from "../../../models/translation";
import AppFormModal from "../../../assets/modals/formModal";
import MyGrid from "../../../assets/modals/grid";
import CodeSection from "./formComponents/codeSection";
import DescriptionSection from "./formComponents/descriptionSection";
import AccountSettingSection from "./formComponents/accountSettingSection";
import AccountReportsSection from "./formComponents/accountReportsSection";
import AdditionalInfoSection from "./formComponents/additionalInfoSection";
import useDataPageModel from "../../../models/dataPageModel";

const PageForm = () => {
  const { t } = useTranslation();
  const {
    formKey,
    currForm,
    formType,
    formInitData,
    closeForm,
    dataStatus,
    addDataApi,
    updDataAPI,
  } = useDataPageModel();

  const onFinish = (values) => {
    switch (formType) {
      case "add":
        addDataApi(values);
        break;
      case "edit":
        updDataAPI(values, formInitData.id);
        break;
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const title = (() => {
    switch (formType) {
      case "add":
        return t("add-account");
      case "edit":
        return t("update");
    }
  })();
  const submitBtnTxt = (() => {
    switch (formType) {
      case "add":
        return t("add");
      case "edit":
        return t("update");
    }
  })();

  return (
    <AppFormModal
      key={formKey}
      open={currForm("main")}
      onClose={closeForm}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={formInitData}
      loading={dataStatus === "loading"}
      title={title}
      submitBtnTxt={submitBtnTxt}
    >
      <MyGrid spacingY={12}>
        <CodeSection fullspan="true" />
        <DescriptionSection fullspan="true" />
        <AccountSettingSection fullspan="true" />
        <AccountReportsSection fullspan="true" />
        <AdditionalInfoSection fullspan="true" />
      </MyGrid>
    </AppFormModal>
  );
};

export default PageForm;
