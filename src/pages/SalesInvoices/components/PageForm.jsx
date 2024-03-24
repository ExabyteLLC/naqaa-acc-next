import { Form, Input, Select } from "antd";
import useTranslation from "../../../models/translation";
import AppFormModal from "../../../assets/modals/formModal";
import TextArea from "antd/es/input/TextArea";
import MyGrid from "../../../assets/modals/grid";
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
    updDataApi,
  } = useDataPageModel();

  const onFinish = (values) => {
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
        return t("add-sales-invoice");
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
      submitBtnTxt={submitBtnTxt}
      width="80%"
      title={title}
    >
      <MyGrid defaultSpan={24} spacingY={24}>
        
      </MyGrid>
    </AppFormModal>
  );
};

export default PageForm;