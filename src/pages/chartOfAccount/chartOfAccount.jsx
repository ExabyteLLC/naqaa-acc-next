import { Flex, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import PaymentTypeModal from "../paymentType/components/paymentTypeModal";
import DataTable from "../../assets/modals/dataTable";
import { useEffect, useState } from "react";
import useTranslation from "../../models/translation";
import myFetch from "../../models/fetch";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import DeleteBtn from "../paymentType/components/DeleteBtn";
import PaymentTypeEditModal from "../paymentType/components/paymentTypeEditModal";
import { serialize } from "object-to-formdata";
const { Title, Text } = Typography;

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

  const fetchingData = () => {
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
        console.log(api.data);

        console.log(listToTree(api.data));

        setDataStatus("fetched");
        setData(listToTree(api.data));
      },
    });
  };

  const listToTree = (
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
  };

  useEffect(() => {
    if (!dataStatus) fetchingData();
  }, [dataStatus, data]);

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
      render: (data) =>
        data === 1 ? (
          <Text type="success">Active</Text>
        ) : (
          <Text type="danger">Inactive</Text>
        ),
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
      render: (_, key) => (
        <>
          <Flex align="center" justify="space-around">
            <PaymentTypeEditModal
              butonType="link"
              buttonIcon={<EditFilled />}
              initialValues={key}
              fetchFn={fetchingData}
            />
            <DeleteBtn
              title={t("delete")}
              okText={t("delete")}
              cancelText={t("cancel")}
              onConfirm={() => deleteFn(key)}
            >
              <DeleteFilled />
            </DeleteBtn>
          </Flex>
        </>
      ),
    },
  ];

  return (
    <Content style={{ padding: "20px" }}>
      <Flex justify="space-between" align="center" style={{ width: "100%" }}>
        <Title level={2}>{t("payment-type")}</Title>
        <PaymentTypeModal fetchFn={fetchingData} />
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
      />
    </Content>
  );
}
