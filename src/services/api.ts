import { AuthState, IParams } from "@/interfaces";
import { dispatch, getState } from "@/rudex";
import localStorageHelper from "@/utils";
import Axios from "axios";

const VERSION = "1.0";
export const BASE_URL = `http://localhost:5097/api/${VERSION}/`;

const transformAxiosInstance = (
  url: string,
  data: any,
  method: "PUT" | "POST"
) => {
  return {
    method,
    data,
    url,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
};

export const axiosInstance = Axios.create({
  baseURL: BASE_URL,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
      const token = getState().auth.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },

  (error) => Promise.reject(error)
);

const originalRequests: any = [];

axiosInstance.interceptors.response.use(
  (response) => {
    localStorageHelper.removeItem("isRefresh");
    return Promise.resolve(response);
  },
  async (error) => {
    const originalRequest = error.config;
    const idx = originalRequests.findIndex((item: any) =>
      item.url.includes(originalRequest.url)
    );

    if (idx < 0 && error.response.status !== 409) {
      originalRequests.push(originalRequest);
    } else {
      originalRequests.splice(idx, 1, originalRequest);
    }

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const isRefresh = localStorageHelper.getItem("isRefresh");

      if (!isRefresh) {
        localStorageHelper.setItem("isRefresh", true);
      }

      try {
        const auth: AuthState = getState().auth;

        if (auth && !isRefresh) {
          const response = await API.refreshToken({
            AccessToken: auth.token as string,
            RefreshToken: auth.refreshToken as string,
          });

          const { accessToken, refreshToken } = response;
          dispatch.auth.login({ token: accessToken, refreshToken });

          originalRequests.forEach((element: any) => {
            element.headers["Authorization"] = `Bearer ${accessToken}`;
            return axiosInstance(element);
          });
          originalRequests.splice(idx, originalRequests.length);
          return Promise.reject(error);
        } else {
          localStorageHelper.removeItem("isRefresh");
          return Promise.reject(error);
        }
      } catch (refreshError: any) {
        if (refreshError.response.status !== 409) {
          setTimeout(() => {
            dispatch.auth.logoutAsync();
          }, 3000);

          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export const API = {
  login: (data: any) =>
    axiosInstance.post("Auth/login", data).then((res) => {
      const { token, refreshToken } = res.data;
      return { token: token, refreshToken };
    }),

  refreshToken: (data: any) =>
    axiosInstance(transformAxiosInstance("Auth/refresh", data, "POST")).then(
      (res) => {
        const { token, refreshToken } = res.data;
        return { accessToken: token, refreshToken };
      }
    ),


  getUser: () => axiosInstance.get("Auth/me").then((res) => res.data),

  // registerUser: (formData: FormData,) =>
  //   axiosInstance.post("Auth/register", formData).then(res => res.data),

  registerUser: (formData: FormData) =>
  axiosInstance.post("Auth/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getState().auth.token}`, 
    },
  }).then(res => res.data),


  getUsers: (params: IParams) =>
    axiosInstance.get("Users", { params }).then((res) => res.data),

  updateUsers: (data: any) =>
    axiosInstance(transformAxiosInstance("Users", data, "PUT")).then(
      (res) => res.data
    ),
  getUsersById: (id: string) =>
    axiosInstance.get("Users/" + id).then((res) => res.data),


  getAllRegions: () => axiosInstance.get("Regions/all").then(res => res.data),
  getAllRoles: () => axiosInstance.get("Roles/all").then(res => res.data),

};
