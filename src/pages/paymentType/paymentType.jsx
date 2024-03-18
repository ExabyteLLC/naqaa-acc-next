import {  Flex, Typography } from "antd";
import useTranslation from "../../models/translation";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import PaymentTypeModal from "./components/paymentTypeModal";
import myFetch from "../../models/fetch";
import DataTable from "../../assets/modals/dataTable";
import PaymentTypeEditModal from "./components/paymentTypeEditModal";
import DeleteBtn from "./components/DeleteBtn";
import { serialize } from "object-to-formdata";
const { Title, Text } = Typography;

const PaymentTypePage = () => {
  const [dataStatus, setDataStatus] = useState(null);
  const [data, setData] = useState([]);
  const { t } = useTranslation();

  const deleteFn = ({ id }) => {
    var fd = serialize({ payment_type_id: id });
    myFetch("/admin/accounting/payments/types/delete", {
      body: fd,
      onSuccess: () => {
        setData((prev) => prev.filter((o) => o.id !== id));
      },
    });
  };


  const fetchingData = () => {
    setDataStatus("loading");
    myFetch("/admin/accounting/payments/types/get", {
      onLoad: (res, api) => {
        if (!res.ok) {
          setDataStatus("error");
          return;
        }
        if (api.statusText !== "OK") {
          setDataStatus("error");
          return;
        }
        setDataStatus("fetched");
        setData(api.data);
      },
    });
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
    },
    { title: "added-date", key: "addstamp", type: "date" },
    { title: "last-modified", key: "updatestamp", type: "date" },
    {
      title: "edit-delete",
      actions: true,
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
};

export default PaymentTypePage;
