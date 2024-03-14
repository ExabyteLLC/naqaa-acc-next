
import PaymentTypePage from "./pages/paymentType.jsx";
import TestPage from "./pages/testPage";

const routes = [
    { index: true, element: <TestPage /> },
    { path:'payment-type', element: <PaymentTypePage /> }
];

export default routes;
