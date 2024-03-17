import { useState } from "react";
import { MailOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Outlet } from "react-router-dom";

const items = [
  {
    label: "Serial",
    key: "mail",
    icon: <MailOutlined />,
  },
  {
    label: "Payment Type",
    key: "payment-type",
    icon: <MailOutlined />,
  },
  {
    label: "Accounting Year",
    key: "accounting-year",
    icon: <MailOutlined />,
  },
];
const App = () => {
  const [current, setCurrent] = useState("");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <Outlet />
    </>
  );
};
export default App;
