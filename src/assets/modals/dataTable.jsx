import {
  Button,
  Flex,
  Input,
  Space,
  Table,
  TreeSelect,
  Typography,
} from "antd";
import {
  FilterFilled,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
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
  emptyText = "",
  dataTree = false,
  treeCurrId = "id",
  treeParentId = "parent_id",
  actions = null,
  scroll = { x: "max-content" },
} = {}) => {
  const { t } = useTranslation();

  // cols
  const cols = columns.map((column) => col(t, column));
  if (actions) {
    cols.push({
      key: "actions",
      fixed: "right",
      align: "center",
      onCell: () => {
        return {
          style: { padding: 0 },
        };
      },
      render: (_, key) => (
        <Flex align="center" justify="space-around">
          {actions(_, key)}
        </Flex>
      ),
    });
  }
  // data
  const dataSource = (function () {
    if (dataTree) {
      return listToTree(data, treeCurrId, treeParentId, "children");
    } else {
      return data;
    }
  })();

  return (
    <Table
      bordered
      columns={cols}
      dataSource={dataSource}
      loading={loading}
      rowKey={rowKey}
      sticky
      sortOrder="descend"
      pagination={{
        defaultPageSize: defaultPageSize,
        responsive: true,
      }}
      locale={{ emptyText }}
      scroll={scroll}
      tableLayout="auto"
    />
  );
};

export default DataTable;

function col(
  t,
  {
    title,
    key,
    type = "string", // "int|num|float|string|date",
    search = true,
    render,
    options,
    width = "max-content",
  }
) {
  key = key ?? title;
  title = title ?? key;
  const sorter = (function () {
    if (!search) return null;
    switch (type) {
      case "int":
      case "double":
      case "decimal":
      case "float":
      case "num":
        return (a, b) => new Number(a?.[key]) - new Number(b?.[key]);
      case "string":
        return (a, b) => {
          a = (a?.[key] ?? "")?.toString().toLowerCase();
          b = (b?.[key] ?? "")?.toString().toLowerCase();
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        };
      case "date":
        return (a, b) => new Date(a?.[key]) - new Date(b?.[key]);
      default:
        return null;
    }
  })();

  const rendered = (function () {
    if (render) return render;
    if (options) {
      const r = (v) => {
        var opt = options.find((o) => o?.value === v);
        return (
          <Typography.Text {...(opt?.props ?? {})}>
            {opt?.label}
          </Typography.Text>
        );
      };
      return r;
    }
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
    width,
    render: rendered,
    sorter: sorter,
    onHeaderCell: () => {
      return {
        style: { minWidth: 100 },
      };
    },
    onCell: () => {
      return {
        style: { minWidth: 100 },
      };
    },
    ...getColumnSearchProps(key, search, type, options, width ?? 175),
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
}
function getColumnSearchProps(dataIndex, search, type, options) {
  if (search) {
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
          {(function () {
            if (options) {
              return (
                <TreeSelect
                  placeholder={`Search ${dataIndex}`}
                  value={selectedKeys[0]}
                  onChange={(val) => {
                    setSelectedKeys([val]);
                    confirm();
                  }}
                  style={{
                    marginBottom: 8,
                    display: "block",
                    minWidth: 200,
                  }}
                  showSearch
                  treeNodeFilterProp="label"
                  treeData={options}
                />
              );
            }
            switch (type) {
              case "int":
              case "double":
              case "decimal":
              case "float":
              case "num":
                return (
                  <Input
                    type="number"
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                      setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => confirm()}
                    style={{
                      marginBottom: 8,
                      display: "block",
                      minWidth: 200,
                    }}
                  />
                );
              case "date":
                return (
                  <Input
                    type="date"
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                      setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => confirm()}
                    style={{
                      marginBottom: 8,
                      display: "block",
                      minWidth: 200,
                    }}
                  />
                );
              default:
                return (
                  <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                      setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => confirm()}
                    style={{
                      marginBottom: 8,
                      display: "block",
                      minWidth: 200,
                    }}
                  />
                );
            }
          })()}
          <Space>
            {!options && (
              <Button
                type="primary"
                onClick={() => confirm()}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Search
              </Button>
            )}
            <Button
              onClick={() => {
                if (clearFilters) {
                  clearFilters();
                  confirm();
                }
              }}
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
                close();
              }}
            >
              Close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) =>
        filtered ? (
          <FilterFilled
            style={{
              color: "#fff",
              fontSize: 20,
            }}
          />
        ) : (
          <FilterOutlined
            style={{
              color: "#fff",
              fontSize: 20,
            }}
          />
        ),
      onFilter: (value, record) => {
        if (options) {
          return record[dataIndex] === value;
        } else {
          return cleanStr(record[dataIndex]).includes(cleanStr(value));
        }
        function cleanStr(str) {
          if (str) {
            return str.toString().toLowerCase();
          } else return "";
        }
      },
    };
  }
}
function listToTree(
  arr,
  currId = "id",
  parentId = "parent_id",
  childKey = "children",
  cValue = null
) {
  const treeList = [];
  for (let item of arr) {
    if (item[parentId] == cValue) {
      let children = listToTree(arr, currId, parentId, childKey, item[currId]);
      if (children.length > 0) item[childKey] = children;
      treeList.push(item);
    }
  }
  return treeList;
}
