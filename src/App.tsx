import { Refine, AuthProvider } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";
import axios from "axios";
import "@pankod/refine/dist/styles.min.css";
import { DataProvider, AuthHelper } from "@pankod/refine-strapi-v4";

import GetUserRole from "./helpers/getUserRole";

import { UserList, UserCreate, UserEdit, UserShow } from "pages/users";
//import { ParentList, ParentCreate, ParentEdit, ParentShow } from "pages/parents";
import { SchoolYearList, SchoolYearCreate, SchoolYearEdit, SchoolYearShow } from "pages/school-years";
import { CourseList, CourseCreate, CourseEdit, CourseShow } from "pages/courses";
import { LibraryList, LibraryCreate, LibraryEdit, LibraryShow } from "pages/libraries";
import { BookList, BookCreate, BookEdit, BookShow } from "pages/books";
import { ReservationList, ReservationCreate, ReservationEdit, ReservationShow } from "pages/reservations";

import { Title, Header, Sider, Footer, Layout, OffLayoutArea } from "components/layout";

/* import { newEnforcer } from "casbin.js";
import { model, adapter } from "./accessControl"; */

import { API_URL, TOKEN_KEY } from "./constants";

import { useTranslation } from "react-i18next";
import { useState } from "react";

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const axiosInstance = axios.create();
  //const TOKEN_KEY = process.env.REACT_APP_API_TOKEN_KEY;
  const strapiAuthHelper = AuthHelper(API_URL + "/api");
  const getCurrentRole = GetUserRole(API_URL + "/api");
  const [role, setRole] = useState("public");

  localStorage.setItem("currSchoolYearId", "0")


  const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
      const { data, status } = await strapiAuthHelper.login(
        username,
        password,
      );
      console.log(username, password);
      if (status === 200) {
        localStorage.setItem(TOKEN_KEY, data.jwt);

        // set header axios instance
        axiosInstance.defaults.headers = {
          Authorization: `Bearer ${data.jwt}`,
        };

        return Promise.resolve;
      }
      return Promise.reject;
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

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  console.log('role: ', role)

  return (
    <Refine
      authProvider={authProvider}
      dataProvider={DataProvider(API_URL + "/api", axiosInstance)}
      /*       accessControlProvider={{
              can: async ({ resource, action, params }) => {
                  const enforcer = await newEnforcer(model, adapter);
                  if (
                      action === "delete" ||
                      action === "edit" ||
                      action === "show"
                  ) {
                      const can = await enforcer.enforce(
                          role,
                          `${resource}/${params.id}`,
                          action,
                      );
                      return Promise.resolve({ can });
                  }
      
                  const can = await enforcer.enforce(role, resource, action);
                  return Promise.resolve({ can });
              },
          }} */
      routerProvider={routerProvider}
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
      //Header={() => <Header currSchoolYear={currSchoolYear} setCurrSchoolYear={setCurrSchoolYear} />}
      Sider={Sider}
      Footer={Footer}
      Layout={Layout}
      OffLayoutArea={OffLayoutArea}
      i18nProvider={i18nProvider}
    ></Refine>
  );
}

export default App;
