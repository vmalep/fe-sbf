import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";

import "@pankod/refine/dist/styles.min.css";
import { DataProvider } from "@pankod/refine-strapi";
import strapiAuthProvider from "authProvider";
import {
  Title,
  Header,
  Sider,
  Footer,
  Layout,
  OffLayoutArea,
} from "components/layout";
import { useTranslation } from "react-i18next";

function App() {
  const { t, i18n } = useTranslation();
  const API_URL = "your-strapi-api-url";

  const { authProvider, axiosInstance } = strapiAuthProvider(API_URL);
  const dataProvider = DataProvider(API_URL, axiosInstance);

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider}
      authProvider={authProvider}
      Title={Title}
      Header={Header}
      Sider={Sider}
      Footer={Footer}
      Layout={Layout}
      OffLayoutArea={OffLayoutArea}
      i18nProvider={i18nProvider}
    ></Refine>
  );
}

export default App;
