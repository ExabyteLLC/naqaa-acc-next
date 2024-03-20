import { Flex, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import DataTable from "../../assets/modals/dataTable";
import useTranslation from "../../models/translation";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import DeleteBtn from "../paymentType/components/DeleteBtn";
import AddForm from "./components/addForm";
import useCoaModel, { CoaModel } from "./model";
import EditForm from "./components/editForm";
const { Title } = Typography;

export default function ChartOfAccount() {
  return (
    <CoaModel.Provider>
      <Page />
    </CoaModel.Provider>
  );
}

function Page() {
  const { data, dataStatus, deleteFn, fetchingData } = useCoaModel();
  const { t } = useTranslation();

  const columns = [
    {
      title: "id",
      type: "int",
    },
    { title: "name", width: 150 },
    { title: "name-in-arabic", key: "name_alt", width: 150 },
    {
      title: "account-nature",
      key: "nature",
      width: 200,
      options: [
        {
          label: t("credit-key"),
          value: "creditor",
        },
        {
          label: t("debit-key"),
          value: "debitor",
        },
      ],
    },
    {
      title: "account-route",
      key: "route",
      width: 200,
      options: [
        {
          label: t("assets"),
          value: "assets",
        },
        {
          label: t("liabilities"),
          value: "liabilities",
        },
        {
          label: t("equity"),
          value: "equity",
        },
        {
          label: t("revenue"),
          value: "revenue",
        },
        {
          label: t("expenses"),
          value: "expenses",
        },
      ],
    },
    {
      title: "account-type",
      key: "master",
      type: "int",
      options: [
        {
          label: t("master-1"),
          value: 1,
        },
        {
          label: t("master-0"),
          value: 0,
        },
      ],
      width: 200,
    },
    {
      title: "report_balance_sheet-1",
      key: "report_balance_sheet",
      type: "int",
      options: [
        {
          label: t("none"),
          value: 0,
        },
        {
          label: t("report_balance_sheet-1"),
          value: 1,
        },
      ],
      width: 200,
    },
    {
      title: "report-cash-flow",
      key: "report_cash_flow",
      type: "int",
      options: [
        {
          label: t("active"),
          value: 1,
        },
        {
          label: t("in-active"),
          value: 0,
        },
      ],
      width: 200,
    },
    {
      title: "report-income-statement",
      key: "report_income_statement",
      type: "int",
      options: [
        {
          label: t("revenue"),
          value: "revenue",
        },
        {
          label: t("expenses"),
          value: "expenses",
        },
      ],
      width: 200,
    },
    { title: "description", width: 300 },
    { title: "description-in-arabic", key: "description_alt", width: 300 },
    {
      title: "status",
      key: "active",
      type: "int",
      options: [
        {
          label: t("active"),
          value: 1,
          props: { type: "success" },
        },
        {
          label: t("in-active"),
          value: 0,
          props: { type: "danger" },
        },
      ],
      width: 200,
    },
    { title: "added-date", key: "addstamp", type: "date", width: 300 },
    { title: "last-modified", key: "updatestamp", type: "date", width: 300 },
  ];

  return (
    <Content style={{ padding: "20px" }}>
      <Flex justify="space-between" align="center" style={{ width: "100%" }}>
        <Title level={2}>{t("payment-type")}</Title>
        <AddForm fetchFn={fetchingData} data={data} />
      </Flex>

      <DataTable
        columns={columns}
        data={data}
        loading={dataStatus === "loading"}
        emptyText={
          dataStatus === "error"
            ? "Sorry something went worng. Please, try again later."
            : "No payment types found yet."
        }
        actions={(_, key) => (
          <>
            <EditForm
              butonType="link"
              buttonIcon={<EditFilled />}
              initialValues={key}
              fetchFn={fetchingData}
            />
            {!key.children && (
              <DeleteBtn
                title={t("delete")}
                okText={t("delete")}
                cancelText={t("cancel")}
                onConfirm={() => deleteFn(key)}
              >
                <DeleteFilled />
              </DeleteBtn>
            )}
          </>
        )}
      />
    </Content>
  );
}
