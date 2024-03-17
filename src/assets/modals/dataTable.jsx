import { Button, Input, Space, Table } from "antd";
import { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { FaSort } from "react-icons/fa";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { FaSortAmountUpAlt } from "react-icons/fa";
import useTranslation from "../../models/translation";

const DataTable = ({
  columns,
  data,
  rowKey = "id",
  loading,
  defaultPageSize = 20,
} = {}) => {
  const { t } = useTranslation();

  const setSearchText = useState("")[1];
  const setSearchedColumn = useState("")[1];
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
  const col = ({
    title,
    key,
    type = "string", // "int|num|float|string|date",
    search = true,
    actions = false,
    render,
  }) => {
    key = key ?? title;

    const sorter = (function () {
      if (actions) return null;
      switch (type) {
        case "int":
        case "double":
        case "decimal":
        case "float":
        case "num":
          return (a, b) => new Number(a?.[key]) - new Number(b?.[key]);
        case "string":
          return (a, b) => a?.[key]?.toLowerCase() - b?.[key]?.toLowerCase();
        case "date":
          return (a, b) => new Date(a?.[key]) - new Date(b?.[key]);
        default:
          return null;
      }
    })();

    const rendered = (function () {
      if (render) return render;
      switch (type) {
        case "date":
          return (v) => {
            return new Date(v).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",

              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });
          };
        default:
          return null;
      }
    })();

    return {
      title: t(title),
      dataIndex: key,
      key: key,
      render: rendered,
      sorter: sorter,
      ...(!actions && getColumnSearchProps(key, search)),
      ...(!!sorter && {
        sortDirections: ["ascend", "descend"],
        sortIcon: ({ sortOrder }) => {
          if (sortOrder === "ascend") {
            return (
              <FaSortAmountDownAlt
                style={{
                  color: "#fff",
                  fontSize: 20,
                }}
              />
            );
          } else if (sortOrder === "descend") {
            return (
              <FaSortAmountUpAlt
                style={{
                  color: "#fff",
                  fontSize: 20,
                }}
              />
            );
          } else {
            return (
              <FaSort
                style={{
                  color: "#fff",
                  fontSize: 20,
                }}
              />
            );
          }
        },
      }),
    };
  };
  const cols = columns.map((column) => col(column));
  return (
    <Table
      bordered
      columns={cols}
      dataSource={data ?? []}
      loading={loading}
      rowKey={rowKey}
      sticky
      sortOrder="descend"
      pagination={{
        defaultPageSize: defaultPageSize,
        responsive: true,
      }}
    />
  );
};

export default DataTable;
