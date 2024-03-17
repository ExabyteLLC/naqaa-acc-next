import PaymentTypePage from "./pages/paymentType/paymentType.jsx";
import Serials from "./pages/serials/serials.jsx";
import Navbar from "./components/Navbar.jsx";

const routes = [
  {
    path: "",
    element: <Navbar />,
    children: [
      { path: "Serial", element: <Serials /> },
      { path: "Payment-type", element: <PaymentTypePage /> },
    ],
  },
];

export default routes;
