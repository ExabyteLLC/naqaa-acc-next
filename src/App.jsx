import { RouterProvider, createHashRouter } from "react-router-dom";
import { TranslationProvider } from "./models/translation";
import en from "./assets/locales/en.json";
import ar from "./assets/locales/ar.json";
import "./App.css";
import routes from "./routes";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider
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
            headerSortActiveBg: "#005353"
            
            // borderColor:'#008080'
          },
          Button: {
            colorText: "#008080",
            colorLink: "#008080",
            colorLinkHover: "#005353",
            colorBorder: "#008080",
          },
        },
      }}
    >
      <TranslationProvider
        locales={{
          en: { dir: "ltr", data: en },
          ar: { dir: "rtl", data: ar },
        }}
        defaultLocale={"en"}
      >
        <RouterProvider router={createHashRouter(routes)} />
      </TranslationProvider>
    </ConfigProvider>
  );
}

export default App;
