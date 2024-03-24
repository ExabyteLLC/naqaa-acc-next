import useTranslation from "../../../models/translation";
import AppFormModal from "../../../assets/modals/formModal";
import MyGrid from "../../../assets/modals/grid";
import useDataPageModel from "../../../models/dataPageModel";
import { Form, Select } from "antd";
import SelectOptionGenerator from "../../../models/selectOptionGenerator";
import SenderInfo from "./formComponents/senderInfo";
import RecepientInfo from "./formComponents/RecepientInfo";
import Services from "./formComponents/Services";
import Tax from "./formComponents/Tax";
import Dues from "./formComponents/Dues";

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
        <Form.Item label={t("currency")} required>
          <Select placeholder={t("choose")}>
            {SelectOptionGenerator(
              deps?.currencies?.map((curr) => {
                return { title: curr.symbol, key: curr.id };
              }),
              false
            )}
          </Select>
        </Form.Item>
        <SenderInfo />
        <RecepientInfo />
        <Services fullspan="true" />
        <Tax fullspan="true" />
        <Dues fullspan="true" />
      </MyGrid>
    </AppFormModal>
  );
};

export default PageForm;