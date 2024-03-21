import { Button } from "antd";
import useDataPageModel, { DataPageModel } from "../../models/dataPageModel";
import { Content } from "antd/es/layout/layout";
import DataTable from "../../assets/modals/dataTable";
import { EditFilled } from "@ant-design/icons";
import PageForm from "./components/PageForm";
import listToTree from "../../models/listToTree";
import useTranslation from "../../models/translation";

const Taxes = () => {
  const { locale } = useTranslation();

  return (
    <DataPageModel.Provider
      IdKey="tax_id"
      Route="admin/accounting/taxes"
      hasDeps={true}
      processDepsData={(data) => {
        const treeOptions = (d) => {
          let d2 = [...d];
          let td = listToTree(d2, {
            additions: (o) => {
              return {
                title: `${o.id} - ${locale === "en" ? o.name : o.name_alt}`,
                value: o.id,
                disabled: o.master === 1,
              };
            },
          });
          return td;
        };
        data = {
          accounts: data,
          treeAccounts: treeOptions(data),
        };
        return data;
      }}
    >
      <Page />
    </DataPageModel.Provider>
  );
};

const Page = () => {
  const { deps, data, dataStatus, openEditForm } = useDataPageModel();
  console.log(deps);
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
      render: (_, obj) => {
        return deps?.accounts?.find((o) => o.id === obj["input_account_id"])
          .name;
      },
    },
    {
      key: "output account",
      render: (_, obj) => {
        return deps?.accounts?.find((o) => o.id === obj["output_account_id"])
          .name;
      },
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
