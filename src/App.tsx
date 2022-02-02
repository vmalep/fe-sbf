import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";

import axios from "axios";

import "@pankod/refine/dist/styles.min.css";
import { DataProvider, AuthHelper } from "@pankod/refine-strapi-v4";
//import strapiAuthProvider from "authProvider";
import { ParentList , ParentCreate, ParentEdit, ParentShow } from "pages/parents";
import { SchoolYearList , SchoolYearCreate, SchoolYearEdit, SchoolYearShow } from "pages/school_years";
import { CourseList , CourseCreate, CourseEdit, CourseShow } from "pages/courses";
import { LibraryList , LibraryCreate, LibraryEdit, LibraryShow } from "pages/libraries";
import { BookList , BookCreate, BookEdit, BookShow } from "pages/books";
import {
  Title,
  Header,
  Sider,
  Footer,
  Layout,
  OffLayoutArea,
} from "components/layout";

import { API_URL/* , TOKEN_KEY */ } from "./constants";

import { useTranslation } from "react-i18next";

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const axiosInstance = axios.create();
  //const strapiAuthHelper = AuthHelper(API_URL + "/api");
  //const API_URL = "192.168.1.31:1337/api";
  //const { authProvider, axiosInstance } = strapiAuthProvider(API_URL);
  const dataProvider = DataProvider(API_URL + "/api", axiosInstance);

  console.log('dataProvider: ', dataProvider);
  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider}
      //authProvider={authProvider}
      resources={[
        {
          name: "parents",
          list: ParentList,
          create: ParentCreate,
          edit: ParentEdit,
          show: ParentShow,
        },
        {
          name: "school-years",
          list: SchoolYearList,
          create: SchoolYearCreate,
          edit: SchoolYearEdit,
          show: SchoolYearShow,
        },
        {
          name: "courses",
          list: CourseList,
          create: CourseCreate,
          edit: CourseEdit,
          show: CourseShow,
        },
        {
          name: "libraries",
          list: LibraryList,
          create: LibraryCreate,
          edit: LibraryEdit,
          show: LibraryShow,
        },
        {
          name: "books",
          list: BookList,
          create: BookCreate,
          edit: BookEdit,
          show: BookShow,
        },
      ]}
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
