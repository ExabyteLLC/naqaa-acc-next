import { RouterProvider, createHashRouter } from "react-router-dom";
import useTranslation, { TranslationProvider } from "./models/translation";
import en from "./assets/locales/en.json";
import ar from "./assets/locales/ar.json";
import "./App.css";
import routes from "./routes";
import { ConfigProvider } from "antd";

function App() {
  return (
    <TranslationProvider
      locales={{
        en: { dir: "ltr", data: en },
        ar: { dir: "rtl", data: ar },
      }}
      defaultLocale={"en"}
    >
      <App2 />
    </TranslationProvider>
  );
}
export default App;

function App2() {
  const { dir } = useTranslation();

  return (
    <ConfigProvider
      direction={dir}
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#008080",
        },
        components: {
          Table: {
            headerColor: "#fff",
            headerBg: "#008080",
            headerSortHoverBg: "#008080",
            headerSortActiveBg: "#005353",
            // borderColor:'#008080'
          },
          Button: {
            colorText: "#008080",
            colorLink: "#008080",
            colorLinkHover: "#005353",
            colorBorder: "#008080",
            colorLinkActive: "#005353",
          },
          Form: {
            itemMarginBottom: 0,
          },
          Divider: {
            margin: 0,
          },
        },
      }}
    >
      <RouterProvider router={createHashRouter(routes)} />
    </ConfigProvider>
  );
}
