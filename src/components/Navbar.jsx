import { Button, Menu } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useTranslation from "../models/translation";

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
    label: "Financial Year",
    key: "/financial-year",
  },
  {
    label: "Chart of account",
    key: "/chart-of-account",
  },
  {
    label: "Journal Entries",
    key: "/journal-entries",
  },
  {
    label: "Sales Invoices",
    key: "/sales-invoices",
  },
];
const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { locale, changeLocale } = useTranslation();

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
      <Button
        onClick={() => {
          changeLocale(locale === "en" ? "ar" : "en");
        }}
      >
        {locale === "en" ? "ar" : "en"}
      </Button>
      <Outlet />
    </>
  );
};
export default App;
