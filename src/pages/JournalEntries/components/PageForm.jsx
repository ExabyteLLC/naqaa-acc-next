import useTranslation from "../../../models/translation";
import AppFormModal from "../../../assets/modals/formModal";
import MyGrid from "../../../assets/modals/grid";
import TitleSection from "./formComponents/titleSection";
import TableSection from "./formComponents/tableSection";
import useDataPageModel from "../../../models/dataPageModel";
import SumSection from "./formComponents/sumSection";

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
    updDataApi,
  } = useDataPageModel();

  const onFinish = (values) => {
    console.log(values, addDataApi);
    switch (formType) {
      case "add":
        addDataApi(values);
        break;
      case "edit":
        updDataApi(values, formInitData.id);
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
        <TitleSection fullspan="true" />

        <TableSection fullspan="true" />
        <SumSection fullspan="true" />
      </MyGrid>
    </AppFormModal>
  );
};

export default PageForm;
