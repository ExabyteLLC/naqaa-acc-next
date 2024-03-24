import { Button, Flex, Typography } from "antd";
import useTranslation from "../../models/translation";
import { Content } from "antd/es/layout/layout";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import DataTable from "../../assets/modals/dataTable";
import DeleteBtn from "./components/DeleteBtn";
import useDataPageModel, { DataPageModel } from "../../models/dataPageModel";
import PageForm from "./components/PageForm";
const { Title } = Typography;

const PaymentTypePage = () => (
  <DataPageModel.Provider
    IdKey="payment_id"
    Route="/admin/accounting/payments/types"
  >
    <Page />
  </DataPageModel.Provider>
);

const Page = () => {
  const { t } = useTranslation();
  const { data, dataStatus, openAddForm, openEditForm, delDataApi } =
    useDataPageModel();

  const columns = [
    {
      title: "id",
      type: "int",
    },
    { title: "name" },
    { title: "description" },
    {
      title: "status",
      key: "active",
      type: "int",
      options: [
        {
          label: "Active",
          value: 1,
          props: { type: "success" },
        },
        {
          label: "Inactive",
          value: 0,
          props: { type: "danger" },
        },
      ],
    },
    { title: "added-date", key: "addstamp", type: "date" },
    { title: "last-modified", key: "updatestamp", type: "date" },
    {
      title: "edit-delete",
      search: false,
      render: (_, key) => {
        return (
          <>
            <Flex align="center" justify="space-around">
              <Button
                type={"link"}
                onClick={() => {
                  openEditForm(key);
                }}
              >
                <EditFilled />
              </Button>
              <DeleteBtn
                title={t("delete")}
                okText={t("delete")}
                cancelText={t("cancel")}
                onConfirm={() => delDataApi(key)}
              >
                <DeleteFilled />
              </DeleteBtn>
            </Flex>
          </>
        );
      },
    },
  ];

  return (
    <Content style={{ padding: "20px" }}>
      <Flex justify="space-between" align="center" style={{ width: "100%" }}>
        <Title level={2}>{t("payment-type")}</Title>
        <Button
          type={"primary"}
          onClick={() => {
            openAddForm();
          }}
          disabled={dataStatus === "loading"}
        >
          {t("add-payment-type")}
        </Button>
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
        scroll={false}
      />
      <PageForm />
    </Content>
  );
};

export default PaymentTypePage;
