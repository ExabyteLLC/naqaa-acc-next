import { DeleteFilled, EditFilled } from "@ant-design/icons";
import useDataPageModel, { DataPageModel } from "../../models/dataPageModel";
import DeleteBtn from "../paymentType/components/DeleteBtn";
import { Button, Flex, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import useTranslation from "../../models/translation";
import PageForm from "./components/PageForm";
import SimpleTable from "../../assets/modals/simpleTable";
const { Title } = Typography;

export default function JournalEntries() {
  const { locale } = useTranslation();
  return (
    <DataPageModel.Provider
      IdKey="transaction_id"
      Route="admin/accounting/transactions"
      getApiRoute="get-review"
      hasDeps={true}
      processGetData={(data) => {
        let arr = [];
        for (let o of data.transactions) {
          arr.push(o);
          for (let o2 of o.transaction_accounts) {
            arr.push(o2);
          }
        }
        return arr;
      }}
      processDepsData={(data) => {
        const treeOptions = (d) => {
          let d2 = [...d];
          let td = listToTree(d2, {
            additions: (o) => {
              return {
                title: `${o.id} - ${locale === "en" ? o.name : o.name_alt}`,
                value: o.id,
              };
            },
          });
          return td;
        };

        data.treeAccounts = treeOptions(data.accounts);
        return data;
      }}
    >
      <Page />
    </DataPageModel.Provider>
  );
}

function Page() {
  const { t } = useTranslation();
  const { data, deps, dataStatus, openAddForm, openEditForm, delDataApi } =
    useDataPageModel();

  console.log(deps);

  const columns = [
    {
      key: "addstamp",
      title: "date",
      align: "center",
      onCell: (data) => {
        if (data?.transaction_accounts?.length > 0) {
          return {
            rowSpan: data?.transaction_accounts?.length + 1,
          };
        } else {
          return {
            rowSpan: 0,
          };
        }
      },
    },
    {
      title: "account",
      key: "account_id",
      onCell: (data) => {
        if (data?.transaction_accounts?.length) {
          return {
            colSpan: 5,
          };
        } else {
          return {
            colSpan: 1,
          };
        }
      },
      render: (_, data) => {
        if (data?.transaction_accounts?.length) {
          return data.title;
        } else {
          return data.account_id;
        }
      },
    },
    {
      title: "account-name",
      key: "account_name",
      onCell: (data) => {
        if (data?.transaction_accounts?.length) {
          return {
            colSpan: 0,
          };
        } else {
          return {
            colSpan: 1,
          };
        }
      },
      render: (_, data) => {
        if (!data?.transaction_accounts?.length) {
          return deps?.accounts?.find((o) => o.id === data.account_id)?.name;
        }
      },
    },
    {
      key: "description",
      onCell: (data) => {
        if (data?.transaction_accounts?.length) {
          return {
            colSpan: 0,
          };
        } else {
          return {
            colSpan: 1,
          };
        }
      },
    },
    {
      key: "debit",
      onCell: (data) => {
        if (data?.transaction_accounts?.length) {
          return {
            colSpan: 0,
          };
        } else {
          return {
            colSpan: 1,
          };
        }
      },
    },
    {
      key: "credit",
      onCell: (data) => {
        if (data?.transaction_accounts?.length) {
          return {
            colSpan: 0,
          };
        } else {
          return {
            colSpan: 1,
          };
        }
      },
    },
  ];

  return (
    <Content style={{ padding: "20px" }}>
      <Flex justify="space-between" align="center" style={{ width: "100%" }}>
        <Title level={2}>{t("journal-entries")}</Title>
        <Button
          type={"primary"}
          onClick={() => {
            openAddForm();
          }}
        >
          {t("create-transaction")}
        </Button>
      </Flex>

      <SimpleTable
        columns={columns}
        data={data}
        loading={dataStatus === "loading"}
        emptyText={
          dataStatus === "error"
            ? "Sorry something went worng. Please, try again later."
            : "No transactions found yet."
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

            {!key.children && (
              <DeleteBtn
                title={t("delete")}
                okText={t("delete")}
                cancelText={t("cancel")}
                onConfirm={() => delDataApi(key)}
              >
                <DeleteFilled />
              </DeleteBtn>
            )}
          </>
        )}
        actionOnCell={(data) => {
          if (data?.transaction_accounts?.length > 0) {
            return {
              rowSpan: data?.transaction_accounts?.length + 1,
            };
          } else {
            return {
              rowSpan: 0,
            };
          }
        }}
        onRow={(data, i) => {
          if (i > 0 && data?.transaction_accounts?.length) {
            return {
              style: { borderTop: "2px solid rgba(0,0,0,0.3)" },
            };
          } else {
            return null;
          }
        }}
      />

      <PageForm />
    </Content>
  );
}

function listToTree(
  arr,
  {
    currId = "id",
    parentId = "parent_id",
    childKey = "children",
    cValue = null,
    additions,
  } = {}
) {
  const treeList = [];
  for (let item of arr) {
    if (item[parentId] == cValue) {
      item = { ...item };
      let children = listToTree(arr, {
        currId,
        parentId,
        childKey,
        cValue: item[currId],
        additions,
      });
      if (children.length > 0) item[childKey] = children;
      if (additions) item = { ...item, ...additions(item) };
      treeList.push(item);
    }
  }
  return treeList;
}
