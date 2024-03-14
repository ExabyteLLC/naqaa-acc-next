import { RouterProvider,  createHashRouter } from "react-router-dom";
import { TranslationProvider } from "./models/translation";
import en from "./assets/locales/en.json";
import ar from "./assets/locales/ar.json";
import "./App.css";
import routes from "./routes";

function App() {
  return (
    <TranslationProvider
      locales={{
        en: { dir: "ltr", data: en },
        ar: { dir: "rtl", data: ar },
      }}
      defaultLocale={"en"}
    >
      <RouterProvider router={createHashRouter(routes)} />
    </TranslationProvider>
  );
}

export default App;
