import { useEffect, useState } from "react";
import { EditFilled } from "@ant-design/icons";
import { Flex } from "antd";
import { API, UID } from "../../params";
import myFetch from "../../models/fetch";
import DataTable from "../../assets/modals/dataTable";
import EditModal from "./components/EditModal";
import { Content } from "antd/es/layout/layout";

const Serials = () => {
  const [dataStatus, setDataStatus] = useState(null);
  const [data, setData] = useState([]);

  const fetchingData = () => {
    myFetch("/admin/accounting/serials/get", {
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
        setData(data);
      },
    });

    const fetchData = async () => {
      try {
        const fetchApi = await fetch(
          `${API}admin/accounting/serials/get?UID=${UID}`
        );
        const res = await fetchApi.json();
        setData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  };

  useEffect(() => {
    if (!dataStatus) fetchingData();
  }, [dataStatus, data]);

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
      actions: true,
      render: (_, key) => (
        <>
          <Flex align="center" justify="space-around">
            <EditModal
              butonType="link"
              buttonIcon={<EditFilled />}
              initialValues={key}
              fetchFn={fetchingData}
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
        data={data?.data ?? []}
        loading={dataStatus === "loading"}
      />
    </Content>
  );
};

export default Serials;
