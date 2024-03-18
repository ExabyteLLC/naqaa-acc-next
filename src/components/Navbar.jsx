import { Menu } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const items = [
  {
    label: "Serial",
    key: "/serial",
  },
  {
    label: "Payment Type",
    key: "/payment-type",
  },
  {
    label: "Accounting Year",
    key: "/accounting-year",
  },
  {
    label: "Chart of account",
    key: "/chart-of-account",
  },
];
const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onClick = (e) => {
    navigate(e.key);
  };
  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[pathname]}
        mode="horizontal"
        items={items}
      />
      <Outlet />
    </>
  );
};
export default App;
