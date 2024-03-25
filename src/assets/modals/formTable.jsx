import { Button, Flex, Form, Table, Typography } from "antd";
import useTranslation from "../../models/translation";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { FormItemInput, FormItemSelect } from "./formItem";

const FormTable = ({
  columns = [],
  initData = [],
  emptyText = "none",
  name = "table",
  actions = null,
  scroll = { x: "max-content" },
  addRowAction = true,
  removeRowAction = true,
  onChange,
} = {}) => {
  const form = Form.useFormInstance();

  // cols
  return (
    <Form.List name={name} initialValue={initData}>
      {(fields, { add, remove }) => (
        <MineTable
          {...{
            name,
            fields,
            add,
            remove,
            columns,
            emptyText,
            actions,
            scroll,
            addRowAction,
            removeRowAction,
            onChange: () => {
              if (onChange) onChange(form.getFieldValue(name));
            },
          }}
        />
      )}
    </Form.List>
  );
};

const MineTable = ({
  fields,
  add,
  remove,
  columns,
  emptyText,
  actions,
  scroll,
  addRowAction,
  removeRowAction,
  onChange,
}) => {
  const { t } = useTranslation();

  const cols = (function () {
    var cccccc = columns.map((column) => {
      return col(t, column, fields, onChange);
    });

    if (actions || addRowAction || removeRowAction) {
      const actTitle = (function () {
        if (addRowAction) {
          return (
            <Button
              type="link"
              onClick={() => {
                add();
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
      cccccc.push({
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
                    remove(index);
                    // removeRow(index);
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

    return cccccc;
  })();

  return (
    <Table
      bordered
      columns={cols}
      dataSource={fields}
      rowKey={"key"}
      pagination={false}
      locale={{ emptyText: t(emptyText) }}
      scroll={scroll}
      sticky
    />
  );
};

export default FormTable;

function col(
  t,
  {
    hidden,
    title,
    key,
    name,
    type = "string", // "int|num|float|string|date",
    required,
    initialValue,
    onChange,
    onCellInput,
    rules,
    render,
    readOnly,
    disabled,
    width = "max-content",
    options,
    onOption,
    optionsValueKey = "id",
    optionsTitleKey = "name",
    optionsTitleRender,
    optionsTree = false,
    optionsTreeCurrId = "id",
    optionsTreeParentId = "parent_id",
  } = {},
  fields,
  onAChange
) {
  key = key ?? title;
  title = title ?? key;
  name = name ?? key;

  const defaultRender = (text, record, index) => {
    var opt = options;
    if (onCellInput) {
      var oci = onCellInput({ text, record, index });
      if (oci?.options) {
        opt = oci.options;
      }
    }
    if (opt) {
      return (
        <FormItemSelect
          name={[fields[index].name, name]}
          rules={rules}
          initialValue={initialValue ?? text}
          required={required}
          className="antd-formTable-treeselector"
          onChange={(val, option) => {
            if (onChange) {
              onChange({ value: val, index, row: fields[index], option });
            }
            onAChange();
          }}
          options={opt}
          onOption={onOption}
          optionsValueKey={optionsValueKey}
          optionsTitleKey={optionsTitleKey}
          optionsTitleRender={optionsTitleRender}
          optionsTree={optionsTree}
          optionsTreeCurrId={optionsTreeCurrId}
          optionsTreeParentId={optionsTreeParentId}
          readOnly={readOnly}
          disabled={disabled}
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
        <FormItemInput
          name={[fields[index].name, name]}
          rules={rules}
          initialValue={initialValue ?? text}
          required={required}
          className="antd-formTable-input"
          onChange={(val) => {
            if (onChange) {
              onChange({ value: val, index, row: fields[index] });
            }
            onAChange();
          }}
          readOnly={readOnly}
          disabled={disabled}
          {...props}
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
    hidden: hidden,
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
