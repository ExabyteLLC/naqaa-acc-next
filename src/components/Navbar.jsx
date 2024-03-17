import { useState } from "react";
import { MailOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const items = [
  {
    label: "Serial",
    key: "/serial",
    icon: <MailOutlined />,
  },
  {
    label: "Payment Type",
    key: "/payment-type",
    icon: <MailOutlined />,
  },
  {
    label: "Accounting Year",
    key: "/accounting-year",
    icon: <MailOutlined />,
  },
];
const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onClick = (e) => {
    navigate(e.key);
  };
  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[location.pathname]}
        mode="horizontal"
        items={items}
      />
      <Outlet />
    </>
  );
};
export default App;
