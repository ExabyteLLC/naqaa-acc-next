import { Button, Flex, Form, Input, Table, TreeSelect, Typography } from "antd";
import useTranslation from "../../models/translation";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const FormTable = ({
  columns,
  initData = [],
  emptyText = "",
  actions = null,
  scroll = { x: "max-content" },
  addRowAction = true,
  removeRowAction = true,
  onChange,
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
  const editRow = (i, data = {}) => {
    setData((prev) => {
      prev[i] = { ...prev[i], ...data };
      return [...prev];
    });
  };
  const removeRow = (i) => {
    setData((prev) => {
      prev.splice(i, 1);
      return [...prev];
    });
  };

  useEffect(() => {
    if (onChange) onChange([...data]);
  }, [onChange, data]);

  // cols
  const cols = columns.map((column) => col(t, column, editRow));
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
            backgroundColor: "#BFDFDF",
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
    initialValue,
    rules,
  } = {},
  editRow
) {
  key = key ?? title;
  title = title ?? key;
  name = name ?? key;

  const defaultRender = (text, _, index) => {
    const input = (function () {
      if (options) {
        return (
          <TreeSelect
            className="antd-formTable-treeselector"
            onChange={(val) => {
              editRow(index, { [name]: val });
              if (onChange) onChange(val, index);
            }}
            treeData={options}
            treeDefaultExpandAll
            popupMatchSelectWidth={false}
          />
        );
      } else {
        var props = { type: "text" };
        if (["int", "double", "decimal", "float", "num"].includes(type)) {
          props.type = "number";
        } else if (["date"].includes(type)) {
          props.type = "date";
        }
        return (
          <Input
            onChange={({ target: { value: val } }) => {
              editRow(index, { [name]: val });
              if (onChange) onChange(val, index);
            }}
            className="antd-formTable-input"
            {...props}
          />
        );
      }
    })();

    return (
      <Form.Item
        name={`${name}[${index}]`}
        rules={rules}
        initialValue={initialValue ?? text}
        required={required}
      >
        {input}
      </Form.Item>
    );
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
    render: render ?? defaultRender,
    onHeaderCell: () => {
      return {
        style: {
          padding: 5,
          backgroundColor: "#BFDFDF",
          color: "#333",
        },
      };
    },
    onCell: () => {
      return {
        style: { padding: 0 },
      };
    },
  };
}
