import { toast } from "react-toastify";
import axios from "@/utils/axios";
import axiosInstance from "@/utils/axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/utils/constants";

export const locate = (url: string) => {
  if (typeof window !== "undefined") {
    window.location.href = url;
  }
};

export const setItemSessionStorage = (key: string, value: string): void => {
  sessionStorage.setItem(key, value);
};

export const getItemSessionStorage = (key: string): string | null => {
  return sessionStorage.getItem(key);
};

export const removeItemSessionStorage = (key: string): void => {
  sessionStorage.removeItem(key);
};

export const getStatus = (error: any): number => {
  const {
    response: { status },
  } = error;

  return status;
};

export const getNewTokens = async (error: any, url: string) => {
  const refreshToken = getItemSessionStorage(REFRESH_TOKEN);

  try {
    const res = await axiosInstance(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      // @ts-ignore
      skip: true,
    });
    setItemSessionStorage(ACCESS_TOKEN, res.data.accessToken);
    setItemSessionStorage(REFRESH_TOKEN, res.data.refreshToken);

    return await axiosInstance({
      ...error.config,
      // @ts-ignore
      skip: true,
    });
  } catch (tokenError: any) {
    console.error("getNewTokens error", tokenError);
    return await Promise.reject(tokenError);
  }
};

export const throttle = (limit: number, callback: Function) => {
  let lastTime: number = 0;
  let lastFuncId: any;

  return (args: any) => {
    const now = Date.now();
    const timeSinceLastRun = now - lastTime;
    if (limit <= timeSinceLastRun) {
      callback(args);
      lastTime = now;
    } else {
      lastFuncId = setTimeout(() => {
        callback(args);
        lastTime = now;
        clearTimeout(lastFuncId);
        lastFuncId = undefined;
      }, limit - timeSinceLastRun);
    }
  };
};

export const debounce = (callback: (arg: string) => void, wait: number) => {
  let timerId: any;

  return (arg: any) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      callback(arg);
    }, wait);
  };
};

export const notify = (message: string) => toast(message);
export const getDataFromError = (error: any): any => {
  const {
    response: { data },
  } = error;

  return data;
};

/**
 * A key of param is the key of url search param
 */
export const createDynamicUrlWithObject = (param: object): string => {
  const urlSearchParams = new URLSearchParams();
  Object.keys(param).forEach((key) => {
    // @ts-ignore
    if (param[key] === undefined) {
      return;
    }
    // @ts-ignore
    urlSearchParams.set(key, param[key]);
  });

  return urlSearchParams.toString();
};

/**
 * A key of param is the key of url search param
 */
export const fetchPosts = async (baseUrl: string, param: object) => {
  const queryString = createDynamicUrlWithObject(param);
  const res = await axios.get(`${baseUrl}?${queryString}`);

  return res.data;
};
