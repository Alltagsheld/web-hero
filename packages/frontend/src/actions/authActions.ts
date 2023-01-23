import axiosInstance from "src/initAxios";
import config from "../config";
import { User } from "src/models/User";
import { getToken } from "src/initAxios";
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
}

export const login = (credentials: LoginCredentials): Promise<User> => {
  return axiosInstance.post(config.api.base_url + "/login", credentials).then((res) => {
    localStorage.setItem("token", res.data.token);
    return res.data.user;
  });
};

export const signup = (credentials: SignUpCredentials): Promise<User> => {
  return axiosInstance
    .post(config.api.base_url + "/signup", credentials)
    .then((res) => res.data.user);
};

export const logout = (): Promise<null> => {
  return axiosInstance.post(config.api.base_url + "/logout", null).then(() => null);
};

export const getUser = (): Promise<User> => {
  return axiosInstance.get(config.api.base_url + "/me").then((res) => res.data.data);
};
