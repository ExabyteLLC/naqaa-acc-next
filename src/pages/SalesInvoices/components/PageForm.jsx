import useTranslation from "../../../models/translation";
import AppFormModal from "../../../assets/modals/formModal";
import MyGrid from "../../../assets/modals/grid";
import useDataPageModel from "../../../models/dataPageModel";

import SenderInfo from "./formComponents/senderInfo";
import RecepientInfo from "./formComponents/RecepientInfo";
import Services from "./formComponents/Services";
import Tax from "./formComponents/Tax";
import Dues from "./formComponents/Dues";
import { FormItemSelect } from "../../../assets/modals/formItem";

const PageForm = () => {
  const { t } = useTranslation();
  const {
    deps,
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
    console.log(values);
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
      width="90%"
      title={title}
    >
      <MyGrid defaultSpan={24} spacingY={24}>
        <FormItemSelect
          label={t("currency")}
          required
          span={12}
          name="currency_id"
          placeholder={t("choose")}
          initValue={"EGP"}
          options={deps?.currencies}
          optionsTitleKey="id"
        />
        <SenderInfo />
        <RecepientInfo />
        <Services />
        <Tax />
        <Dues />
      </MyGrid>
    </AppFormModal>
  );
};

export default PageForm;
