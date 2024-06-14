import axios from "axios";
import { ERROR_FORBIDDEN_403 } from "@/utils/constants";
import { getStatus } from "@/utils/common";

const axiosInstance = axios.create({
  baseURL: "https://wrtnd-theold-7acc5afb.koyeb.app",
});

axiosInstance.interceptors.request.use((config) => {
  config.withCredentials = true;
  config.headers["Content-Type"] = "application/json";

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = getStatus(error);

    if (ERROR_FORBIDDEN_403 == status) {
      return getNewTokens(error);
    }

    return Promise.reject(error);
  }
);

const getNewTokens = (config: any) => {
  const {
    config: { url: targetUrl, method },
  } = config;

  return axiosInstance("/api/auth/new-tokens", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return axiosInstance(targetUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return res;
    });
  });
};

const setValueInSessionStorage = (key: string, value: string) => {
  sessionStorage.setItem(key, value);
};

export default axiosInstance;
