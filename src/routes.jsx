
import PaymentTypePage from "./pages/paymentType/paymentType.jsx";
import Serials from "./pages/serials/serials.jsx";

const routes = [
    { index: true, element: <Serials /> },
    { path:'payment-type', element: <PaymentTypePage /> }
];

export default routes;
