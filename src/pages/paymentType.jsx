import { Button, Flex, Input, Space, Table, Typography } from "antd";
import useTranslation from "../models/translation";
import { Content } from "antd/es/layout/layout";
import { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import PaymentTypeModal from "../assets/components/paymentTypeModal";
const { Title } = Typography;

const PaymentTypePage = () => {
  const [dataStatus, setDataStatus] = useState(null);
  const [paymentData, setpaymentData] = useState([]);
  const { t } = useTranslation();
  const URL =
    "https://development.exabyte-eg.com/explorer/__/elshall/BeyondQuality-Api/";
  const uId = "?UID=SGhoT1k2em9VMkh0dkp0MjozaHdmcnlxdWxhSS9uN0V3WWtZRUpRPT0=";

  const fetchingData = async () => {
    setDataStatus("loading");
    const res = await fetch(URL + "/admin/accounting/payments/types/get" + uId);
    if (!res.ok) {
      setDataStatus("error");
      return;
    }
    const data = await res.json();
    if (data.statusText !== "OK") {
      setDataStatus("error");
      return;
    }
    setDataStatus("fetched");
    setpaymentData(data);
  };

  useEffect(() => {
    if (!dataStatus) fetchingData();
  }, [dataStatus, paymentData]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  // Search Configs
  const getColumnSearchProps = (dataIndex, search) => {
    if (search)
      return {
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
          close,
        }) => (
          <div
            style={{
              padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() =>
                handleSearch(selectedKeys, confirm, dataIndex)
              }
              style={{
                marginBottom: 8,
                display: "block",
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({
                    closeDropdown: false,
                  });
                  setSearchText(selectedKeys[0]);
                  setSearchedColumn(dataIndex);
                }}
              >
                Filter
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  close();
                }}
              >
                Close
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? "#fff" : "rgba(255,255,255,0.3)",
              fontSize: 20,
            }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
      };
  };

  const col = ({ title, key, search = true }) => {
    return {
      title: t(title),
      dataIndex: key ?? title,
      key: key ?? title,
      ...getColumnSearchProps(key ?? title, search),
    };
  };
  const columns = [
    { title: "id" },
    { title: "name" },
    { title: "description" },
    { title: "status", key: "active" },
    { title: "added-date", key: "addstamp" },
    { title: "last-modified", key: "updatestamp" },
    { title: "edit-delete", search: false },
  ].map((column) => col(column));
  const data = paymentData ? paymentData?.data : [];

  return (
    <Content style={{ padding: "20px" }}>
      <Flex justify="space-between" align="center" style={{ width: "100%" }}>
        <Title level={2}>{t("payment-type")}</Title>
        <PaymentTypeModal fetchFn={fetchingData} />
      </Flex>

      <Table
        bordered
        columns={columns}
        dataSource={data}
        loading={dataStatus === "loading"}
        rowKey="id"
        sticky
      />
    </Content>
  );
};

export default PaymentTypePage;
