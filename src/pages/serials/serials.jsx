import { EditFilled } from "@ant-design/icons";
import { Button } from "antd";
import DataTable from "../../assets/modals/dataTable";
import { Content } from "antd/es/layout/layout";
import useDataPageModel, { DataPageModel } from "../../models/dataPageModel";
import PageForm from "./components/PageForm";

const Serials = () => {
  return (
    <DataPageModel.Provider IdKey="serial_id" Route="/admin/accounting/serials">
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
      key: "name_alt",
      title: "name",
    },
    {
      key: "after",
    },
    {
      key: "before",
    },
    {
      key: "digits",
      type: "num",
    },
    {
      key: "initial",
      type: "num",
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
            : "No serials found yet."
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

export default Serials;
