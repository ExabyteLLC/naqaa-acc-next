import { Button, Flex, Input, Table, TreeSelect, Typography } from "antd";
import useTranslation from "../../models/translation";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

const FormTable = ({
  columns,
  initData = [],
  emptyText = "",
  actions = null,
  scroll = { x: "max-content" },
  addRowAction = true,
  removeRowAction = true,
} = {}) => {
  const { t } = useTranslation();
  const [data, setData] = useState(
    initData ? initData.map((v, i) => ({ ROWID: i + 1, ...v })) : []
  );
  const [id, setId] = useState(initData?.length ?? 1);

  const addRow = () => {
    setId((prev) => prev + 1);
    setData((prev) => [...prev, { ROWID: id + 1 }]);
  };
  const removeRow = (i) => {
    setData((prev) => {
      prev.splice(i, 1);
      return [...prev];
    });
  };

  // cols
  const cols = columns.map((column) => col(t, column));
  if (actions || addRowAction || removeRowAction) {
    const actTitle = (function () {
      if (addRowAction) {
        return (
          <Button
            type="link"
            onClick={() => {
              addRow();
            }}
            style={{ color: "inherit" }}
          >
            <PlusOutlined />
          </Button>
        );
      } else {
        return null;
      }
    })();
    cols.push({
      key: "actions",
      title: actTitle,
      fixed: "right",
      align: "center",
      onHeaderCell: () => {
        return {
          style: {
            padding: 5,
            backgroundColor: "rgba(0, 128, 128, 0.25)",
            color: "#333",
          },
        };
      },
      onCell: () => {
        return {
          style: { padding: 0 },
        };
      },
      render: (_, key, index) => (
        <Flex align="center" justify="space-around">
          <>
            {removeRowAction && (
              <Button
                type={"link"}
                onClick={() => {
                  removeRow(index);
                }}
                style={{ color: "inherit" }}
              >
                <MinusOutlined />
              </Button>
            )}

            {actions && actions(_, key)}
          </>
        </Flex>
      ),
    });
  }

  return (
    <Table
      bordered
      columns={cols}
      dataSource={data}
      rowKey={"ROWID"}
      pagination={false}
      locale={{ emptyText }}
      scroll={scroll}
      sticky
    />
  );
};

export default FormTable;

function col(
  t,
  {
    title,
    key,
    name,
    type = "string", // "int|num|float|string|date",
    render,
    options,
    width = "max-content",
    onChange,
    required,
  }
) {
  key = key ?? title;
  title = title ?? key;

  const rendered = render
    ? render
    : (text) => {
        if (options) {
          return (
            <TreeSelect
              className="antd-formTable-treeselector"
              defaultValue={text}
              onChange={onChange}
              name={name}
              treeData={options}
              treeDefaultExpandAll
              popupMatchSelectWidth={false}
              required={required}
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
                defaultValue={text}
                onChange={onChange}
                name={name}
                className="antd-formTable-input"
                required={required}
              />
            );
          case "date":
            return (
              <Input
                type="date"
                defaultValue={text}
                onChange={onChange}
                name={name}
                className="antd-formTable-input"
                required={required}
              />
            );
          default:
            return (
              <Input
                defaultValue={text}
                onChange={onChange}
                name={name}
                className="antd-formTable-input"
                required={required}
              />
            );
        }
      };

  const customizeRequiredMark = (label, { required }) => (
    <p style={{ marginTop: 0, marginBottom: 0 }}>
      <Typography.Text>{label}</Typography.Text>{" "}
      {required ? (
        <Typography.Text strong type="danger">
          *
        </Typography.Text>
      ) : (
        <Typography.Text italic type="secondary">
          ({t("optional")})
        </Typography.Text>
      )}
    </p>
  );

  return {
    title: customizeRequiredMark(t(title), { required }),
    dataIndex: key,
    key: key,
    width,
    render: rendered,
    onHeaderCell: () => {
      return {
        style: {
          padding: 5,
          backgroundColor: "rgba(0, 128, 128, 0.25)",
          color: "#333",
        },
      };
    },
    onCell: () => {
      return {
        style: { padding: 0, minWidth: 100 },
      };
    },
  };
}
