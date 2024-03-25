import { Form, Input, Select, TreeSelect } from "antd";
import MapSelectOptions from "../../models/mapSelectOptions";
import { useCallback } from "react";

// form Input
export const FormItemInput = ({
  name,
  type,
  required,
  initialValue,
  label,
  placeholder,
  rules = [],
  className = "",
  onChange,
  readOnly,
  disabled,
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      required={required}
      initialValue={initialValue}
      rules={rules}
    >
      <Input
        placeholder={placeholder}
        className={className}
        type={type}
        onChange={({ target: { value } }) => {
          if (onChange) {
            onChange(value);
          }
        }}
        readOnly={readOnly}
        disabled={disabled}
      />
    </Form.Item>
  );
};
// form Select
export const FormItemSelect = ({
  name,
  required,
  initialValue,
  label,
  placeholder,
  rules = [],
  onChange,
  readOnly,
  disabled,
  className = "",
  options,
  optionsMapped = false,
  onOption,
  optionsValueKey = "id",
  optionsTitleKey = "name",
  optionsTitleRender,
  optionsTree = false,
  optionsTreeCurrId = "id",
  optionsTreeParentId = "parent_id",
}) => {
  const optionsData = useCallback(
    () =>
      optionsMapped
        ? options
        : MapSelectOptions(options, {
            valueKey: optionsValueKey,
            titleKey: optionsTitleKey,
            titleRender: optionsTitleRender,
            titleKeyProp: optionsTree ? "title" : "label",
            tree: optionsTree,
            currId: optionsTreeCurrId,
            parentId: optionsTreeParentId,
            onOption: onOption,
          }),
    [
      onOption,
      options,
      optionsMapped,
      optionsTitleKey,
      optionsTitleRender,
      optionsTree,
      optionsTreeCurrId,
      optionsTreeParentId,
      optionsValueKey,
    ]
  );
  return (
    <Form.Item
      label={label}
      name={name}
      required={required}
      initialValue={initialValue}
      rules={rules}
    >
      {optionsTree ? (
        <TreeSelect
          placeholder={placeholder}
          className={className}
          treeData={optionsData()}
          onChange={(v) => {
            if (onChange) {
              onChange(
                v,
                options.find((o) => o?.[optionsValueKey] === v)
              );
            }
          }}
          readOnly={readOnly}
          popupMatchSelectWidth={false}
          disabled={disabled}
          treeNodeFilterProp="title"
          treeDefaultExpandAll
          showSearch
          allowClear
        />
      ) : (
        <Select
          placeholder={placeholder}
          className={className}
          onChange={(v) => {
            if (onChange) {
              onChange(
                v,
                options.find((o) => o?.[optionsValueKey] === v)
              );
            }
          }}
          readOnly={readOnly}
          popupMatchSelectWidth={false}
          disabled={disabled}
          optionFilterProp="label"
          showSearch
          allowClear
          options={optionsData()}
        />
      )}
    </Form.Item>
  );
};
