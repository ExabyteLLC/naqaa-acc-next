import { Button, Flex, Typography } from "antd";
import useTranslation from "../../models/translation";
import { Content } from "antd/es/layout/layout";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import DataTable from "../../assets/modals/dataTable";
import DeleteBtn from "../paymentType/components/DeleteBtn";
import useDataPageModel, { DataPageModel } from "../../models/dataPageModel";
import PageForm from "./components/PageForm";
const { Title } = Typography;

const SalesInvoices = () => (
  <DataPageModel.Provider
    IdKey="invoices_id"
    Route="/admin/accounting/invoices/sales"
    hasDeps={true}
    processGetData={(data) =>
      data.map((item) => ({
        ...item,
        branch: `${item.branch_id} - ${item.branch_name}`,
      }))
    }
    processDepsData={(deps) => {
      var servicesInGroups = {};
      for (let gs of deps.groups_services) {
        if (!servicesInGroups[gs.group_id]) servicesInGroups[gs.group_id] = [];
        servicesInGroups[gs.group_id].push(gs.service_id);
      }

      let newDeps = {
        ...deps,
        branchesOptions: deps.branches.map((branch) => ({
          label: branch.name,
          value: branch.id,
        })),
        servicesInGroups,
      };
      return newDeps;
    }}
  >
    <Page />
  </DataPageModel.Provider>
);

const Page = () => {
  const { t } = useTranslation();
  const {
    data,
    deps,
    dataStatus,
    depsStatus,
    openAddForm,
    openEditForm,
    delDataApi,
  } = useDataPageModel();

  // console.log(data);
  // console.log(deps);

  const columns = [
    {
      title: "id",
      type: "int",
    },
    {
      title: "branches",
      key: "branch_id",
      options: deps.branchesOptions,
    },
    { title: "insurance", key: "reference_insurance_id" },
    { title: "client", key: "reference_client_id", type: "int" },
    { title: "total", key: "total_amount", type: "int" },

    { title: "added-date", key: "addstamp", type: "date" },
    { title: "last-modified", key: "updatestamp", type: "date" },
  ];

  return (
    <Content style={{ padding: "20px" }}>
      <Flex justify="space-between" align="center" style={{ width: "100%" }}>
        <Title level={2}>{t("sales-invoices")}</Title>
        <Button
          type={"primary"}
          onClick={() => {
            openAddForm();
          }}
          disabled={dataStatus === "loading" || depsStatus === "loading"}
        >
          {t("add-sales-invoice")}
        </Button>
      </Flex>

      <DataTable
        columns={columns}
        data={data}
        loading={dataStatus === "loading" || depsStatus === "loading"}
        emptyText={
          dataStatus === "error"
            ? "Sorry something went worng. Please, try again later."
            : "No payment types found yet."
        }
        scroll={false}
        actions={(_, key) => (
          <>
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
          </>
        )}
      />
      <PageForm />
    </Content>
  );
};

export default SalesInvoices;
