import PaymentTypePage from "./pages/paymentType/paymentType.jsx";
import Serials from "./pages/serials/serials.jsx";
import Navbar from "./components/Navbar.jsx";
import ChartOfAccount from "./pages/chartOfAccount/chartOfAccount.jsx";
import FinancialYear from "./pages/FinancialYear/FinancialYear.jsx";
import JournalEntries from "./pages/JournalEntries/JournalEntries.jsx";
import SalesInvoices from "./pages/SalesInvoices/SalesInvoices.jsx";

const routes = [
  {
    path: "",
    element: <Navbar />,
    children: [
      { path: "Serial", element: <Serials /> },
      { path: "Payment-type", element: <PaymentTypePage /> },
      { path: "chart-of-account", element: <ChartOfAccount /> },
      { path: "financial-year", element: <FinancialYear /> },
      { path: "journal-entries", element: <JournalEntries /> },
      { path: "sales-invoices", element: <SalesInvoices /> },
    ],
  },
];

export default routes;
