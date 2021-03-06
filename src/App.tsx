import { Refine, AuthProvider, LayoutWrapper } from "@pankod/refine-core";
import {
  notificationProvider,
  ErrorComponent,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router";
import axios from "axios";
import "@pankod/refine-antd/dist/styles.min.css";
import { AuthHelper, DataProvider } from "@pankod/refine-strapi-v4";
//import { DataProvider } from "./custom/strapi-4";
//import { customAuthProvider } from "authProvider";
import { useState } from "react";
import GetUserRole from "./helpers/getUserRole";

import { UserList, UserCreate, UserEdit, UserShow } from "pages/users";
import { SchoolYearList, SchoolYearCreate, SchoolYearEdit, SchoolYearShow } from "pages/school-years";
import { CourseList, CourseCreate, CourseEdit, CourseShow } from "pages/courses";
import { LibraryList, LibraryCreate, LibraryEdit, LibraryShow } from "pages/libraries";
import { BookList, BookCreate, BookEdit, BookShow } from "pages/books";
import { MyBookList } from "pages/my-books";
import { ReservationList, ReservationCreate, ReservationEdit, ReservationShow } from "pages/reservations";
import { MyReservationList } from "pages/my-reservations";
import { Title, Header, Footer, Layout, OffLayoutArea } from "components/layout";

import { CustomMenu, LoginPage } from "./components/customLayout";
import { AvailableBooks } from "pages/custom";

//import { API_URL } from "./constants";
import { useTranslation } from "react-i18next";

const API_URL = process.env.REACT_APP_API_URL!;
const TOKEN_KEY = process.env.REACT_APP_API_TOKEN_KEY!;

const AvailableBooksPage = () => {
  return (
    <LayoutWrapper>
      <AvailableBooks />
    </LayoutWrapper>
  );
};

function App() {

  const [role, setRole] = useState("public");
  console.log('role: ', role);
  
  const { t, i18n } = useTranslation();
  const axiosInstance = axios.create();
  console.log('api_url: ', API_URL);
  const strapiAuthHelper = AuthHelper(API_URL);
  const getCurrentRole = GetUserRole();
  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
      console.log('login App');
      const { data, status } = await strapiAuthHelper.login(username, password);
      console.log(username, password);
      if (status === 200) {
        localStorage.setItem(TOKEN_KEY, data.jwt);

        // set header axios instance
        axiosInstance.defaults.headers = {
          Authorization: `Bearer ${data.jwt}`,
        };
        console.log('login resolve')
        return Promise.resolve("/available-books");
      }
      return Promise.reject();
    },
    logout: () => {
      localStorage.removeItem(TOKEN_KEY);
      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        axiosInstance.defaults.headers = {
          Authorization: `Bearer ${token}`,
        };
        return Promise.resolve();
      }

      return Promise.reject();
    },
    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        return Promise.reject();
      }

      const { data, status } = await strapiAuthHelper.me(token);
      if (status === 200) {
        const { id, username, email } = data;
        const role = await getCurrentRole.role(id, token);
        setRole(role);
        return Promise.resolve({
          id,
          username,
          email,
          role,
        });
      }

      return Promise.reject();
    },
  };

  return (
    <Refine
      authProvider={authProvider}
      routerProvider={{
        ...routerProvider,
        routes: [
          {
            exact: true,
            component: AvailableBooksPage,
            path: "/available-books",
          },
        ],
      }}
      dataProvider={DataProvider(API_URL, axiosInstance)}
      resources={[
        {
          name: "my-books",
          list: MyBookList,
        },
        {
          name: "my-reservations",
          list: MyReservationList,
        },
        {
          name: "books",
          list: BookList,
          create: BookCreate,
          edit: BookEdit,
          show: BookShow,
        },
        {
          name: "libraries",
          list: LibraryList,
          create: LibraryCreate,
          edit: LibraryEdit,
          show: LibraryShow,
        },
        {
          name: "courses",
          list: CourseList,
          create: CourseCreate,
          edit: CourseEdit,
          show: CourseShow,
        },
        {
          name: "school-years",
          list: SchoolYearList,
          create: SchoolYearCreate,
          edit: SchoolYearEdit,
          show: SchoolYearShow,
        },
        {
          name: "users",
          list: UserList,
          create: UserCreate,
          edit: UserEdit,
          show: UserShow,
        },
        {
          name: "reservations",
          list: ReservationList,
          create: ReservationCreate,
          edit: ReservationEdit,
          show: ReservationShow,
        },
      ]}
      Title={Title}
      Header={Header}
      Sider={CustomMenu}
      Footer={Footer}
      Layout={Layout}
      OffLayoutArea={OffLayoutArea}
      i18nProvider={i18nProvider}
      notificationProvider={notificationProvider}
      LoginPage={LoginPage}
      catchAll={<ErrorComponent />}
    />
  );
};

export default App;
