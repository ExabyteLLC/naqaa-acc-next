import Cookies from "universal-cookie";
import {
  useState,
  createContext,
  useContext,
  useCallback,
  useLayoutEffect,
} from "react";

/* eslint-disable react/prop-types */
const cookies = new Cookies(null, { path: "/" });
const Translation = createContext(null);
export const TranslationProvider = ({ locales, defaultLocale, children }) => {
  const [locale, setLocale] = useState(cookies.get("locale") ?? defaultLocale);

  const t = useCallback(
    (key) => {
      return locales?.[locale]?.data?.[key] ?? "N/A";
    },
    [locale, locales]
  );

  const changeLocale = useCallback(
    (l) => {
      setLocale(l);
      document.documentElement.lang = l;
      document.documentElement.dir = locales?.[l]?.dir;
      cookies.set("locale", l);
    },
    [locales]
  );

  useLayoutEffect(() => {
    changeLocale(cookies.get("locale") ?? defaultLocale);
  }, [changeLocale, defaultLocale]);

  return (
    <Translation.Provider
      value={{ t, locale, locales: Object.keys(locales), changeLocale }}
    >
      {children}
    </Translation.Provider>
  );
};

const useTranslation = () => {
  return useContext(Translation);
};
export default useTranslation;
