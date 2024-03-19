import { Select } from "antd";
import useTranslation from "../../../../models/translation";

export default function SelectOptionGenerator(options = []) {
  const { t } = useTranslation();
  return options.map((option) => {
    let title, key;
    if (typeof option !== "object") {
      key = option;
      title = option;
    } else {
      key = option?.key;
      title = option?.title;
    }
    return (
      <Select.Option value={key} key={key}>
        {typeof title === "string" ? t(title) : title}
      </Select.Option>
    );
  });
}
