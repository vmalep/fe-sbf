import { AuthProvider } from "@pankod/refine-core";
import axios from "axios";
//import { API_URL } from "./constants";
import GetUserRole from "./helpers/getUserRole";

import { AuthHelper } from "@pankod/refine-strapi-v4";
const getCurrentRole = GetUserRole();
const API_URL = process.env.REACT_APP_API_URL!;
const TOKEN_KEY = process.env.REACT_APP_API_TOKEN_KEY!;
const strapiAuthHelper = AuthHelper(API_URL);

export const customAuthProvider: AuthProvider = {
  
  login: async ({ username, password }) => {
    const axiosInstance = axios.create();
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
    const axiosInstance = axios.create();
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
      return Promise.resolve({
        id,
        username,
        email,
        role,
      });
    };
  },
};