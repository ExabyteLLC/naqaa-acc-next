import { EditFilled } from "@ant-design/icons";
import { Flex } from "antd";
import DataTable from "../../assets/modals/dataTable";
import EditModal from "./components/EditModal";
import { Content } from "antd/es/layout/layout";
import useDataPageModel, { DataPageModel } from "../../models/dataPageModel";

const Serials = () => {
  return (
    <DataPageModel.Provider idKey="serial_id" Route="/admin/accounting/serials">
      <Page />
    </DataPageModel.Provider>
  );
};

const Page = () => {
  const { data, dataStatus } = useDataPageModel();

  console.log(data);

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
    {
      key: "edit",
      search: false,
      render: (_, key) => (
        <>
          <Flex align="center" justify="space-around">
            <EditModal
              butonType="link"
              buttonIcon={<EditFilled />}
              initialValues={key}
            />
          </Flex>
        </>
      ),
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
      />
    </Content>
  );
};

export default Serials;
