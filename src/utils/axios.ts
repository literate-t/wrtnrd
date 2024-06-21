import axios from "axios";
import { ACCESS_TOKEN, ERROR_UNAUTHORIZED_401 } from "@/utils/constants";
import { getItemSessionStorage, getNewTokens, getStatus } from "@/utils/common";
import { NEW_TOKEN_URL } from "@/utils/urls";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  config.withCredentials = true;
  config.headers["Content-Type"] = "application/json";

  const accessToken = getItemSessionStorage(ACCESS_TOKEN);

  if (accessToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = getStatus(error);

    if (ERROR_UNAUTHORIZED_401 == status && !error.config.skip) {
      return getNewTokens(error, NEW_TOKEN_URL);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
