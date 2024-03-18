import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
const DeleteBtn = ({ title, okText, cancelText, onConfirm, children }) => (
  <Popconfirm
    title={title}
    description="Are you sure!"
    icon={
      <QuestionCircleOutlined
        style={{
          color: "red",
        }}
      />
    }
    okText={okText}
    cancelText={cancelText}
    onConfirm={onConfirm}
  >
    <Button type="link">{children}</Button>
  </Popconfirm>
);
export default DeleteBtn;