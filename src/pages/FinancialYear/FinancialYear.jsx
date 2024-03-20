import { Flex, Typography } from "antd";
import useTranslation from "../../models/translation";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import myFetch from "../../models/fetch";
import DataTable from "../../assets/modals/dataTable";
import DeleteBtn from "./components/DeleteBtn";
import { serialize } from "object-to-formdata";
import EditModal from "./components/EditModal";
import AddModal from "./components/AddModal";
const { Title } = Typography;

const PaymentTypePage = () => {
  const [dataStatus, setDataStatus] = useState(null);
  const [data, setData] = useState([]);
  const { t } = useTranslation();

  const deleteFn = ({ id }) => {
    var fd = serialize({ year_id: id });
    myFetch("/admin/accounting/years/delete", {
      body: fd,
      onSuccess: () => {
        setData((prev) => prev.filter((o) => o.id !== id));
      },
    });
  };

  const fetchingData = () => {
    setDataStatus("loading");
    myFetch("/admin/accounting/years/get", {
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
        console.log(api.data);
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
    { key: "startstamp", type: "date" },
    { key: "endstamp", type: "date" },
    {
      key: "status",
      options: [
        {
          value: "new",
          label: "new",
          props: { type: "success" },
        },
        {
          value: "closed",
          label: "closed",
          props: { type: "danger" },
        },
        {
          value: "current",
          label: "current",
          props: { type: "warning" },
        },
      ],
    },
    { title: "added-date", key: "addstamp", type: "date" },
    { title: "last-modified", key: "updatestamp", type: "date" },
    {
      title: "edit-delete",
      search: false,
      render: (_, key) => {
        return (
          <>
            <Flex align="center" justify="space-around">
              <EditModal
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
        );
      },
    },
  ];

  return (
    <Content style={{ padding: "20px" }}>
      <Flex justify="space-between" align="center" style={{ width: "100%" }}>
        <Title level={2}>{t("accounting-year")}</Title>
        <AddModal fetchFn={fetchingData} />
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
        scroll={false}
      />
    </Content>
  );
};

export default PaymentTypePage;
