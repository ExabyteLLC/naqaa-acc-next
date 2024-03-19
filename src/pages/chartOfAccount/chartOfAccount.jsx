import { Flex, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import DataTable from "../../assets/modals/dataTable";
import { useCallback, useEffect, useState } from "react";
import useTranslation from "../../models/translation";
import myFetch from "../../models/fetch";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import DeleteBtn from "../paymentType/components/DeleteBtn";
import PaymentTypeEditModal from "../paymentType/components/paymentTypeEditModal";
import { serialize } from "object-to-formdata";
import AddForm from "./components/addForm";
const { Title } = Typography;

export default function ChartOfAccount() {
  const [dataStatus, setDataStatus] = useState(null);
  const [data, setData] = useState([]);
  const { t } = useTranslation();

  const deleteFn = ({ id }) => {
    var fd = serialize({ payment_type_id: id });
    myFetch("/admin/accounting/accounts/delete", {
      body: fd,
      onSuccess: () => {
        setData((prev) => prev.filter((o) => o.id !== id));
      },
    });
  };
  const listToTree = useCallback(
    (
      arr,
      currId = "id",
      parentId = "parent_id",
      childKey = "children",
      cValue = null
    ) => {
      const treeList = [];
      for (let item of arr) {
        if (item[parentId] == cValue) {
          let children = listToTree(
            arr,
            currId,
            parentId,
            childKey,
            item[currId]
          );
          if (children.length > 0) item[childKey] = children;
          treeList.push(item);
        }
      }
      return treeList;
    },
    []
  );

  const fetchingData = useCallback(() => {
    setDataStatus("loading");
    myFetch("/admin/accounting/accounts/get", {
      onLoad: (res, api) => {
        if (!res.ok) {
          setDataStatus("error");
          return;
        }
        if (api.statusText !== "OK") {
          setDataStatus("error");
          return;
        }
        console.log(listToTree(api.data));

        setDataStatus("fetched");
        setData(listToTree(api.data));
      },
    });
  }, [listToTree]);

  useEffect(() => {
    if (!dataStatus) fetchingData();
  }, [dataStatus, data, fetchingData]);

  const columns = [
    {
      title: "id",
      type: "int",
    },
    { title: "name", width: 150 },
    {
      title: "account-nature",
      key: "nature",
      width: 200,
      options: [
        {
          label: t("credit"),
          value: "creditor",
        },
        {
          label: t("debit"),
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
    { title: "description", width: 300 },
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
        <AddForm fetchFn={fetchingData} />
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
            <PaymentTypeEditModal
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
