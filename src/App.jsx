import { RouterProvider, Routes, createHashRouter } from "react-router-dom";
import { TranslationProvider } from "./models/translation";
import en from "./assets/locales/en.json";
import ar from "./assets/locales/ar.json";
import "./App.css";

function App() {
  return (
    <TranslationProvider
      locales={{
        en: { dir: "ltr", data: en },
        ar: { dir: "rtl", data: ar },
      }}
      defaultLocale={"en"}
    >
      <RouterProvider router={createHashRouter(Routes)} />
    </TranslationProvider>
  );
}

export default App;
