import { Button, Flex, Typography } from "antd";
import useTranslation from "../../models/translation";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import PaymentTypeModal from "./components/paymentTypeModal";
import myFetch from "../../models/fetch";
import DataTable from "../../assets/modals/dataTable";
import PaymentTypeEditModal from "./components/paymentTypeEditModal";
const { Title, Text } = Typography;

const PaymentTypePage = () => {
  const [dataStatus, setDataStatus] = useState(null);
  const [paymentData, setpaymentData] = useState([]);
  const { t } = useTranslation();

  const fetchingData = () => {
    setDataStatus("loading");
    myFetch("/admin/accounting/payments/types/get", {
      onLoad: (res, data) => {
        if (!res.ok) {
          setDataStatus("error");
          return;
        }
        if (data.statusText !== "OK") {
          setDataStatus("error");
          return;
        }
        setDataStatus("fetched");
        setpaymentData(data);
      },
    });
  };

  useEffect(() => {
    if (!dataStatus) fetchingData();
  }, [dataStatus, paymentData]);

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
            <Button
              type="link"
              onClick={() => {
                console.log(key);
              }}
            >
              <DeleteFilled />
            </Button>
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
        data={paymentData?.data}
        loading={dataStatus === "loading"}
      />
    </Content>
  );
};

export default PaymentTypePage;
