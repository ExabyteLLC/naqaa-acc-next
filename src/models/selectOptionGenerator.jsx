import { Select } from "antd";
import useTranslation from "./translation";

export default function SelectOptionGenerator(options = [], translate = true) {
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
        {typeof title === "string" ? (translate ? t(title) : title) : title}
      </Select.Option>
    );
  });
}
