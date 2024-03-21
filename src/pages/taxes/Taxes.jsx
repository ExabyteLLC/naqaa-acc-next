import { Button } from "antd";
import useDataPageModel, { DataPageModel } from "../../models/dataPageModel";
import { Content } from "antd/es/layout/layout";
import DataTable from "../../assets/modals/dataTable";
import { EditFilled } from "@ant-design/icons";
import PageForm from "./components/PageForm";

const Taxes = () => {
  return (
    <DataPageModel.Provider
      IdKey="tax_id"
      Route="admin/accounting/taxes"
      hasDeps={true}
      
    >
      <Page />
    </DataPageModel.Provider>
  );
};

const Page = () => {
  const { data, dataStatus, openEditForm } = useDataPageModel();

  const columns = [
    {
      key: "id",
      type: "num",
    },
    {
      key: "name",
    },
    {
      key: "description",
    },
    {
      key: "input account",
    },
    {
      key: "output account",
    },
    {
      key: "addstamp",
      title: "added-date",
      type: "date",
    },
    {
      key: "updatestamp",
      title: "last-modified",
      type: "date",
    },
  ];

  return (
    <Content style={{ padding: "20px" }}>
      <DataTable
        columns={columns}
        data={data}
        loading={dataStatus === "loading"}
        emptyText={
          dataStatus === "error"
            ? "Sorry something went worng. Please, try again later."
            : "No taxes found yet."
        }
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
          </>
        )}
      />
      <PageForm />
    </Content>
  );
};

export default Taxes;
