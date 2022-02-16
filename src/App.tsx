import { Refine, LayoutWrapper } from "@pankod/refine-core";
import {
  notificationProvider,
  ErrorComponent,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router";
import axios from "axios";
import "@pankod/refine-antd/dist/styles.min.css";
import { DataProvider } from "./custom/strapi-4";
import { customAuthProvider } from "authProvider";
import { useState } from "react";

import {UserList, UserCreate, UserEdit, UserShow } from "pages/users";
import {SchoolYearList, SchoolYearCreate, SchoolYearEdit, SchoolYearShow} from "pages/school-years";
import {CourseList, CourseCreate, CourseEdit, CourseShow} from "pages/courses";
import {LibraryList, LibraryCreate, LibraryEdit, LibraryShow} from "pages/libraries";
import { BookList, BookCreate, BookEdit, BookShow } from "pages/books";
import {ReservationList, ReservationCreate, ReservationEdit, ReservationShow} from "pages/reservations";
import {Title, Header, Footer, Layout, OffLayoutArea} from "components/layout";

import { CustomMenu, LoginPage } from "./components/customLayout";
import { AvailableBooks, MyBooksList } from "pages/custom";

import { API_URL } from "./constants";

import { useTranslation } from "react-i18next";
import GetUserRole from "helpers/getUserRole";

const AvailableBooksPage = () => {
  return (
    <LayoutWrapper>
      <AvailableBooks />
    </LayoutWrapper>
  );
};

const MyBooksPage = () => {
  return (
    <LayoutWrapper>
      <MyBooksList />
    </LayoutWrapper>
  );
};

function App() {

  //const [role, setRole] = useState(GetUserRole());
  
  const { t, i18n } = useTranslation();
  const axiosInstance = axios.create();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <Refine
      authProvider={customAuthProvider}
      routerProvider={{
        ...routerProvider,
        routes: [
          {
            exact: true,
            component: AvailableBooksPage,
            path: "/available-books",
          },
          {
            exact: true,
            component: MyBooksPage,
            path: "/my-books",
          },
        ],
      }}
      dataProvider={DataProvider(API_URL, axiosInstance)}
      resources={[
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
